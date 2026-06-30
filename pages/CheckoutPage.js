export class CheckoutPage {
  constructor(page) {
    this.page = page;
    this.itemPrices = page.locator('[data-test="inventory-item-price"]');
    this.subTotal = page.locator('[data-test="subtotal-label"]');
    this.taxTotal = page.locator('[data-test="tax-label"]');
    this.toatalAmount = page.locator('[data-test="total-label"]');
  }

  async getItemPrices() {
    const priceStrings = await itemPrices.allTextContents();
    return await priceStrings.map((price) =>
      parseFloat(price.replace("$", "")),
    );
  }

  async getNumericLabelValue(locator){
    const test = await locator.innerText();
    const match = test.replace(/\d+\.\d/)
    return match ?  parseFloat(match[0]) : [0]
  }

  async getSubtotal(){
    return await this.getNumericLabelValue(this.subTotal)
  }

  async getTax(){
    return await this.getNumericLabelValue(this.taxTotal);
  }

  async getTotal(){
    return await this.getNumericLabelValue(this.toatalAmount);
  }
}