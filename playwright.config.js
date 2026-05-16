const { defineConfig } = require('@playwright/test');

const PORT = process.env.PLAYWRIGHT_PORT || '3003';
const PLAYWRIGHT_EXECUTABLE_PATH = process.env.PLAYWRIGHT_EXECUTABLE_PATH || '/usr/bin/google-chrome';
const BASE_PATH = (() => {
  const value = String(process.env.PLAYWRIGHT_BASE_PATH || '/').trim();
  if (!value || value === '/') return '';
  return `/${value.replace(/^\/+|\/+$/g, '')}`;
})();
const BASE_URL = `http://127.0.0.1:${PORT}${BASE_PATH}`;

module.exports = defineConfig({
  testDir: './tests',
  timeout: 120_000,
  expect: {
    timeout: 15_000,
  },
  use: {
    baseURL: BASE_URL,
    browserName: 'chromium',
    headless: true,
    launchOptions: {
      executablePath: PLAYWRIGHT_EXECUTABLE_PATH,
    },
    trace: 'on-first-retry',
  },
  webServer: {
    command: `python3 server.py ${PORT}`,
    url: BASE_URL,
    reuseExistingServer: true,
    timeout: 30_000,
    env: {
      PRACTICE_QUIZ_RECORDS_DIR: '/tmp/rocket-questions-playwright-records',
      ROCKET_BASE_PATH: BASE_PATH || '/',
    },
  },
});
