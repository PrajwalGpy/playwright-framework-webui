export class CheckoutPage {
  constructor(page) {
    this.page = page;
    this.CheckOutBuuton = page.getByRole("button", { name: "Checkout" });
    this.UserNameInput = page.getByPlaceholder("First Name");
    this.LastNameInput = page.getByPlaceholder("Last Name");
    this.ZipCodeInput = page.getByPlaceholder("Zip/Postal Code");
    this.ChekoutContinueButton = page.getByRole("button", { name: "Continue" });
    this.finshCheckOutButton = page.getByRole("button", { name: "Finish" });
    this.itemPrices = page.locator('[data-test="inventory-item-price"]');
    this.subTotal = page.locator('[data-test="subtotal-label"]');
    this.taxTotal = page.locator('[data-test="tax-label"]');
    this.toatalAmount = page.locator('[data-test="total-label"]');
    this.cancelButton = page.locator('[data-test="cancel"]');
    this.errorMessage = page.locator('[data-test="error"]');
  }

  async chekOut1(){
    await this.CheckOutBuuton.click();
  }

  async autoFillInfo(firstname,lastname,zipcode) {
    
    if (firstname) await this.UserNameInput.fill(firstname);
    if (lastname) await this.LastNameInput.fill(lastname);
    if (zipcode) await this.ZipCodeInput.fill(zipcode);
    await this.ChekoutContinueButton.click();
  }

  async chekOut() {
    await this.finshCheckOutButton.click();
  }

  async clickCancel(){
    await this.cancelButton.click();
  }

  async getItemPrices() {
    const priceStrings = await this.itemPrices.allTextContents();
    return await priceStrings.map((price) =>
      parseFloat(price.replace("$", "")),
    );
  }

  async getNumericLabelValue(locator) {
    const test = await locator.innerText();
    const match = test.replace(/\d+\.\d/);
    return match ? parseFloat(match[0]) : [0];
  }

  async getSubtotal() {
    return await this.getNumericLabelValue(this.subTotal);
  }

  async getTax() {
    return await this.getNumericLabelValue(this.taxTotal);
  }

  async getTotal() {
    return await this.getNumericLabelValue(this.toatalAmount);
  }
}