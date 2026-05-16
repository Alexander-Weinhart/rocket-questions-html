const { test, expect } = require('@playwright/test');

const HISTORY_STORAGE_KEY = 'rocket_questions_history_local_playwright';
const APP_VERSION = '1.0.14';
const BASE_PATH = (() => {
  const value = String(process.env.PLAYWRIGHT_BASE_PATH || '/').trim();
  if (!value || value === '/') return '';
  return `/${value.replace(/^\/+|\/+$/g, '')}`;
})();

function appPath(pathname = '/') {
  const normalized = pathname.startsWith('/') ? pathname : `/${pathname}`;
  return `${BASE_PATH}${normalized}` || '/';
}

function routePattern(pathname = '') {
  const normalized = pathname.startsWith('/') ? pathname : `/${pathname}`;
  return new RegExp(`${BASE_PATH}${normalized}`.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '$');
}

function expectVersionQuery(urlString) {
  const url = new URL(urlString);
  expect(url.searchParams.get('q')).toBe(APP_VERSION);
}

async function expectVersionQueryAcrossBasePaths(browser) {
  for (const basePath of ['', '/test1']) {
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.addInitScript((historyStorageKey) => {
      window.__ROCKET_HISTORY_STORAGE_KEY__ = historyStorageKey;
      window.__ROCKET_DISABLE_CHANGE_SERVER_SYNC__ = true;
      window.__ROCKET_DISABLE_HISTORY_SERVER_SYNC__ = true;
    }, `${HISTORY_STORAGE_KEY}${basePath || '-root'}`);

    const rootUrl = `http://127.0.0.1:3003${basePath || ''}/`;
    await page.goto(rootUrl);
    await page.waitForFunction(() => window.__NETC_QUIZ_APP_READY__ === true);
    await expect.poll(() => page.url()).toContain(`?q=${APP_VERSION}`);
    expectVersionQuery(page.url());

    if ((await page.locator('#course-select').inputValue()) === '') {
      await page.selectOption('#course-select', 'netc121');
    }
    await page.locator('#continue-course').click();
    await expect(page.locator('#menu-screen')).toBeVisible();
    expectVersionQuery(page.url());

    await page.locator('#go-practice-quiz').click();
    await expect(page.locator('#week-screen')).toBeVisible();
    expectVersionQuery(page.url());

    await context.close();
  }
}

async function waitForAppReady(page, path = '/') {
  await page.goto(appPath(path));
  await page.waitForFunction(() => window.__NETC_QUIZ_APP_READY__ === true);
}

async function dismissWalkthroughPrompt(page) {
  const overlay = page.locator('#walkthrough-overlay');
  if (!(await overlay.isVisible())) return;

  const noButton = page.locator('#walkthrough-no');
  const mobileContinueButton = page.locator('#walkthrough-mobile-continue');
  if (await noButton.isVisible()) {
    await noButton.click();
    return;
  }
  if (await mobileContinueButton.isVisible()) {
    await mobileContinueButton.click();
  }
}

async function continueIntoCourseWorkspace(page) {
  if ((await page.locator('#course-select').inputValue()) === '') {
    await page.selectOption('#course-select', 'netc121');
  }
  await page.locator('#continue-course').click();
  await expect(page.locator('#menu-screen')).toBeVisible();
}

async function setCheckboxByScript(page, selector, checked) {
  await page.locator(selector).evaluate((node, desired) => {
    node.checked = desired;
    node.dispatchEvent(new Event('change', { bubbles: true }));
  }, checked);
}

async function setInputValueByScript(page, selector, value) {
  await page.locator(selector).evaluate((node, nextValue) => {
    node.value = String(nextValue);
    node.dispatchEvent(new Event('input', { bubbles: true }));
    node.dispatchEvent(new Event('change', { bubbles: true }));
  }, value);
}

async function expectLiveScoreRatioValid(page) {
  const text = await page.locator('#live-score').textContent();
  const match = String(text || '').match(/Live Score:\s*(\d+)\/(\d+)/);
  expect(match, `Could not parse live score from: ${text}`).not.toBeNull();
  const correct = Number(match[1]);
  const answered = Number(match[2]);
  expect(correct).toBeLessThanOrEqual(answered);
}

test('success criteria release gate', async ({ page, request, browser }) => {
  test.slow();
  const mark = (label) => console.log(`STEP: ${label}`);

  const dialogMessages = [];
  const apiGetRequests = [];
  const apiPostRequests = [];
  const apiPostResponses = [];

  page.on('request', (req) => {
    const url = req.url();
    if (!url.includes('/api/changes') && !url.includes('/api/history')) return;
    if (req.method() === 'GET') {
      apiGetRequests.push({ url });
      return;
    }
    if (req.method() !== 'POST') return;
    let payload = null;
    try {
      payload = JSON.parse(req.postData() || '{}');
    } catch {
      payload = req.postData() || '';
    }
    apiPostRequests.push({ url, payload });
  });

  page.on('response', (res) => {
    const req = res.request();
    if (req.method() !== 'POST') return;
    const url = res.url();
    if (!url.includes('/api/changes') && !url.includes('/api/history')) return;
    apiPostResponses.push({ url, status: res.status() });
  });

  page.on('dialog', async (dialog) => {
    dialogMessages.push({ type: dialog.type(), message: dialog.message() });
    console.log(`DIALOG: ${dialog.type()}: ${dialog.message()}`);
    await dialog.accept();
  });

  await page.addInitScript((historyStorageKey) => {
    window.__ROCKET_HISTORY_STORAGE_KEY__ = historyStorageKey;
    window.__ROCKET_DISABLE_CHANGE_SERVER_SYNC__ = true;
    window.__ROCKET_DISABLE_HISTORY_SERVER_SYNC__ = true;
    window.__copiedText = '';
    window.__printCalls = 0;
    window.__openedTrustedAiTabs = [];

    Object.defineProperty(navigator, 'clipboard', {
      configurable: true,
      value: {
        writeText: async (text) => {
          window.__copiedText = String(text || '');
        },
        readText: async () => window.__copiedText || '',
      },
    });

    window.print = () => {
      window.__printCalls = (window.__printCalls || 0) + 1;
    };

    window.open = (url, target, features) => {
      window.__openedTrustedAiTabs.push({ url: String(url || ''), target: String(target || ''), features: String(features || '') });
      return { focus() {}, closed: false };
    };

  }, HISTORY_STORAGE_KEY);

  await page.setViewportSize({ width: 1440, height: 1200 });
  mark('boot');
  await waitForAppReady(page);
  expectVersionQuery(page.url());

  await expect(page.locator('#course-screen')).toBeVisible();
  expectVersionQuery(page.url());
  await expect(page.locator('#course-select')).toBeVisible();
  await expect(page.locator('#certification-select')).toBeVisible();
  await expect(page.locator('#course-changelog-status')).toContainText('Latest changelog loaded');
  await expect(page.locator('#course-changelog-viewer')).toContainText('Rocket Questions HTML Changelog');
  await expect(page.locator('#walkthrough-title')).toContainText('Would you like a guided walkthrough?');
  expect(apiGetRequests).toEqual([]);
  expect(apiPostRequests).toEqual([]);

  // Course/certification selection and workspace routing.
  mark('course and certification flow');
  await page.selectOption('#certification-select', 'comptia-network-plus-n10-009');
  await continueIntoCourseWorkspace(page);
  await expect(page.locator('#practice-mode-description')).toContainText('week selection');
  await page.locator('#back-course-from-menu').click();
  await expect(page.locator('#course-screen')).toBeVisible();

  await page.locator('#continue-certification').click();
  await expect(page.locator('#menu-screen')).toBeVisible();
  await expect(page.locator('#app-title')).toContainText('CompTIA Network+');

  await page.locator('#go-notes').click();
  await expect(page.locator('#notes-screen')).toBeVisible();
  expectVersionQuery(page.url());
  await expect(page.locator('#notes-screen-title')).toContainText('Notes Lists');
  await expect(page.locator('#notes-tree')).not.toContainText('Notes List B - Textbook Content');
  await expect(page.locator('.notes-tree-toggle').first()).toHaveAttribute('aria-expanded', 'true');
  if ((await page.locator('#notes-current-path').textContent()) === 'No note selected.') {
    await page.locator('.notes-tree-file').first().click();
  }
  await expect(page.locator('#notes-current-path')).not.toHaveText('No note selected.');
  await expect(page.locator('#notes-viewer')).not.toContainText('Select a note to start reading.');
  await page.locator('#back-notes-to-menu').click();
  expectVersionQuery(page.url());

  await page.locator('#go-practice-quiz').click();
  await expect(page.locator('#week-screen')).toBeVisible();
  expectVersionQuery(page.url());
  await expect(page.locator('#practice-unit-title')).toContainText('Domain Selection');
  await expect(page.locator('#week-grid')).toContainText('Domain 1');
  await expect(page.locator('#week-grid')).toContainText('coming soon');
  await page.locator('#back-course-from-week').click();
  await page.locator('#back-course-from-menu').click();

  await page.selectOption('#certification-select', 'comptia-security-plus-sy0-701');
  await page.locator('#continue-certification').click();
  await expect(page.locator('#menu-screen')).toBeVisible();
  await expect(page.locator('#app-title')).toContainText('CompTIA Security+');

  await page.locator('#go-notes').click();
  await expect(page.locator('#notes-screen')).toBeVisible();
  await expect(page.locator('#notes-viewer')).toContainText('Security+');
  await expect(page.locator('#notes-tree')).not.toContainText('Notes List B - Textbook Content');
  await page.locator('#back-notes-to-menu').click();

  await page.locator('#go-practice-quiz').click();
  await expect(page.locator('#week-screen')).toBeVisible();
  await expect(page.locator('#practice-unit-title')).toContainText('Domain Selection');
  await expect(page.locator('#week-grid')).toContainText('Domain 1');
  await expect(page.locator('#week-grid')).toContainText('coming soon');
  await page.locator('#back-course-from-week').click();
  await page.locator('#back-course-from-menu').click();

  await page.selectOption('#certification-select', 'comptia-network-plus-n10-009');

  await continueIntoCourseWorkspace(page);
  await page.locator('#go-practice-quiz').click();
  await expect(page.locator('#week-screen')).toBeVisible();
  await page.locator('#continue-setup').click();
  await expect(page.locator('#config-screen')).toBeVisible();
  expectVersionQuery(page.url());

  // Non-demo quiz flow for real reporting, persistence, and server-backed change/history behavior.
  mark('real quiz flow');
  await page.locator('#change-weeks').click();
  await expect(page.locator('#week-screen')).toBeVisible();
  await page.locator('#continue-setup').click();

  await page.locator('#question-count').fill('4');
  await page.locator('#question-count-up').click();
  await page.locator('#question-count-down').click();
  await page.locator('#start-quiz').click();
  await expect(page.locator('#quiz-screen')).toBeVisible();
  expectVersionQuery(page.url());

  const firstQuestion = await page.locator('#question-text').textContent();
  await page.locator('#flag-question').click();
  await expect(page.locator('#question-text')).not.toHaveText(firstQuestion || '');

  const secondQuestion = await page.locator('#question-text').textContent();
  await page.locator('#ineffective-question').click();
  await expect(page.locator('#ineffective-dialog')).toBeVisible();
  await page.locator('#submit-ineffective').click();
  await expect.poll(
    () => dialogMessages.map((entry) => entry.message).some((message) => message.includes('Please explain why the question is ineffective.'))
  ).toBeTruthy();
  await page.locator('#ineffective-feedback').fill('PLAYWRIGHT TEST');
  await page.locator('#submit-ineffective').click();
  await expect(page.locator('#question-text')).not.toHaveText(secondQuestion || '');
  await page.locator('#dont-know-answer').click();
  await expect(page.locator('#feedback')).toContainText("I don't know");
  await expectLiveScoreRatioValid(page);
  await expect(page.locator('#trusted-ai-explanation')).toBeEnabled();
  await page.locator('#trusted-ai-explanation').click();
  const trustedAiTab = await page.evaluate(() => window.__openedTrustedAiTabs.at(-1));
  expect(trustedAiTab.target).toBe('_blank');
  expect(trustedAiTab.features).toContain('noopener');
  const trustedAiURL = trustedAiTab.url;
  expect(trustedAiURL).toContain('https://www.google.com/search?udm=50&aep=11&q=');
  expect(trustedAiURL).toContain('%20');
  const trustedAiPrompt = decodeURIComponent(new URL(trustedAiURL).searchParams.get('q') || '');
  expect(trustedAiPrompt).toContain('Question:');
  expect(trustedAiPrompt).toContain('A.');
  expect(trustedAiPrompt).toContain('B.');
  expect(trustedAiPrompt).toContain('C.');
  expect(trustedAiPrompt).toContain('D.');
  expect(trustedAiPrompt).toContain("User selected answer: I don't know");
  expect(trustedAiPrompt).toContain("if the user's selected answer is wrong and why it's wrong if it is");
  const answeredFeedback = await page.locator('#feedback').textContent();
  await page.locator('#next-question').click();
  await expect(page.locator('#feedback')).toHaveText('');
  await expect(page.locator('#previous-question')).toBeEnabled();
  await page.locator('#previous-question').click();
  await expect(page.locator('#feedback')).toHaveText(answeredFeedback || '');
  await expect(page.locator('#dont-know-answer')).toBeDisabled();
  await expectLiveScoreRatioValid(page);
  await page.locator('#finish-quiz').click();

  await expect(page.locator('#review-screen')).toBeVisible();
  await expect(page.locator('#review-summary')).toContainText('Answered: 1');
  await expect(page.locator('#review-text')).toHaveValue(/QUIZ REVIEW REPORT/);
  await expect(page.locator('#review-text')).toHaveValue(/Sources to Review/);

  const reportText = await page.locator('#review-text').inputValue();
  await expect(page.locator('#copy-report')).toBeVisible();
  await expect(page.locator('#download-report')).toBeVisible();
  await expect(page.locator('#print-report')).toBeVisible();
  await expect(page.locator('#retake-incorrect')).toBeEnabled();
  await expect(page.locator('#back-setup-from-review')).toBeVisible();
  await expect(page.locator('#reset-wrong-count')).toBeVisible();
  mark('review actions');
  await page.evaluate(() => {
    document.getElementById('copy-report').dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true }));
  });
  await expect(page.locator('#review-screen')).toBeVisible();
  await expect(page.locator('#review-text')).toHaveValue(reportText);
  await expect
    .poll(() => page.evaluate(() => window.__rocketLastCopyText || ''))
    .toBe(reportText);

  mark('download report');
  await page.evaluate(() => {
    document.getElementById('download-report').dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true }));
  });
  await expect
    .poll(() => page.evaluate(() => window.__rocketLastDownloadMeta?.filename || ''))
    .toBe('netc_121_quiz_review_report.txt');
  await expect
    .poll(() => page.evaluate(() => window.__rocketLastDownloadMeta?.text || ''))
    .toBe(reportText);

  mark('print report');
  await page.evaluate(() => {
    document.getElementById('print-report').dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true }));
  });
  await expect
    .poll(() => page.evaluate(() => window.__printCalls || 0))
    .toBe(1);
  await expect
    .poll(() => page.evaluate(() => window.__rocketLastPrintText || ''))
    .toBe(reportText);
  await expect(page.locator('#review-text-print')).toContainText('QUIZ REVIEW REPORT');
  await expect(page.locator('#review-text-print')).toContainText('Sources to Review');

  const localHistoryCountBeforeReset = await page.evaluate(() => {
    const rows = JSON.parse(localStorage.getItem(window.__ROCKET_HISTORY_STORAGE_KEY__) || '[]');
    return Array.isArray(rows) ? rows.length : 0;
  });
  expect(localHistoryCountBeforeReset).toBeGreaterThan(0);

  mark('retake incorrect');
  await page.locator('#retake-incorrect').click();
  await expect(page.locator('#quiz-screen')).toBeVisible();
  await expect(page.locator('#question-text')).toBeVisible();
  await page.locator('#dont-know-answer').click();
  await expectLiveScoreRatioValid(page);
  await page.locator('#finish-quiz').click();
  await expect(page.locator('#review-screen')).toBeVisible();
  expectVersionQuery(page.url());

  expect(apiPostRequests).toEqual([]);
  expect(apiPostResponses).toEqual([]);

  await page.locator('#reset-wrong-count').click();
  await expect(page.locator('#reset-wrong-count-dialog')).toBeVisible();
  await page.locator('#cancel-reset-wrong-count').click();
  await expect(page.locator('#reset-wrong-count-dialog')).not.toBeVisible();

  const dialogCountBeforeReset = dialogMessages.length;
  await page.locator('#reset-wrong-count').click();
  await expect(page.locator('#reset-wrong-count-dialog')).toBeVisible();
  await page.locator('#confirm-reset-wrong-count').click();
  await expect(page.locator('#reset-wrong-count-dialog')).not.toBeVisible();
  await expect
    .poll(() =>
      dialogMessages
        .slice(dialogCountBeforeReset)
        .some((entry) => /^Answered-question history reset\. Total answered rows: \d+ -> 0\.$/.test(entry.message))
    )
    .toBeTruthy();
  await expect
    .poll(() =>
      page.evaluate(() => {
        const rows = JSON.parse(localStorage.getItem(window.__ROCKET_HISTORY_STORAGE_KEY__) || '[]');
        return Array.isArray(rows) ? rows.length : -1;
      })
    )
    .toBe(0);
  await expect(page.evaluate(() => localStorage.getItem('rocket_questions_history_local'))).resolves.toBeNull();

  await page.locator('#back-setup-from-review').click();
  await expect(page.locator('#config-screen')).toBeVisible();
  mark('done');
});

test('version query survives routing for root and /test1 base paths', async ({ browser }) => {
  await expectVersionQueryAcrossBasePaths(browser);
});

test('path-based webpage hierarchy keeps the session in one tab', async ({ page }) => {
  await page.addInitScript(() => {
    window.__ROCKET_DISABLE_CHANGE_SERVER_SYNC__ = true;
    window.__ROCKET_DISABLE_HISTORY_SERVER_SYNC__ = true;
  });

  await waitForAppReady(page);
  await dismissWalkthroughPrompt(page);

  await expect(page).toHaveURL(routePattern('/'));
  await continueIntoCourseWorkspace(page);
  await expect(page).toHaveURL(routePattern('/netc-121'));

  await page.locator('#go-notes').click();
  await expect(page.locator('#notes-screen')).toBeVisible();
  await expect(page).toHaveURL(new RegExp(`${BASE_PATH}/netc-121/notes/[A-Za-z0-9_/-]+\\.html$`));
  const firstNoteRoute = page.url();
  const firstNotePath = await page.locator('#notes-current-path').textContent();

  await page.reload();
  await page.waitForFunction(() => window.__NETC_QUIZ_APP_READY__ === true);
  await expect(page.locator('#notes-screen')).toBeVisible();
  await expect(page).toHaveURL(new RegExp(`${BASE_PATH}/netc-121/notes/[A-Za-z0-9_/-]+\\.html$`));
  await expect(page.locator('#notes-current-path')).toHaveText(firstNotePath || '');

  const secondNote = page.locator('.notes-tree-file').nth(1);
  await secondNote.click();
  await expect(page.locator('#notes-current-path')).not.toHaveText(firstNotePath || '');
  await expect.poll(() => page.url()).not.toBe(firstNoteRoute);
  await expect(page).toHaveURL(new RegExp(`${BASE_PATH}/netc-121/notes/[A-Za-z0-9_/-]+\\.html$`));

  await page.locator('#back-notes-to-menu').click();
  await expect(page.locator('#menu-screen')).toBeVisible();
  await expect(page).toHaveURL(routePattern('/netc-121'));

  await page.locator('#go-practice-quiz').click();
  await expect(page.locator('#week-screen')).toBeVisible();
  await expect(page).toHaveURL(routePattern('/netc-121/practice/weeks'));

  await page.locator('#continue-setup').click();
  await expect(page.locator('#config-screen')).toBeVisible();
  await expect(page).toHaveURL(routePattern('/netc-121/practice/setup'));
});

test('back refresh and forward preserve state across note and quiz pages', async ({ page }) => {
  const mark = (label) => console.log(`HISTORY: ${label}`);
  await page.addInitScript(() => {
    window.__ROCKET_DISABLE_CHANGE_SERVER_SYNC__ = true;
    window.__ROCKET_DISABLE_HISTORY_SERVER_SYNC__ = true;
  });

  mark('boot');
  await waitForAppReady(page);
  await dismissWalkthroughPrompt(page);
  await continueIntoCourseWorkspace(page);

  mark('notes open');
  await page.locator('#go-notes').click();
  await expect(page.locator('#notes-screen')).toBeVisible();

  const firstNotePath = await page.locator('#notes-current-path').textContent();
  const secondNote = page.locator('.notes-tree-file').nth(1);
  await secondNote.click();
  await expect(page.locator('#notes-current-path')).not.toHaveText(firstNotePath || '');
  const secondNotePath = await page.locator('#notes-current-path').textContent();
  const secondNoteUrl = page.url();

  mark('notes back');
  await page.goBack();
  await expect(page.locator('#notes-screen')).toBeVisible();
  await expect(page.locator('#notes-current-path')).toHaveText(firstNotePath || '');

  mark('notes forward');
  await page.goForward();
  await expect(page.locator('#notes-screen')).toBeVisible();
  await expect(page.locator('#notes-current-path')).toHaveText(secondNotePath || '');
  await expect.poll(() => page.url()).toBe(secondNoteUrl);

  mark('notes reload');
  await page.reload();
  await page.waitForFunction(() => window.__NETC_QUIZ_APP_READY__ === true);
  await expect(page.locator('#notes-screen')).toBeVisible();
  await expect(page.locator('#notes-current-path')).toHaveText(secondNotePath || '');
  await expect.poll(() => page.url()).toBe(secondNoteUrl);

  await page.locator('#back-notes-to-menu').click();
  await expect(page.locator('#menu-screen')).toBeVisible();
  mark('quiz open');
  await page.locator('#go-practice-quiz').click();
  await expect(page.locator('#week-screen')).toBeVisible();
  await page.locator('#continue-setup').click();
  await expect(page.locator('#config-screen')).toBeVisible();
  await page.locator('#question-count').fill('3');
  await page.locator('#start-quiz').click();
  await expect(page.locator('#quiz-screen')).toBeVisible();
  await expect(page).toHaveURL(routePattern('/netc-121/practice/quiz'));
  await expect(page.locator('input[name="answer"]').first()).toBeVisible();

  const quizQuestionText = await page.locator('#question-text').textContent();
  const firstAnswer = page.locator('input[name="answer"]').first();
  await firstAnswer.click();
  await page.locator('#submit-answer').click();
  await expect(page.locator('#feedback')).not.toHaveText('');

  mark('quiz back');
  await page.goBack();
  await expect(page.locator('#config-screen')).toBeVisible();
  await expect(page).toHaveURL(routePattern('/netc-121/practice/setup'));

  mark('quiz forward');
  await page.goForward();
  await expect(page.locator('#quiz-screen')).toBeVisible();
  await expect(page).toHaveURL(routePattern('/netc-121/practice/quiz'));
  await expect(page.locator('input[name="answer"]').first()).toBeVisible();
  await expect(page.locator('#question-text')).toHaveText(quizQuestionText || '');
  await expect(page.locator('#feedback')).not.toHaveText('');

  mark('quiz reload');
  await page.reload();
  await page.waitForFunction(() => window.__NETC_QUIZ_APP_READY__ === true);
  await expect(page.locator('#quiz-screen')).toBeVisible();
  await expect(page).toHaveURL(/\/netc-121\/practice\/quiz$/);
  await expect(page.locator('input[name="answer"]').first()).toBeVisible();
  await expect(page.locator('#question-text')).toHaveText(quizQuestionText || '');
  await expect(page.locator('#feedback')).not.toHaveText('');

  mark('review open');
  await page.locator('#finish-quiz').click();
  await expect(page.locator('#review-screen')).toBeVisible();
  await expect(page).toHaveURL(/\/netc-121\/practice\/review$/);
  const reviewSummary = await page.locator('#review-summary').textContent();
  const reviewText = await page.locator('#review-text').textContent();

  mark('review back');
  await page.goBack();
  await expect(page.locator('#quiz-screen')).toBeVisible();
  await expect(page).toHaveURL(/\/netc-121\/practice\/quiz$/);
  await expect(page.locator('input[name="answer"]').first()).toBeVisible();

  mark('review forward');
  await page.goForward();
  await expect(page.locator('#review-screen')).toBeVisible();
  await expect(page).toHaveURL(/\/netc-121\/practice\/review$/);
  await expect(page.locator('#review-summary')).toHaveText(reviewSummary || '');
  await expect(page.locator('#review-text')).toHaveText(reviewText || '');

  mark('review reload');
  await page.reload();
  await page.waitForFunction(() => window.__NETC_QUIZ_APP_READY__ === true);
  await expect(page.locator('#review-screen')).toBeVisible();
  await expect(page).toHaveURL(/\/netc-121\/practice\/review$/);
  await expect(page.locator('#review-summary')).toHaveText(reviewSummary || '');
  await expect(page.locator('#review-text')).toHaveText(reviewText || '');
});
