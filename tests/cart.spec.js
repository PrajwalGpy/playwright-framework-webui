import { test, expect } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";
import { ProductPage } from "../pages/ProductPage";
import { CartPage } from "../pages/CartPage";
import { CheckoutPage } from "../pages/CheckoutPage";
import { users } from "../test-data/users";

let loginPage, productPage, cartPage;

test.beforeEach(async ({ page }) => {
  loginPage = new LoginPage(page);
  productPage = new ProductPage(page);
  cartPage = new CartPage(page);

  await loginPage.navigate();
  await page.waitForLoadState("networkidle");
  await loginPage.login(
    users.standardUser.username,
    users.standardUser.password,
  );
  await expect(page).toHaveURL(/inventory.html/);
});

test("Add Item", async ({ page }) => {
  await productPage.addItemToCart("Sauce Labs Backpack");
  expect(await productPage.getCartBadgeCount()).toBe(1);
});

test("Add Multiple Items", async ({ page }) => {
  const ItemList = [
    "Sauce Labs Backpack",
    "Sauce Labs Bolt T-Shirt",
    "Test.allTheThings() T-Shirt (Red)",
  ];

  for (let items of ItemList) {
    await productPage.addItemToCart(items);
  }

  await expect(ItemList.length).toEqual(await productPage.getCartBadgeCount());

  await productPage.goToCart();

  expect(await cartPage.getCartItemNames()).toEqual(ItemList);
});

test("Remove Item", async ({ page }) => {
  await productPage.addItemToCart("Sauce Labs Backpack");

  expect(await productPage.getCartBadgeCount()).toBe(1);
  await productPage.goToCart();
  await cartPage.removeItems("Sauce Labs Backpack");
  expect(await productPage.getCartBadgeCount()).toBe(0);
});

test("Verify Quantity", async ({ page }) => {
  const ItemList = [
    "Sauce Labs Backpack",
    "Sauce Labs Bolt T-Shirt",
    "Test.allTheThings() T-Shirt (Red)",
  ];

  for (let items of ItemList) {
    await productPage.addItemToCart(items);
  }

  await expect(ItemList.length).toEqual(await productPage.getCartBadgeCount());
});

test("Verify Prices and Total Sum in Cart Module", async ({ page }) => {
  const ItemList = [
    "Sauce Labs Backpack",
    "Sauce Labs Bolt T-Shirt",
    "Test.allTheThings() T-Shirt (Red)",
  ];

  for (let items of ItemList) {
    await productPage.addItemToCart(items);
  }

  await productPage.goToCart();
  const actualPrices = await productPage.getItemPrices();

  expect(actualPrices).toEqual([29.99, 15.99, 15.99]);

  const calculatedTotal = actualPrices.reduce((previousValue, currentValue) => {
    return previousValue + currentValue;
  }, 0);

  expect(calculatedTotal).toEqual(61.97);
});
