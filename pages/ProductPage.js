export class ProductPage {
  constructor(page) {
    this.page = page;
    this.inventoryContainer = page.locator('[data-test="inventory-container"]');
    // Using the clean CSS selector you found in DevTools
    this.sortDropdown = page.locator("select.product_sort_container");
    this.itemNames = page.locator('[data-test="inventory-item-name"]');
    this.itemPrices = page.locator('[data-test="inventory-item-price"]')
  }

  async product_sorter(sorter_type) {

    await this.sortDropdown.selectOption({ label: sorter_type });
  }

  async getItemNames() {
    
    return await this.itemNames.allTextContents();
  }

  async getItemPrices(){
    return await this.itemPrices
      .allTextContents()
      .map((price) => parseFloat(price.replace('$', "")));
  }
}
