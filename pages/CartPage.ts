import {Page , Locator} from '@playwright/test';

export class CartPage{

    readonly page : Page;
    readonly checkoutbtn : Locator;
    readonly continueshopping : Locator;

    constructor(page:Page){

        this.page = page;
        this.checkoutbtn = page.locator('#checkout');
        this.continueshopping = page.locator('#continue-shopping');
    }

    async checkout(){
        await this.checkoutbtn.click();
    }

    async continueShoppingClick(){
        await this.continueshopping.click();
    }
}