export class ProductPage {
  constructor(page) {
    this.page = page;
    this.inventoryContainer = page.locator('[data-test="inventory-container"]');
    this.sortDropdown = page.locator("select.product_sort_container");
    this.itemNames = page.locator('[data-test="inventory-item-name"]');
    this.itemPrices = page.locator('[data-test="inventory-item-price"]');
    this.slectitem = page
      .getByRole("link", { name: "Sauce Labs Backpack" })
      .nth(1);
    this.cartBadge = page.locator('[data-test="shopping-cart-badge"]');
    this.cartLink = page.locator('[data-test="shopping-cart-link"]');
  }
  

  async product_sorter(sorter_type) {
    await this.sortDropdown.selectOption({ label: sorter_type });
  }

  async getItemNames() {
    return await this.itemNames.allTextContents();
  }

  async getItemPrices() {
    const priceString = await this.itemPrices.allTextContents();
    return priceString.map((price) => parseFloat(price.replace("$", "")));
  }

  async choiceItem() {
    await this.slectitem.click();
  }
  async addItemToCart(itemName) {
    const itemContainer = await this.page.locator(
      '[data-test="inventory-item"]',
      {
        hasText: itemName,
      },
    );
    await itemContainer.getByRole("button", { name: "Add to cart" }).click();
  }

  async getCartBadgeCount(){
    await this.page.waitForLoadState("load");
    if( !(await this.cartBadge.isVisible())) return 0;
    return parseInt(await this.cartBadge.innerText());

  }

  async goToCart(){
    await this.cartLink.click()
  }

}
