# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: checkout.spec.js >> Cart with Items Tests >> Checkout Successfully
- Location: tests/checkout.spec.js:58:9

# Error details

```
Test timeout of 30000ms exceeded while running "beforeEach" hook.
```

```
Error: locator.click: Test timeout of 30000ms exceeded.
Call log:
  - waiting for locator('//input[@value="Login"]')
    - locator resolved to <input type="submit" value="Login" id="login-button" name="login-button" data-test="login-button" class="submit-button btn_action"/>
  - attempting click action
    - waiting for element to be visible, enabled and stable

```

# Page snapshot

```yaml
- generic [ref=e3]:
  - generic [ref=e4]: Swag Labs
  - generic [ref=e5]:
    - generic [ref=e9]:
      - textbox "Username" [active] [ref=e11]: standard_user
      - textbox "Password" [ref=e13]
      - button "Login" [ref=e15] [cursor=pointer]
    - generic [ref=e17]:
      - generic [ref=e18]:
        - heading "Accepted usernames are:" [level=4] [ref=e19]
        - text: standard_user
        - text: locked_out_user
        - text: problem_user
        - text: performance_glitch_user
        - text: error_user
        - text: visual_user
      - generic [ref=e20]:
        - heading "Password for all users:" [level=4] [ref=e21]
        - text: secret_sauce
```

# Test source

```ts
  1  | import{expect} from '@playwright/test'
  2  | 
  3  | export class LoginPage {
  4  |   constructor(page) {
  5  |     this.page = page;
  6  | 
  7  |     this.emailInput = page.getByRole("textbox", { name: "Username" });
  8  |     this.passwordInput = page.getByRole("textbox", {
  9  |       name: "Password",
  10 |     });
  11 |     this.LoginButton = page.locator('//input[@value="Login"]');
  12 |     this.OpenMenuButton = page.getByRole("button", { name: "Open Menu" });
  13 |     this.LogOutButton = page.getByRole("link", { name: "Logout" });
  14 | 
  15 |   }
  16 | 
  17 |   async navigate() {
  18 |     await this.page.goto(process.env.BASE_URL);
  19 |   }
  20 | 
  21 |   async login(username, password) {
  22 |     await this.emailInput.fill(username);
  23 |     await this.passwordInput.fill(password);
> 24 |     await this.LoginButton.click();
     |                            ^ Error: locator.click: Test timeout of 30000ms exceeded.
  25 |   }
  26 | 
  27 |   async logout() {
  28 |     await this.OpenMenuButton.click();
  29 |     await this.LogOutButton.click();
  30 |   }
  31 | }
  32 | 
```