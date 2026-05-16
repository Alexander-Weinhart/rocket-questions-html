const { test, expect } = require('@playwright/test');

async function enterWorkspace(page) {
  await page.goto('/');
  await page.waitForFunction(() => window.__NETC_QUIZ_APP_READY__ === true);
  await page.selectOption('#course-select', 'netc121');
  await page.locator('#continue-course').click();
  await expect(page.locator('#menu-screen')).toBeVisible();
}

test('desktop header shows Rocket Questions and toggles the notes sidebar', async ({ page }, testInfo) => {
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto('/');
  await page.waitForFunction(() => window.__NETC_QUIZ_APP_READY__ === true);

  await expect(page).toHaveTitle('Rocket Questions');
  await expect(page.locator('#app-title')).toContainText('Rocket Questions');

  await enterWorkspace(page);

  await expect(page.locator('#toggle-notes-sidebar')).toHaveCount(0);
  await page.screenshot({ path: testInfo.outputPath('desktop-header-no-menu-button.png'), fullPage: true });
});

test('mobile header no longer shows the menu hamburger button', async ({ page }, testInfo) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/');
  await page.waitForFunction(() => window.__NETC_QUIZ_APP_READY__ === true);

  await enterWorkspace(page);

  await expect(page.locator('#toggle-notes-sidebar')).toHaveCount(0);
  await page.screenshot({ path: testInfo.outputPath('mobile-header-no-menu-button.png'), fullPage: true });
});
