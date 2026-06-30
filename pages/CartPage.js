export class CartPage{
    constructor(page){
        this.page = page
        this.cartItem = page.locator('[data-test="inventory-item-name"]');

    }

    async getCartItemNames(){
        return await this.cartItem.allTextContents();
    }
}