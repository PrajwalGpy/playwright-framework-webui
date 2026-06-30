import { test, expect } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";
import { ProductPage } from "../pages/ProductPage";
import { CartPage } from "../pages/CartPage";
import { CheckoutPage } from "../pages/CheckoutPage";
import { users } from "../test-data/users";

let loginPage, productPage, cartPage, checkoutPage;

test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    productPage = new ProductPage(page);
    cartPage = new CartPage(page);
    checkoutPage = new CheckoutPage(page);

    await loginPage.navigate();
    await page.waitForLoadState("networkidle");
    await loginPage.login(
        users.standardUser.username,
        users.standardUser.password,
    );
});

test.describe("Empty Cart Tests", () => {
    test("Checkout Empty Cart", async ({ page }) => {
        await productPage.goToCart();

        const cartItems = await cartPage.getCartItemNames();
        expect(cartItems.length).toBe(0);
        await checkoutPage.chekOut1();
        await expect(page).toHaveURL(/checkout-step-one.html/);

        await checkoutPage.autoFillInfo("prajwal", "poojary", "576001");

        await expect(page).toHaveURL(/checkout-step-two.html/);

        await checkoutPage.chekOut();

        const CheckoutMessage = page.locator('[data-test="complete-header"]');
        await expect(CheckoutMessage).toBeVisible();
    });
});

test.describe("Cart with Items Tests", () => {
    test.beforeEach(async () => {
        const ItemList = [
            "Sauce Labs Backpack",
            "Sauce Labs Bolt T-Shirt",
            "Test.allTheThings() T-Shirt (Red)",
        ];

        for (let items of ItemList) {
            await productPage.addItemToCart(items);
        }

        await productPage.goToCart();
    });
    test("Checkout Successfully", async ({ page }) => {
        await checkoutPage.chekOut1();
        await expect(page).toHaveURL(/checkout-step-one.html/);

        await checkoutPage.autoFillInfo("prajwal", "poojary", "576001");

        await expect(page).toHaveURL(/checkout-step-two.html/);

        await checkoutPage.chekOut();

        const CheckoutMessage = page.locator('[data-test="complete-header"]');
        await expect(CheckoutMessage).toBeVisible();
    });

    test("Verify Error when First Name is Missing", async ({ page }) => {
        await checkoutPage.chekOut1();
        await checkoutPage.autoFillInfo("", "poojary", "576001");

        await expect(checkoutPage.errorMessage).toBeVisible();
        await expect(checkoutPage.errorMessage).toContainText(
            "Error: First Name is required",
        );
    });

    test("Verify Error when Postal Code is Missing", async ({ page }) => {
        await checkoutPage.chekOut1();
        await checkoutPage.autoFillInfo("Prajwal", "", "576001");

        await expect(checkoutPage.errorMessage).toBeVisible();
        await expect(checkoutPage.errorMessage).toContainText(
            "Error: Last Name is required",
        );
    });

    test("Verify Error when Last Name is Missing", async ({ page }) => {
        await checkoutPage.chekOut1();
        await checkoutPage.autoFillInfo("Prajwal", "poojary", "");

        await expect(checkoutPage.errorMessage).toBeVisible();
        await expect(checkoutPage.errorMessage).toContainText(
            "Error: Postal Code is required",
        );
    });

    test("Cancel Checkout should redirect back to Cart", async ({ page }) => {
        await checkoutPage.chekOut1();
        await checkoutPage.autoFillInfo("Prajwal", "poojary", "576001");

        await checkoutPage.clickCancel();
        await expect(page).toHaveURL(/inventory.html/);
    });
});
