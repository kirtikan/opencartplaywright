import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  timeout: 30 * 1000, //30000 ms(30 secs) 
  testDir: './tests',
  fullyParallel: true,
  //retries: process.env.CI ? 2 : 0, 
  retries: 1,
  //workers: process.env.CI ? 1 : undefined, 
  workers: 1,

  reporter: [
    ['html', { outputFolder: './reports/html-report' }
    ],
    ['allure-playwright', {
      outputFolder: 'allure-results',
      suiteTitle: true,
      environmentInfo: {
        // App Info
        App_URL: process.env.APP_URL || 'https://opencart.example.com',
        App_Version: process.env.APP_VERSION || '1.0.0',
        Environment: process.env.ENV || 'QA',

        // Browser & OS
        Browser: 'Chromium',
        Browser_Version: process.env.BROWSER_VERSION || 'latest',
        OS: process.platform,

        // Node & Playwright
        Node_Version: process.version,
        // Execution Info
        Execution_Mode: process.env.CI ? 'CI Pipeline' : 'Local',
        Run_By: process.env.USERNAME || process.env.USER || 'unknown',
      }
    }
    ],
    ['dot'],
    ['list']
  ],

  use: {
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    //headless: false, 
    viewport: { width: 1280, height: 720 }, // Set default viewport size for consistency 
    ignoreHTTPSErrors: true, // Ignore SSL errors if necessary
    permissions: ['geolocation'], // Set necessary permissions for geolocation-based tests
  },

  //grep: /@master/,

  projects: [
    {
      name: 'chromium', use: { ...devices['Desktop Chrome'] },
    },
    /*{
      name: 'firefox', use: { ...devices['Desktop Firefox'] }, 
    },
    { 
      name: 'webkit', use: { ...devices['Desktop Safari'] }, 
    } */
  ],

});