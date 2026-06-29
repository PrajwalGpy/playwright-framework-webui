import { test, expect } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";
import { users } from "../test-data/users";

let loginPage;
test.beforeEach(async({page})=>{
     loginPage = new LoginPage(page);
     await loginPage.navigate();
})

test("Valid Login", async ({ page }) => {

  await loginPage.login(
    users.standardUser.username,
    users.standardUser.password,
  );

  await expect(page).toHaveURL(/inventory.html/)
 
});


test("Invalid_password Login",async({page})=>{


    await loginPage.login(users.invalidUser.username,'password')
    const errorContainer = await page.locator("[data-test='error']");
    await expect(errorContainer).toBeVisible();
    await expect(errorContainer).toContainText(
      "Epic sadface: Username and password do not match any user in this service",
    );


    

});


test("locked_out_user Login", async ({ page }) => {



  await loginPage.login(users.lockedUser.username, users.lockedUser.password);

  const lockedOutMessage = page.getByText(
    "Epic sadface: Sorry, this user has been locked out.",
  );
  await expect(lockedOutMessage).toBeVisible();

});

test('Logout',async({page})=>{

     await loginPage.login(
       users.standardUser.username,
       users.standardUser.password,
     );

      await loginPage.logout();

      await expect(page).toHaveURL("https://www.saucedemo.com/");




})
