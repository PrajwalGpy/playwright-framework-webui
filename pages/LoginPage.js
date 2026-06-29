import{expect} from '@playwright/test'

export class LoginPage {
  constructor(page) {
    this.page = page;

    this.emailInput = page.getByRole("textbox", { name: "Username" });
    this.passwordInput = page.getByRole("textbox", {
      name: "Password",
    });
    this.LoginButton = page.locator('//input[@value="Login"]');
    this.OpenMenuButton = page.getByRole("button", { name: "Open Menu" });
    this.LogOutButton = page.getByRole("link", { name: "Logout" });

  }

  async navigate() {
    await this.page.goto(process.env.BASE_URL);
  }

  async login(username, password) {
    await this.emailInput.fill(username);
    await this.passwordInput.fill(password);
    await this.LoginButton.click();
  }

  async logout() {
    await this.OpenMenuButton.click();
    await this.LogOutButton.click();
    await expect(this.page).toHaveURL("https://www.saucedemo.com/");
  }
}
