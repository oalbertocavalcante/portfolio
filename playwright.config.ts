import { defineConfig, devices } from '@playwright/test';
import { siteConfig } from './src/config/site';

const PORT = 4321;
const ORIGIN = `http://127.0.0.1:${PORT}`;
const isCI = Boolean(process.env.CI);

export default defineConfig({
  testDir: './tests/e2e',
  fullyParallel: true,
  forbidOnly: isCI,
  retries: isCI ? 1 : 0,
  ...(isCI ? { workers: 2 } : {}),
  reporter: isCI ? [['github'], ['html', { open: 'never' }]] : 'list',
  use: {
    baseURL: `${ORIGIN}${siteConfig.base}/`,
    trace: 'retain-on-failure',
  },
  webServer: {
    command: `npx astro preview --port ${PORT} --host 127.0.0.1`,
    url: `${ORIGIN}${siteConfig.base}/`,
    reuseExistingServer: !isCI,
    timeout: 60_000,
  },
  projects: [
    { name: 'desktop', use: { ...devices['Desktop Chrome'] } },
    {
      name: 'mobile',
      use: { ...devices['Pixel 7'] },
      testIgnore: [/layout\.spec\.ts/, /links\.spec\.ts/, /security\.spec\.ts/],
    },
  ],
});
