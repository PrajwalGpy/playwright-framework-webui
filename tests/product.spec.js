import { test, expect } from "@playwright/test";
import { users } from "../test-data/users";
import { LoginPage } from "../pages/LoginPage";
import { ProductPage } from "../pages/ProductPage";

let productPage;
let loginPage;
test.beforeEach(async ({ page }) => {
    productPage = new ProductPage(page);
    loginPage = new LoginPage(page);
    await loginPage.navigate();
    await loginPage.login(
        users.standardUser.username,
        users.standardUser.password,
    );
})

test("Verify Products Load", async ({ page }) => {

    const productsLocator = productPage.inventoryContainer;
    await expect(productsLocator).toBeVisible();

});

test("Verify Products Sort: A to Z", async ({ page }) => {

  await productPage.product_sorter("Name (A to Z)");

  const actualNames =await productPage.getItemNames();

  const expectedNames = await [...actualNames].sort();

  
  expect(actualNames).toEqual(expectedNames);
});


test("Verify Products Sort: Z to A",async({page})=>{

    await productPage.product_sorter("Name (Z to A)");

    const actualNames = await productPage.getItemNames()

    const expectedNames = [...actualNames].sort().reverse()

    await expect(actualNames).toEqual(expectedNames)
});


test("Verify Products Sort: Price Low to High",async({page})=>{
    await productPage.product_sorter("Price (low to high)");

    const actualPrices = await productPage.getItemPrices();

    const expectedPrices =  [...actualPrices].sort((a,b)=>a-b);

    await expect(actualPrices).toEqual(expectedPrices);
});

test("Verify Products Sort: Price High to Low", async ({ page }) => {
  await productPage.product_sorter("Price (high to low)");

  const actualPrices = await productPage.getItemPrices();

  const expectedPrices = [...actualPrices].sort((a, b) => b - a);

   expect(actualPrices).toEqual(expectedPrices);
});