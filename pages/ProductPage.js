export class ProductPage {
  constructor(page) {
    this.page = page;
    this.inventoryContainer = page.locator('[data-test="inventory-container"]');
    // Using the clean CSS selector you found in DevTools
    this.sortDropdown = page.locator("select.product_sort_container");
  }

  /**
   * Sorts the products by selecting a dropdown option by its label text.
   * @param {string} sorter_type - The text label of the option (e.g., "Name (A to Z)")
   */
  async product_sorter(sorter_type) {
    // Playwright natively handles waiting for the dropdown to attach and become actionable
    await this.sortDropdown.selectOption({ label: sorter_type });
  }
}
