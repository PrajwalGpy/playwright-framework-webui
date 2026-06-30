import { expect } from "playwright/test";

export class CartPage{
    constructor(page){
        this.page = page
        this.cartItem = page.locator('[data-test="inventory-item-name"]');

    }

    async getCartItemNames(){
        return await this.cartItem.allTextContents();
    }

    async removeItems(item){
        const itemName = await this.page.locator(
          '[data-test="inventory-item"]',
          { hasText: item },
        );
        await itemName.getByRole("button", { name: "Remove" }).click();

    }
}