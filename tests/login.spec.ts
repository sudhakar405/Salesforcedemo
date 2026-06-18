import { expect} from '@playwright/test';
import {test} from '../fixture/pageFixture';


test('succesfull login', async ({page, loginPage})=>{
   
   await loginPage.goto();
   await loginPage.login('standard_user','secret_sauce');
   await expect(page).toHaveURL(/inventory/)
})