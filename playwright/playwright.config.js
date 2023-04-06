import { defineConfig, devices } from '@playwright/test';
export default defineConfig({
  testDir: './tests',
  timeout: 30 * 1000,
  expect: { timeout: 5000 },
  forbidOnly: true,
  retries: 2,
  workers: 1,
  use: { actionTimeout: 0, trace: 'on-first-retry', headless: false },
  webServer: { command: 'npm run start', port: 3000 },
  projects: [
    { name: 'chrome', use: devices['Desktop Chrome'] },
    { name: 'firefox', use: devices['Desktop Firefox'] },
    { name: 'safari', use: devices['Desktop Safari'] }
  ]
});