import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';

dotenv.config();

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  reporter: [['html', { open: 'never' }], ['list']],
  forbidOnly: !!process.env.IS_CI_ENVIRONMENT,
  retries: process.env.PW_RETRIES ? Number(process.env.PW_RETRIES) : 0,
  workers: process.env.PW_WORKERS ? Number(process.env.PW_WORKERS) : undefined,
  timeout: process.env.PW_TIMEOUT ? Number(process.env.PW_TIMEOUT) : 30000,
  expect: {
    timeout: process.env.PW_EXPECT_TIMEOUT ? Number(process.env.PW_EXPECT_TIMEOUT) : 50000,
  },
  use: {
    baseURL: process.env.APP_BASE_URL || 'http://localhost:3000',
    trace: 'retain-on-failure',
    video: 'retain-on-failure',
    screenshot: 'only-on-failure',
    headless: true,
    viewport: { width: 1280, height: 720 },
    storageState: {
      cookies: [
        {
          name: 'language',
          value: 'ru_RU',
          domain: 'localhost',
          path: '/',
          expires: -1,
          httpOnly: false,
          secure: false,
          sameSite: 'Lax',
        },
        {
          name: 'welcomebanner_status',
          value: 'dismiss',
          domain: 'localhost',
          path: '/',
          expires: -1,
          httpOnly: false,
          secure: false,
          sameSite: 'Lax',
        },
        {
          name: 'cookieconsent_status',
          value: 'dismiss',
          domain: 'localhost',
          path: '/',
          expires: -1,
          httpOnly: false,
          secure: false,
          sameSite: 'Lax',
        }
      ],
      origins: []
    }
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    }
  ]
});
