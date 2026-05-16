const { test, expect } = require('@playwright/test');

const HISTORY_STORAGE_KEY = 'rocket_questions_confetti_playwright';
const BASE_PATH = (() => {
  const value = String(process.env.PLAYWRIGHT_BASE_PATH || '/').trim();
  if (!value || value === '/') return '';
  return `/${value.replace(/^\/+|\/+$/g, '')}`;
})();

function appPath(pathname = '/') {
  const normalized = pathname.startsWith('/') ? pathname : `/${pathname}`;
  return `${BASE_PATH}${normalized}` || '/';
}

async function waitForAppReady(page, path = '/') {
  await page.goto(appPath(path));
  await page.waitForFunction(() => window.__NETC_QUIZ_APP_READY__ === true);
}

async function dismissWalkthroughPrompt(page) {
  const overlay = page.locator('#walkthrough-overlay');
  if (!(await overlay.isVisible())) return;

  const noButton = page.locator('#walkthrough-no');
  if (await noButton.isVisible()) {
    await noButton.click();
    return;
  }

  const mobileContinueButton = page.locator('#walkthrough-mobile-continue');
  if (await mobileContinueButton.isVisible()) {
    await mobileContinueButton.click();
  }
}

async function bootNetworkPlusQuiz(page) {
  await waitForAppReady(page);
  await dismissWalkthroughPrompt(page);
  await page.selectOption('#certification-select', 'comptia-network-plus-n10-009');
  await page.locator('#continue-certification').click();
  await expect(page.locator('#menu-screen')).toBeVisible();
  await page.locator('#go-practice-quiz').click();
  await expect(page.locator('#week-screen')).toBeVisible();
  await page.locator('#continue-setup').click();
  await expect(page.locator('#config-screen')).toBeVisible();
}

async function answerCurrentQuestionCorrectly(page) {
  const correctChoice = await page.evaluate(() => window.__ROCKET_TEST__.getCurrentQuestionCorrectChoice());
  await page.locator(`input[name="answer"][value="${correctChoice}"]`).check();
  await page.locator('#submit-answer').click();
  await expect(page.locator('#feedback')).toContainText('Correct');
}

test.beforeEach(async ({ page }) => {
  await page.addInitScript((historyStorageKey) => {
    window.__ROCKET_HISTORY_STORAGE_KEY__ = historyStorageKey;
    window.__ROCKET_DISABLE_CHANGE_SERVER_SYNC__ = true;
    window.__ROCKET_DISABLE_HISTORY_SERVER_SYNC__ = true;
  }, HISTORY_STORAGE_KEY);
  await page.setViewportSize({ width: 1440, height: 1200 });
});

test('passing results show dense spinning confetti', async ({ page }) => {
  await bootNetworkPlusQuiz(page);
  await page.locator('#question-count').fill('2');
  await page.locator('#start-quiz').click();
  await expect(page.locator('#quiz-screen')).toBeVisible();

  await answerCurrentQuestionCorrectly(page);
  await page.locator('#next-question').click();
  await answerCurrentQuestionCorrectly(page);
  await page.locator('#finish-quiz').click();

  await expect(page.locator('#review-screen')).toBeVisible();
  await expect(page.locator('#review-summary')).toContainText('Score: 100.00%');
  await expect(page.locator('#results-confetti')).toHaveClass(/active/);
  await expect(page.locator('.results-confetti-piece')).toHaveCount(96);

  await page.screenshot({ path: '/tmp/rocket-questions-confetti-dense-1.png', fullPage: false });
  await page.waitForTimeout(900);
  await page.screenshot({ path: '/tmp/rocket-questions-confetti-dense-2.png', fullPage: false });
  await page.waitForTimeout(900);
  await page.screenshot({ path: '/tmp/rocket-questions-confetti-dense-3.png', fullPage: false });
});
