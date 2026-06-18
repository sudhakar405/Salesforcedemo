import {test as baseTest} from '@playwright/test';
import { CheckoutPage } from '../pages/CheckoutPage';
import { CartPage } from '../pages/CartPage';
import { InventoryPage } from '../pages/InventoryPage';
import { LoginPage } from '../pages/LoginPage';

type pages = {

    loginPage : LoginPage;
    checkoutPage : CheckoutPage;
    cartPage : CartPage;
    inventoryPage : InventoryPage;
}

export const test=baseTest.extend<pages>({

    loginPage : async ({page} , use) =>{
        await use(new LoginPage(page));
    },

    inventoryPage : async ({page} , use) =>{
        await use(new InventoryPage(page));
    },

    cartPage : async ({page} , use) =>{
        await use(new CartPage(page));
    },

    checkoutPage : async ({page} , use) =>{
        await use(new CheckoutPage(page));
    },
});