import { test } from '../fixture/pageFixture';
import {expect} from '@playwright/test';

test.beforeEach(async ({ loginPage }) => {
  await loginPage.goto();
});

test.afterEach(async ({ page }) => {
  await page.context().clearCookies();
});


test('TC01 Valid login', async ({ loginPage, page }) => {
  await loginPage.login('standard_user', 'secret_sauce');
  await expect(page).toHaveURL(/inventory/);
});


test('TC02 Another valid user login', async ({ loginPage, page }) => {
  await loginPage.login('problem_user', 'secret_sauce');
  await expect(page).toHaveURL(/inventory/);
});


test('TC03 Add item to cart', async ({ loginPage, inventoryPage }) => {
  await loginPage.login('standard_user', 'secret_sauce');
  await inventoryPage.addBackPack();
});


test('TC04 Add multiple items to cart', async ({ loginPage, inventoryPage }) => {
  await loginPage.login('standard_user', 'secret_sauce');
  await inventoryPage.addBackPack();
  await inventoryPage.addBackLight();
  await expect(inventoryPage.cartbadge).toHaveText('2');
});


test('TC05 Remove item', async ({ loginPage, inventoryPage }) => {
  await loginPage.login('standard_user', 'secret_sauce');
  await inventoryPage.addBackPack();
  await inventoryPage.addremoveItem();
});


test('TC06 Checkout with valid details', async ({ loginPage, inventoryPage, cartPage, checkoutPage }) => {
  await loginPage.login('standard_user', 'secret_sauce');
  await inventoryPage.addBackPack();
  await inventoryPage.openCart();
  await cartPage.checkout();
  await checkoutPage.fillCheckout('John', 'Doe', '411001');
});


test('TC07 Complete order', async ({ loginPage, inventoryPage, cartPage, checkoutPage }) => {
  await loginPage.login('standard_user', 'secret_sauce');
  await inventoryPage.addBackPack();
  await inventoryPage.openCart();
  await cartPage.checkout();
  await checkoutPage.fillCheckout('John', 'Doe', '411001');
  await checkoutPage.finish();
  await expect(checkoutPage.completeMsg).toContainText('Thank you');
});


test('TC08 Verify cart badge count', async ({ loginPage, inventoryPage }) => {
  await loginPage.login('standard_user', 'secret_sauce');
  await inventoryPage.addBackPack();
  await inventoryPage.addBackLight();
  // await expect(inventoryPage.cartBadge).toHaveText('2');
});


test('TC09 Continue shopping', async ({ loginPage, inventoryPage, cartPage, page }) => {
  await loginPage.login('standard_user', 'secret_sauce');
  await inventoryPage.addBackPack();
  await inventoryPage.openCart();
  await cartPage.continueShoppingClick();
  await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
});


test('TC10 Logout', async ({ loginPage, page }) => {
  await loginPage.login('standard_user', 'secret_sauce');
  await page.locator('#react-burger-menu-btn').click();
  await page.locator('#logout_sidebar_link').click();
  await expect(page).toHaveURL('https://www.saucedemo.com/');
});


test('TC11 Invalid username', async ({ loginPage }) => {
  await loginPage.login('wrong', 'secret_sauce');
  await expect(loginPage.error).toBeVisible();
});


test('TC12 Invalid password', async ({ loginPage }) => {
  await loginPage.login('standard_user', 'wrong');
  await expect(loginPage.error).toBeVisible();
});


test('TC13 Empty username', async ({ loginPage }) => {
  await loginPage.login('', 'secret_sauce');
  await expect(loginPage.error).toBeVisible();
});


test('TC14 Empty password', async ({ loginPage }) => {
  await loginPage.login('standard_user', '');
  await expect(loginPage.error).toBeVisible();
});


test('TC15 Checkout without first name', async ({ loginPage, inventoryPage, cartPage, checkoutPage }) => {
  await loginPage.login('standard_user', 'secret_sauce');
  await inventoryPage.addBackPack();
  await inventoryPage.openCart();
  await cartPage.checkout();
  await checkoutPage.fillCheckout('', 'Doe', '411001');
  await expect(checkoutPage.error).toBeVisible();
});


test('TC16 Checkout without last name', async ({ loginPage, inventoryPage, cartPage, checkoutPage }) => {
  await loginPage.login('standard_user', 'secret_sauce');
  await inventoryPage.addBackPack();
  await inventoryPage.openCart();
  await cartPage.checkout();
  await checkoutPage.fillCheckout('John', '', '411001');
  await expect(checkoutPage.error).toBeVisible();
});


test('TC17 Checkout without zip', async ({ loginPage, inventoryPage, cartPage, checkoutPage }) => {
  await loginPage.login('standard_user', 'secret_sauce');
  await inventoryPage.addBackPack();
  await inventoryPage.openCart();
  await cartPage.checkout();
  await checkoutPage.fillCheckout('John', 'Doe', '');
  await expect(checkoutPage.error).toBeVisible();
});


test('TC18 Add all products', async ({ loginPage, page }) => {
  await loginPage.login('standard_user', 'secret_sauce');
  const addButton = page.locator('button:has-text("Add to cart")');
  const count = await addButton.count();
  for (let i = 0; i < count; i++) {
    await addButton.nth(i).click();
  }
});


test('TC19 Remove all items', async ({ loginPage, page }) => {
  await loginPage.login('standard_user', 'secret_sauce');
  const addButton = page.locator('button:has-text("Add to cart")');
  const count = await addButton.count();
  for (let i = 0; i < count; i++) {
    await addButton.nth(i).click();
  }
  const removeButton = page.locator('button:has-text("Remove")');
  const removeCount = await removeButton.count();
  for (let i = 0; i < removeCount; i++) {
    await removeButton.nth(i).click();
  }
});


test('TC20 Checkout with long zip code', async ({ loginPage, inventoryPage, cartPage, checkoutPage }) => {
  await loginPage.login('standard_user', 'secret_sauce');
  await inventoryPage.addBackPack();
  await inventoryPage.openCart();
  await cartPage.checkout();
  await checkoutPage.fillCheckout('John', 'Doe', '9999999999');
});

