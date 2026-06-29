import { test, expect } from "@playwright/test";
import {users} from "../test-data/users";
import {LoginPage} from "../pages/LoginPage";
import {ProductPage} from "../pages/ProductPage";

let productPage;
let loginPage; 
test.beforeEach(async({page})=>{
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

test('Sort A-Z',async({page})=>{
    productPage.product_sorter("Name (A to Z)");
})
