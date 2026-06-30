import { test, expect } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";
import { ProductPage } from "../pages/ProductPage";
import { CartPage } from "../pages/CartPage";
import { CheckoutPage } from "../pages/CheckoutPage";
import { users } from "../test-data/users";
import { channel } from "node:diagnostics_channel";

let loginPage, productPage, cartPage, checkoutPage;

test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    productPage = new ProductPage(page);
    cartPage = new CartPage(page);
    checkoutPage = new CheckoutPage(page);

    await loginPage.navigate();

    await loginPage.login(
        users.standardUser.username,
        users.standardUser.password,
    );

    const ItemList = [
        // "Sauce Labs Backpack",
        // "Sauce Labs Bolt T-Shirt",
        // "Test.allTheThings() T-Shirt (Red)",
    ];

    for (let items of ItemList) {
        await productPage.addItemToCart(items);
    }

    await productPage.goToCart();
});


test('Checkout Successfully', async({page})=>{
    await checkoutPage.chekOut1();
    await expect(page).toHaveURL(/checkout-step-one.html/);

    await checkoutPage.autoFillInfo();

    await expect(page).toHaveURL(/checkout-step-two.html/)

    await checkoutPage.chekOut();

    const CheckoutMessage = page.locator('[data-test="complete-header"]')
    await expect(CheckoutMessage).toBeVisible();
})

test.only('Checkout Empty Cart',async({page})=>{

    const cartItems =await cartPage.getCartItemNames();
    expect(cartItems.length).toBe(0);
    await checkoutPage.chekOut1();
    await expect(page).toHaveURL(/checkout-step-one.html/);

    await checkoutPage.autoFillInfo();

    await expect(page).toHaveURL(/checkout-step-two.html/);

    await checkoutPage.chekOut();

    const CheckoutMessage = page.locator('[data-test="complete-header"]');
    await expect(CheckoutMessage).toBeVisible();

})


