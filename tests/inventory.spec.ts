import {test} from '../fixture/pageFixture';


test('Add inventory' , async ({ loginPage, inventoryPage})=>{
       await loginPage.goto();
       await loginPage.login('standard_user','secret_sauce');

       await inventoryPage.addBackPack();
       await inventoryPage.addBackLight();
       await inventoryPage.addremoveItem();
       await inventoryPage.openCart();

})