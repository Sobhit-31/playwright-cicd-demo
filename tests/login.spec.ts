import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

test.describe('Login Functionality', () => {
  
  test('Valid user can log in and see dashboard', async ({ page }, testInfo) => {
    const loginPage = new LoginPage(page);

    // Log test info
    console.log(`Starting test: ${testInfo.title}`);

    // Step 1: Navigate to Login Page
    await test.step('Go to Login Page', async () => {
      await loginPage.goto();
    });

    // Step 2: Perform Login
    await test.step('Login with valid credentials', async () => {
      await loginPage.login('Admin', 'admin123');
    });

    // Step 3: Verify Dashboard
    await test.step('Verify dashboard is visible', async () => {
      const dashboard = await loginPage.isDashboardVisible();
      await expect(dashboard, 'Dashboard should be visible after login').toBeVisible();
    });

    // Capture a screenshot after successful login
    await page.screenshot({ path: `screenshots/login-success-${Date.now()}.png`, fullPage: true });
  });

});
