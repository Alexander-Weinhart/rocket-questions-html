const { test, expect } = require('@playwright/test');

const BASE_PATH = (() => {
  const value = String(process.env.PLAYWRIGHT_BASE_PATH || '/').trim();
  if (!value || value === '/') return '';
  return `/${value.replace(/^\/+|\/+$/g, '')}`;
})();

function appPath(pathname = '/') {
  const normalized = pathname.startsWith('/') ? pathname : `/${pathname}`;
  return `${BASE_PATH}${normalized}` || '/';
}

async function bootNotes(page, selectionType, selectionValue) {
  await page.goto(appPath('/'));
  await page.waitForFunction(() => window.__NETC_QUIZ_APP_READY__ === true);

  const overlay = page.locator('#walkthrough-overlay');
  if (await overlay.isVisible()) {
    const noButton = page.locator('#walkthrough-no');
    if (await noButton.isVisible()) {
      await noButton.click();
    }
  }

  if (selectionType === 'course') {
    if (selectionValue) {
      await page.selectOption('#course-select', selectionValue);
    }
    await page.locator('#continue-course').click();
  } else {
    await page.selectOption('#certification-select', selectionValue);
    await page.locator('#continue-certification').click();
  }

  await expect(page.locator('#menu-screen')).toBeVisible();
  await page.locator('#go-notes').click();
  await expect(page.locator('#notes-screen')).toBeVisible();
}

test('NETC-121 video notes render the Plyr player at the top when a YouTube link exists', async ({ page }) => {
  await bootNotes(page, 'course', 'netc121');

  await page.locator('.notes-tree-toggle', { hasText: 'Notes List A - Video Content' }).click();
  await page.locator('.notes-tree-toggle', { hasText: 'Video 1 - TWISTED' }).click();
  await page.locator('.notes-tree-file', { hasText: 'TWISTED The dramatic history of twisted-pair Ethernet.md' }).click();

  const viewer = page.locator('#notes-viewer');
  const player = viewer.locator('[data-notes-video-player]');
  await expect(player).toBeVisible();
  await expect(player).toHaveAttribute('data-notes-video-pristine', 'true');
  await expect(viewer.locator('.notes-video-kicker')).toHaveCount(0);
  await expect(player.locator('iframe')).toHaveAttribute('src', /youtube-nocookie\.com\/embed\/f8PP5IHsL8Y/);
  await expect(player.locator('.plyr__control--overlaid')).toBeVisible();
  await player.hover();

  const initialControlsState = await player.locator('.plyr__controls').evaluate((node) => {
    const style = window.getComputedStyle(node);
    return {
      opacity: style.opacity,
      visibility: style.visibility,
    };
  });
  expect(initialControlsState.opacity).toBe('0');
  expect(initialControlsState.visibility).toBe('hidden');

  const firstChildClass = await viewer.evaluate((node) => node.firstElementChild?.className || '');
  expect(firstChildClass).toContain('notes-video-shell');
});

test('hard of hearing mode reveals the custom live caption panel for video notes', async ({ page }) => {
  await bootNotes(page, 'course', 'netc121');

  const hardOfHearingToggle = page.locator('.header-toggle');
  await expect(hardOfHearingToggle).toBeHidden();

  await page.locator('.notes-tree-toggle', { hasText: 'Notes List A - Video Content' }).click();
  await page.locator('.notes-tree-toggle', { hasText: 'Video 45 - What is Route Redistribution?' }).click();
  await page.locator('.notes-tree-file', { hasText: 'What is Route Redistribution?.md' }).click();

  await expect(hardOfHearingToggle).toBeVisible();
  const viewer = page.locator('#notes-viewer');
  const captionPanel = viewer.locator('[data-notes-video-caption-panel]');
  await expect(captionPanel).toHaveClass(/hidden/);

  await page.locator('#hard-of-hearing-toggle').check();
  await expect(captionPanel).toBeVisible();
  await expect(captionPanel.locator('[data-notes-video-caption-text]')).toHaveText('Captions will appear here while the video plays.');

  const playerFrame = page.frameLocator('[data-notes-video-player] iframe');
  await expect(playerFrame.getByText('More videos')).toHaveCount(0);

  const playerRoot = viewer.locator('[data-notes-video-player]');
  await page.waitForTimeout(5500);
  await expect(playerRoot).toHaveAttribute('data-notes-video-pristine', 'true');
  const pristineControlsState = await playerRoot.locator('.plyr__controls').evaluate((node) => {
    const style = window.getComputedStyle(node);
    return {
      opacity: style.opacity,
      visibility: style.visibility,
    };
  });
  expect(pristineControlsState.opacity).toBe('0');
  expect(pristineControlsState.visibility).toBe('hidden');
});

test('paused video notes keep the bottom controls visible without hover', async ({ page }) => {
  await bootNotes(page, 'course', 'netc121');

  await page.locator('.notes-tree-toggle', { hasText: 'Notes List A - Video Content' }).click();
  await page.locator('.notes-tree-toggle', { hasText: 'Video 1 - TWISTED' }).click();
  await page.locator('.notes-tree-file', { hasText: 'TWISTED The dramatic history of twisted-pair Ethernet.md' }).click();

  const player = page.locator('#notes-viewer [data-notes-video-player]');
  await expect(player).toBeVisible();

  await player.locator('.plyr__control--overlaid').click();
  await expect(player).not.toHaveAttribute('data-notes-video-pristine', 'true');

  const pauseButton = player.locator('.plyr__controls [data-plyr="play"]').first();
  await expect(pauseButton).toBeVisible();
  await pauseButton.click();

  await page.waitForTimeout(4500);
  const pausedControlsState = await player.locator('.plyr__controls').evaluate((node) => {
    const style = window.getComputedStyle(node);
    return {
      opacity: style.opacity,
      visibility: style.visibility,
    };
  });
  expect(pausedControlsState.opacity).not.toBe('0');
  expect(pausedControlsState.visibility).toBe('visible');
});

test('transcript parsing hooks map timestamps to cues', async ({ page }) => {
  await page.goto(appPath('/'));
  await page.waitForFunction(() => window.__NETC_QUIZ_APP_READY__ === true);

  const transcriptInfo = await page.evaluate(() => {
    const hooks = window.__ROCKET_NOTES_TEST_HOOKS__;
    const markdown = `# Demo\n\n## Transcript\n\n### 0:03 - 0:30\n\nroute redistribution is pretty cool.\n\n### 0:30 - 0:57\n\nsharing routes between protocols.\n`;
    const cues = hooks.parseTranscriptMarkdown(markdown);
    return {
      transcriptPath: hooks.noteTranscriptPath('Notes List A - Video Content/Video 45 - What is Route Redistribution?/What is Route Redistribution?.md'),
      cueCount: cues.length,
      firstCue: cues[0],
      secondCue: hooks.findTranscriptCueAtTime(cues, 35),
      clock: hooks.formatPlayerClock(185),
    };
  });

  expect(transcriptInfo.transcriptPath).toBe('Notes List A - Video Content/Video 45 - What is Route Redistribution?/Transcript.md');
  expect(transcriptInfo.cueCount).toBe(2);
  expect(transcriptInfo.firstCue.text).toBe('route redistribution is pretty cool.');
  expect(transcriptInfo.secondCue.text).toBe('sharing routes between protocols.');
  expect(transcriptInfo.clock).toBe('3:05');
});

test('non-video notes do not render the Plyr player', async ({ page }) => {
  await bootNotes(page, 'course', 'netc121');

  await page.locator('.notes-tree-file[data-path="MASTER LIST/Master List.md"]').click();

  await expect(page.locator('.header-toggle')).toBeHidden();
  await expect(page.locator('#notes-viewer [data-notes-video-player]')).toHaveCount(0);
});

test('transcript notes inside video folders do not show the YouTube caption toggle or player', async ({ page }) => {
  await bootNotes(page, 'certification', 'comptia-network-plus-n10-009');

  const topLevelVideoList = page.locator('.notes-tree-toggle', { hasText: 'Notes List A - Video Content' });
  await expect(topLevelVideoList).toBeVisible();
  if ((await topLevelVideoList.getAttribute('aria-expanded')) !== 'true') {
    await topLevelVideoList.click();
  }

  const lessonToggle = page.locator('.notes-tree-toggle', { hasText: '0.1.1 - How to Pass Your N10-009 Network+ Exam' });
  await expect(lessonToggle).toBeVisible();
  if ((await lessonToggle.getAttribute('aria-expanded')) !== 'true') {
    await lessonToggle.click();
  }

  await page.locator('.notes-tree-file[data-path="Notes List A - Video Content/0.1.1 - How to Pass Your N10-009 Network+ Exam/Transcript.md"]').click();

  await expect(page.locator('.header-toggle')).toBeHidden();
  await expect(page.locator('#notes-viewer [data-notes-video-player]')).toHaveCount(0);
});
