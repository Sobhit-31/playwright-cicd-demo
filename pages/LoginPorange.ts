import { Page } from '@playwright/test';

export class LoginPage {
  constructor(private page: Page) {}

  async goto() {
    await this.page.goto('https://opensource-demo.orangehrmlive.com');
  }

  async login(username: string, password: string) {
    await this.page.fill('input[name="username"]', username);
    await this.page.waitForTimeout(1000);
    await this.page.fill('input[name="password"]', password);
    // await this.page.waitForTimeout(1000);
    await this.page.click('button[type="submit"]');
  }

  async isDashboardVisible() {
    return this.page.locator('h6:has-text("Dashboard")');
  }
}
