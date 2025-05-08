import { Page, expect } from '@playwright/test';

export class ProductsPage {
    constructor(private page: Page) {}

    async addItemToCart(itemName: string) {
        await this.page.click(`text=${itemName}`);
        await this.page.click('button[data-test="add-to-cart"]');
    }

    async goToCart() {
        await this.page.click('.shopping_cart_link');
    }
}