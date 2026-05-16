import { test, expect } from '@playwright/test';

test('netc-121 classful ip PBQ launches and grades correct answers', async ({ page }) => {
  await page.goto('/');

  await page.locator('#course-select').selectOption('netc121');
  await page.locator('#continue-course').click();
  await expect(page.locator('#menu-screen')).toBeVisible();

  await page.locator('#go-pbqs').click();
  await expect(page.locator('#pbq-screen')).toBeVisible();
  await expect(page.locator('#pbq-list')).toContainText('Classful IP Addressing');

  await page.locator('.pbq-card', { hasText: 'Classful IP Addressing' }).locator('a', { hasText: 'Launch PBQ' }).click();
  await expect(page).toHaveURL(/courses\/NETC-121\/pbqs\/classful-ip-addressing\/index\.html/);

  await page.waitForFunction(() => typeof window.__CLASSFUL_IP_PBQ__?.getDebug === 'function');

  const debug = await page.evaluate(() => window.__CLASSFUL_IP_PBQ__.getDebug());
  await page.evaluate((answers) => {
    window.__CLASSFUL_IP_PBQ__.fillAnswers(answers);
    window.__CLASSFUL_IP_PBQ__.submit();
  }, debug.answers);

  await expect(page.locator('#review-screen')).toBeVisible();
  await expect(page.locator('#review-summary')).toContainText('5/5');
  await expect(page.locator('#review-rich-text')).toContainText('Network address');
});

test('network plus launcher shows classful ip PBQ and opens it', async ({ page }) => {
  await page.goto('/');

  await page.locator('#certification-select').selectOption('comptia-network-plus-n10-009');
  await page.locator('#continue-certification').click();
  await expect(page.locator('#menu-screen')).toBeVisible();

  await page.locator('#go-pbqs').click();
  await expect(page.locator('#pbq-screen')).toBeVisible();
  await expect(page.locator('#pbq-list')).toContainText('Classful IP Addressing');

  const classfulCard = page.locator('.pbq-card', { hasText: 'Classful IP Addressing' });
  await expect(classfulCard).toContainText('scratch paper');
  await classfulCard.locator('a', { hasText: 'Launch PBQ' }).click();

  await expect(page).toHaveURL(/courses\/NETC-121\/pbqs\/classful-ip-addressing\/index\.html/);
  await expect(page.locator('#workspace-screen')).toBeVisible();
  await expect(page.locator('#question-address')).toBeVisible();
});

test('network plus launcher shows classless ip PBQ and opens it', async ({ page }) => {
  await page.goto('/');

  await page.locator('#certification-select').selectOption('comptia-network-plus-n10-009');
  await page.locator('#continue-certification').click();
  await expect(page.locator('#menu-screen')).toBeVisible();

  await page.locator('#go-pbqs').click();
  await expect(page.locator('#pbq-screen')).toBeVisible();
  await expect(page.locator('#pbq-list')).toContainText('Classless IP Subnetting');

  const classlessCard = page.locator('.pbq-card', { hasText: 'Classless IP Subnetting' });
  await expect(classlessCard).toContainText('subnet mask');
  await classlessCard.locator('a', { hasText: 'Launch PBQ' }).click();

  await expect(page).toHaveURL(/courses\/NETC-121\/pbqs\/classless-ip-subnetting\/index\.html/);
  await expect(page.locator('#workspace-screen')).toBeVisible();
  await expect(page.locator('#question-mask')).toBeVisible();
});

test('netc-121 classless ip PBQ launches and grades correct answers', async ({ page }) => {
  await page.goto('/');

  await page.locator('#course-select').selectOption('netc121');
  await page.locator('#continue-course').click();
  await expect(page.locator('#menu-screen')).toBeVisible();

  await page.locator('#go-pbqs').click();
  await expect(page.locator('#pbq-screen')).toBeVisible();
  await expect(page.locator('#pbq-list')).toContainText('Classless IP Subnetting');

  const classlessCard = page.locator('.pbq-card', { hasText: 'Classless IP Subnetting' });
  await classlessCard.locator('a', { hasText: 'Launch PBQ' }).click();
  await expect(page).toHaveURL(/courses\/NETC-121\/pbqs\/classless-ip-subnetting\/index\.html/);

  await page.waitForFunction(() => typeof window.__CLASSLESS_IP_PBQ__?.getDebug === 'function');
  const debug = await page.evaluate(() => window.__CLASSLESS_IP_PBQ__.getDebug());
  await page.evaluate((answers) => {
    window.__CLASSLESS_IP_PBQ__.fillAnswers(answers);
    window.__CLASSLESS_IP_PBQ__.submit();
  }, debug.answers);

  await expect(page.locator('#review-screen')).toBeVisible();
  await expect(page.locator('#review-summary')).toContainText('6/6');
  await expect(page.locator('#review-rich-text')).toContainText('CIDR prefix');
});