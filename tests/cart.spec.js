import { test, expect } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";
import { ProductPage } from "../pages/ProductPage";
import { users } from "../test-data/users";

let loginPage;
let productPage;

test.beforeEach(async ({ page }) => {
  loginPage = new LoginPage(page);
  productPage = new ProductPage(page);

  await loginPage.navigate();
  await loginPage.login(
    users.standardUser.username,
    users.standardUser.password,
  );
  await expect(page).toHaveURL(/inventory.html/);
});

test("Add Item", async ({ page }) => {
  productPage.addItemToCart("Sauce Labs Backpack");
  await page.waitForTimeout(3000)
    expect( await productPage.getCartBadgeCount()).toBe(1);
});

test.skip("Add Multiple Items", async ({ page }) => {
  await page.getByRole("button", { name: "Add to cart" }).nth(0).click();
  await page.getByRole("button", { name: "Add to cart" }).nth(1).click();
  await page.getByRole("button", { name: "Add to cart" }).nth(4).click();

  await page.locator('[data-test="shopping-cart-link"]').click();
  await expect(
    page.getByRole("link", { name: "Sauce Labs Backpack" }),
  ).toBeVisible();
});
