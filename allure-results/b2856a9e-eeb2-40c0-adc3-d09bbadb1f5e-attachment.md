# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: checkout.spec.js >> Cart with Items Tests >> Verify Error when First Name is Missing
- Location: tests/checkout.spec.js:72:9

# Error details

```
Error: browserType.launch: 
╔══════════════════════════════════════════════════════╗
║ Host system is missing dependencies to run browsers. ║
║ Please install them with the following command:      ║
║                                                      ║
║     sudo npx playwright install-deps                 ║
║                                                      ║
║ Alternatively, use apt:                              ║
║     sudo apt-get install libicu74\                   ║
║         libjpeg-turbo8\                              ║
║         gstreamer1.0-libav                           ║
║                                                      ║
║ <3 Playwright Team                                   ║
╚══════════════════════════════════════════════════════╝
```

```
TypeError: Cannot read properties of undefined (reading 'addItemToCart')
```

# Test source

```ts
  1   | import { test, expect } from "@playwright/test";
  2   | import { LoginPage } from "../pages/LoginPage";
  3   | import { ProductPage } from "../pages/ProductPage";
  4   | import { CartPage } from "../pages/CartPage";
  5   | import { CheckoutPage } from "../pages/CheckoutPage";
  6   | import { users } from "../test-data/users";
  7   | 
  8   | let loginPage, productPage, cartPage, checkoutPage;
  9   | 
  10  | test.beforeEach(async ({ page }) => {
  11  |     loginPage = new LoginPage(page);
  12  |     productPage = new ProductPage(page);
  13  |     cartPage = new CartPage(page);
  14  |     checkoutPage = new CheckoutPage(page);
  15  | 
  16  |     await loginPage.navigate();
  17  |     await page.waitForLoadState("networkidle");
  18  |     await loginPage.login(
  19  |         users.standardUser.username,
  20  |         users.standardUser.password,
  21  |     );
  22  | });
  23  | 
  24  | test.describe("Empty Cart Tests", () => {
  25  |     test("Checkout Empty Cart", async ({ page }) => {
  26  |         await productPage.goToCart();
  27  | 
  28  |         const cartItems = await cartPage.getCartItemNames();
  29  |         expect(cartItems.length).toBe(0);
  30  |         await checkoutPage.chekOut1();
  31  |         await expect(page).toHaveURL(/checkout-step-one.html/);
  32  | 
  33  |         await checkoutPage.autoFillInfo("prajwal", "poojary", "576001");
  34  | 
  35  |         await expect(page).toHaveURL(/checkout-step-two.html/);
  36  | 
  37  |         await checkoutPage.chekOut();
  38  | 
  39  |         const CheckoutMessage = page.locator('[data-test="complete-header"]');
  40  |         await expect(CheckoutMessage).toBeVisible();
  41  |     });
  42  | });
  43  | 
  44  | test.describe("Cart with Items Tests", () => {
  45  |     test.beforeEach(async () => {
  46  |         const ItemList = [
  47  |             "Sauce Labs Backpack",
  48  |             "Sauce Labs Bolt T-Shirt",
  49  |             "Test.allTheThings() T-Shirt (Red)",
  50  |         ];
  51  | 
  52  |         for (let items of ItemList) {
> 53  |             await productPage.addItemToCart(items);
      |                               ^ TypeError: Cannot read properties of undefined (reading 'addItemToCart')
  54  |         }
  55  | 
  56  |         await productPage.goToCart();
  57  |     });
  58  |     test("Checkout Successfully", async ({ page }) => {
  59  |         await checkoutPage.chekOut1();
  60  |         await expect(page).toHaveURL(/checkout-step-one.html/);
  61  | 
  62  |         await checkoutPage.autoFillInfo("prajwal", "poojary", "576001");
  63  | 
  64  |         await expect(page).toHaveURL(/checkout-step-two.html/);
  65  | 
  66  |         await checkoutPage.chekOut();
  67  | 
  68  |         const CheckoutMessage = page.locator('[data-test="complete-header"]');
  69  |         await expect(CheckoutMessage).toBeVisible();
  70  |     });
  71  | 
  72  |     test("Verify Error when First Name is Missing", async ({ page }) => {
  73  |         await checkoutPage.chekOut1();
  74  |         await checkoutPage.autoFillInfo("", "poojary", "576001");
  75  | 
  76  |         await expect(checkoutPage.errorMessage).toBeVisible();
  77  |         await expect(checkoutPage.errorMessage).toContainText(
  78  |             "Error: First Name is required",
  79  |         );
  80  |     });
  81  | 
  82  |     test("Verify Error when Postal Code is Missing", async ({ page }) => {
  83  |         await checkoutPage.chekOut1();
  84  |         await checkoutPage.autoFillInfo("Prajwal", "", "576001");
  85  | 
  86  |         await expect(checkoutPage.errorMessage).toBeVisible();
  87  |         await expect(checkoutPage.errorMessage).toContainText(
  88  |             "Error: Last Name is required",
  89  |         );
  90  |     });
  91  | 
  92  |     test("Verify Error when Last Name is Missing", async ({ page }) => {
  93  |         await checkoutPage.chekOut1();
  94  |         await checkoutPage.autoFillInfo("Prajwal", "poojary", "");
  95  | 
  96  |         await expect(checkoutPage.errorMessage).toBeVisible();
  97  |         await expect(checkoutPage.errorMessage).toContainText(
  98  |             "Error: Postal Code is required",
  99  |         );
  100 |     });
  101 | 
  102 |     test("Cancel Checkout should redirect back to Cart", async ({ page }) => {
  103 |         await checkoutPage.chekOut1();
  104 |         await checkoutPage.autoFillInfo("Prajwal", "poojary", "576001");
  105 | 
  106 |         await checkoutPage.clickCancel();
  107 |         await expect(page).toHaveURL(/inventory.html/);
  108 |     });
  109 | });
  110 | 
```