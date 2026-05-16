const { test, expect } = require('@playwright/test');

test('network plus exam mode includes only the Port Number Matching PBQ', async ({ page }) => {
  await page.goto('/');
  await page.waitForFunction(() => window.__NETC_QUIZ_APP_READY__ === true);

  await page.selectOption('#certification-select', 'comptia-network-plus-n10-009');
  await page.locator('#continue-certification').click();
  await expect(page.locator('#menu-screen')).toBeVisible();

  await page.locator('#go-practice-quiz').click();
  await expect(page.locator('#week-screen')).toBeVisible();
  await page.locator('#continue-setup').click();
  await expect(page.locator('#config-screen')).toBeVisible();

  await page.selectOption('#grading-mode-select', 'exam');
  await expect(page.locator('#question-count-label')).toContainText('there are 90 on the exam');

  await page.locator('#start-quiz').click();
  await expect(page.locator('#quiz-screen')).toBeVisible();
  await expect(page.locator('#exam-nav')).toBeVisible();
  await expect(page.locator('#exam-nav-list')).toContainText('PBQ1');
  await expect(page.locator('#exam-nav-list')).not.toContainText('PBQ2');

  await page.locator('.exam-nav-item', { hasText: 'PBQ1' }).click();
  await expect(page.locator('#quiz-meta')).toContainText('PBQ1');
  await expect(page.locator('#question-text')).toContainText('Port Number Matching');
  await expect(page.locator('#choice-a')).toContainText('FTP tcp/21');
});
