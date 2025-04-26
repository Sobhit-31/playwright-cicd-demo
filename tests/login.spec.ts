import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

test('Valid user can log in and see dashboard', async ({ page }) => {
    const loginPage = new LoginPage(page);
  
    await loginPage.goto();
    await loginPage.login('Admin', 'admin123');
  
    // Assert Dashboard is visible
    const dashboard = await loginPage.isDashboardVisible();
    await expect(dashboard).toBeVisible();
  });