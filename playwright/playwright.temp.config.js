const { defineConfig } = require('@playwright/test');

const PORT = process.env.PLAYWRIGHT_PORT || '3003';
const BASE_PATH = (() => {
  const value = String(process.env.PLAYWRIGHT_BASE_PATH || '/').trim();
  if (!value || value === '/') return '';
  return `/${value.replace(/^\/+|\/+$/g, '')}`;
})();
const BASE_URL = `http://127.0.0.1:${PORT}${BASE_PATH}`;

module.exports = defineConfig({
  testDir: '.',
  timeout: 120_000,
  expect: {
    timeout: 15_000,
  },
  use: {
    baseURL: BASE_URL,
    headless: true,
    trace: 'on-first-retry',
  },
  projects: [
    {
      name: 'firefox-system',
      use: {
        browserName: 'firefox',
        launchOptions: {
          executablePath: process.env.PLAYWRIGHT_FIREFOX_EXECUTABLE_PATH || '.playwright-browsers/manual-firefox/firefox/firefox',
        },
      },
    },
  ],
  webServer: {
    command: `python3 ../server.py ${PORT}`,
    url: BASE_URL,
    reuseExistingServer: true,
    timeout: 30_000,
    env: {
      PRACTICE_QUIZ_RECORDS_DIR: '/tmp/rocket-questions-playwright-records',
      ROCKET_BASE_PATH: BASE_PATH || '/',
    },
  },
});
