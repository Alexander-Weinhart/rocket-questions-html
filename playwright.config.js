const { defineConfig } = require('@playwright/test');

module.exports = defineConfig({
  testDir: './tests',
  timeout: 120_000,
  expect: {
    timeout: 15_000,
  },
  use: {
    baseURL: 'http://127.0.0.1:3003',
    headless: true,
    trace: 'on-first-retry',
  },
  webServer: {
    command: 'python3 server.py 3003',
    url: 'http://127.0.0.1:3003',
    reuseExistingServer: true,
    timeout: 30_000,
    env: {
      PRACTICE_QUIZ_RECORDS_DIR: '/tmp/rocket-questions-playwright-records',
    },
  },
});
