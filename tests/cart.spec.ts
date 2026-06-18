import {test} from '../fixture/pageFixture';

test('add cart', async ({loginPage,inventoryPage,cartPage})=>{
    await loginPage.goto();
    await loginPage.login('standard_user','secret_sauce');

    await inventoryPage.addBackPack();
    await inventoryPage.addBackLight();
    await inventoryPage.openCart();

    await cartPage.checkout();
    await cartPage.continueShoppingClick();
})