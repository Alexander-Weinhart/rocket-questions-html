const { test, expect } = require('@playwright/test');

test('network plus port number matching pbq grades after all ports are placed', async ({ page }) => {
  await page.addInitScript(() => {
    window.__copiedText = '';
    window.__printCalls = 0;

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
  });

  await page.goto('/');
  await page.waitForFunction(() => window.__NETC_QUIZ_APP_READY__ === true);
  await page.selectOption('#certification-select', 'comptia-network-plus-n10-009');
  await page.locator('#continue-certification').click();
  await expect(page.locator('#menu-screen')).toBeVisible();

  await page.locator('#go-pbqs').click();
  await expect(page.locator('#pbq-screen')).toBeVisible();
  await expect(page.locator('#pbq-list')).toContainText('Port Number Matching');

  await page.locator('#pbq-list a', { hasText: 'Launch PBQ' }).click();
  await expect(page).toHaveURL(/courses\/Network%2B\/pbqs\/port-number-matching\/index\.html/);
  await page.waitForFunction(() => typeof window.__PORT_MATCHING_PBQ__?.getDebug === 'function');
  await expect(page.locator('#workspace-screen h2')).toContainText('Port Number Matching');
  await expect(page.locator('#submit-pbq')).toBeDisabled();
  const initialBoardDebug = await page.evaluate(() => window.__PORT_MATCHING_PBQ__.getDebug());

  const token20 = page.locator('.pbq-token', { hasText: 'tcp/20' }).first();
  await expect(token20).toHaveAttribute('draggable', 'true');
  await page.evaluate(() => {
    window.__PORT_MATCHING_PBQ__.placeTokenByLabel('tcp/20', 'ftp-slot-1');
  });
  await expect(page.locator('#placed-count')).toHaveText('1 / 25');
  await expect(page.locator('#submit-pbq')).toBeDisabled();

  await page.evaluate(() => {
    window.__PORT_MATCHING_PBQ__.autofillCorrect();
  });

  await expect(page.locator('#placed-count')).toHaveText('25 / 25');
  await expect(page.locator('#submit-pbq')).toBeEnabled();

  await page.locator('#submit-pbq').click();
  await expect(page.locator('#workspace-screen')).toBeVisible();
  await expect(page.locator('#review-screen')).toBeHidden();
  await expect(page.locator('#submit-status-label')).toHaveText('Grading in progress...');
  await expect.poll(async () => page.locator('.pbq-slot-grade-mark.is-visible').count()).toBeGreaterThan(0);
  await expect.poll(() => page.evaluate(() => window.__PORT_MATCHING_PBQ__.getDebug().audioEvents.length)).toBeGreaterThan(0);

  await expect(page.locator('#review-screen')).toBeVisible();
  await expect(page.locator('#review-summary')).toContainText('25/25');
  await expect(page.locator('#review-text')).toHaveValue(/PBQ REVIEW REPORT/);
  await expect(page.locator('#review-rich-text')).toContainText('File Transfer Protocol');
  await expect(page.locator('#review-rich-text')).toContainText('Correct');
  await expect.poll(() => page.evaluate(() => window.__PORT_MATCHING_PBQ__.getDebug().audioEvents.length)).toBe(25);

  const reportText = await page.locator('#review-text').inputValue();

  await page.locator('#copy-report').click();
  await expect.poll(() => page.evaluate(() => window.__rocketLastCopyText || '')).toBe(reportText);

  await page.locator('#download-report').click();
  await expect.poll(() => page.evaluate(() => window.__rocketLastDownloadMeta?.filename || '')).toBe('network_plus_port_number_matching_report.txt');
  await expect.poll(() => page.evaluate(() => window.__rocketLastDownloadMeta?.text || '')).toBe(reportText);

  await page.locator('#print-report').click();
  await expect.poll(() => page.evaluate(() => window.__printCalls || 0)).toBe(1);
  await expect.poll(() => page.evaluate(() => window.__rocketLastPrintText || '')).toBe(reportText);

  await page.locator('#retry-pbq').click();
  await expect(page.locator('#workspace-screen')).toBeVisible();
  await expect(page.locator('#submit-pbq')).toBeDisabled();
  await expect(page.locator('#placed-count')).toHaveText('0 / 25');
  const reshuffledBoardDebug = await page.evaluate(() => window.__PORT_MATCHING_PBQ__.getDebug());
  expect(
    JSON.stringify(reshuffledBoardDebug.protocolOrder) !== JSON.stringify(initialBoardDebug.protocolOrder)
      || JSON.stringify(reshuffledBoardDebug.tokenOrder) !== JSON.stringify(initialBoardDebug.tokenOrder)
  ).toBeTruthy();

  await page.evaluate(() => {
    window.__PORT_MATCHING_PBQ__.setPlacements({
      'ftp-slot-1': 'tcp/80',
      'ftp-slot-2': 'tcp/20',
      'http-slot-1': 'tcp/21',
    });
    window.__PORT_MATCHING_PBQ__.autofillCorrect();
  });

  await expect(page.locator('#placed-count')).toHaveText('25 / 25');
  await page.locator('#submit-pbq').click();
  await expect(page.locator('#review-screen')).toBeVisible();
  await expect(page.locator('#review-summary')).toContainText('22/25');
  await expect(page.locator('#retry-missed-pbq')).toBeVisible();
  await expect(page.locator('#retry-missed-pbq')).toContainText('Retake Only Missed (2)');

  await page.locator('#retry-missed-pbq').click();
  await expect(page.locator('#workspace-screen')).toBeVisible();
  await expect(page.locator('#placed-count')).toHaveText('0 / 3');
  await expect(page.locator('#remaining-count')).toHaveText('3');
  await expect.poll(() => page.evaluate(() => window.__PORT_MATCHING_PBQ__.getDebug().activeProtocolIds.join(','))).toBe('ftp,http');

  await page.evaluate(() => {
    window.__PORT_MATCHING_PBQ__.autofillCorrect();
  });
  await expect(page.locator('#placed-count')).toHaveText('3 / 3');
  await page.locator('#submit-pbq').click();
  await expect(page.locator('#review-screen')).toBeVisible();
  await expect(page.locator('#review-summary')).toContainText('3/3');
  await expect(page.locator('#retry-missed-pbq')).toBeHidden();
});
