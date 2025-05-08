import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { ProductsPage } from '../pages/ProductsPage';
import { CartPage } from '../pages/CartPage';
import { CheckoutPage } from '../pages/CheckoutPage';

test('SauceDemo full purchase flow', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const productsPage = new ProductsPage(page);
    const cartPage = new CartPage(page);
    const checkoutPage = new CheckoutPage(page);

    await loginPage.goto();
    await loginPage.login('standard_user', 'secret_sauce');
    expect(await loginPage.isProductsPageVisible()).toBeTruthy();

    await productsPage.addItemToCart('Sauce Labs Backpack');
    await productsPage.goToCart();

    await cartPage.proceedToCheckout();
    await checkoutPage.fillInformation('Sobhit', 'Mahalinga', '411001');
    await checkoutPage.finishCheckout();
    expect(await checkoutPage.isThankYouMessageVisible()).toBeTruthy();
});