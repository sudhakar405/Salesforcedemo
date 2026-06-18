import {test} from '../fixture/pageFixture';

test('finish the order', async ({loginPage,inventoryPage,cartPage,checkoutPage})=>{
    await loginPage.goto();
    await loginPage.login('standard_user','secret_sauce');

    await inventoryPage.addBackPack();
    await inventoryPage.addBackLight();
    await inventoryPage.openCart();

    await cartPage.checkout();
    await cartPage.continueShoppingClick();

    await checkoutPage.fillCheckout('john','Doe','411001');
    await checkoutPage.finish();
})