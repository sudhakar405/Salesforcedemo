import {Page, Locator} from '@playwright/test';

export class InventoryPage{

    readonly page : Page;
    readonly backpack : Locator;
    readonly backlight : Locator;
    readonly removebackpack : Locator;
    readonly cart : Locator;
    readonly cartbadge : Locator;


    constructor(page:Page){

        this.page = page;
        this.backpack = page.locator("//button[@id='add-to-cart-sauce-labs-backpack']");
        this.backlight = page.locator("//button[@id='add-to-cart-sauce-labs-bike-light']");
        this.removebackpack = page.locator('#remove-sauce-labs-backpack');
        this.cart = page.locator('.shopping_cart_link');
        this.cartbadge = page.locator('.shopping_cart_badge');

    }


    async addBackPack(){
        await this.backpack.click();
    }

    async addBackLight(){
        await this.backlight.click();
    }

    async addremoveItem(){
        await this.removebackpack.click();
    }

    async openCart(){
        await this.cart.click();
    }
}