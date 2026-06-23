import {test, expect} from '@playwright/test'
import { LoginPage } from '../pages/LoginPage'
import {InventoryPage} from '../pages/InventoryPage'
import {CartPage} from '../pages/CartPage'
import {CheckoutPage} from '../pages/CheckoutPage'


test('TC01 Valid login', async({page})=>{
const login=new LoginPage(page)
await login.goto()
await login.login('standard_user','secret_sauce')
await expect(page).toHaveURL(/inventory/)
})

test('TC02 Another valid user login', async({page})=>{
const login=new LoginPage(page)
await login.goto()
await login.login('problem_user','secret_sauce')
await expect(page).toHaveURL(/inventory/)
})

test('TC03 Add item to cart', async({page})=>{
const login=new LoginPage(page)
await login.goto()
const inventory=new InventoryPage(page)
await login.login('standard_user','secret_sauce')
await inventory.addBackPack()
})


test('TC04 Add multiple item to cart', async({page})=>{
const login=new LoginPage(page)
await login.goto()
const inventory=new InventoryPage(page)
await login.login('standard_user','secret_sauce')
await inventory.addBackPack()
await inventory.addBikeLight()

await expect(inventory.cartbadge).toHaveText('2')
})

test('TC05 Remove item', async({page})=>{
const login=new LoginPage(page)
await login.goto()
const inventory=new InventoryPage(page)
await login.login('standard_user','secret_sauce')
await inventory.addBackPack()
await inventory.addremoveItem()
})


test('TC06 Checkout with valid detalis', async({page})=>{
const login=new LoginPage(page)
await login.goto()
const inventory=new InventoryPage(page)
const cart=new CartPage(page)
const checkout=new CheckoutPage(page)

await login.login('standard_user','secret_sauce')
await inventory.addBackPack()
await inventory.openCart()
await cart.checkout()

await checkout.fillCheckout('john','Doe','411001')
})

test('TC07 Complete order', async({page})=>{
const login=new LoginPage(page)
await login.goto()
const inventory=new InventoryPage(page)
const cart=new CartPage(page)
const checkout=new CheckoutPage(page)

await login.login('standard_user','secret_sauce')
await inventory.addBackPack()
await inventory.openCart()
await cart.checkout()

await checkout.fillCheckout('john','Doe','411001')
await checkout.finish()
await expect(checkout.completeMsg).toContainText('Thank you')
})

test('TC08 Verify cart badge count', async({page})=>{
const login=new LoginPage(page)
await login.goto()
const inventory=new InventoryPage(page)

await login.login('standard_user','secret_sauce')
await inventory.addBackPack()
await inventory.addBikeLight()

//await expect(inventory.cartBadge).toHaveText('2')
})

test('TC09 Continue shopping', async({page})=>{
const login=new LoginPage(page)
await login.goto()
const inventory=new InventoryPage(page)
const cart=new CartPage(page)

await login.login('standard_user','secret_sauce')
await inventory.addBackPack()
await inventory.openCart()
await cart.continueShoppingClick()

await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html')
})

test('TC10 Logout', async({page})=>{
const login=new LoginPage(page)
await login.goto()

await login.login('standard_user','secret_sauce')
await page.locator('#react-burger-menu-btn').click()
await page.locator('#logout_sidebar_link').click()

await expect(page).toHaveURL('https://www.saucedemo.com/')
})

test('TC11 Invalid username', async({page})=>{
const login=new LoginPage(page)
await login.goto()
await login.login('wrong','secret_sauce')
await expect(login.error).toBeVisible()
})


test('TC12 Invalid password', async({page})=>{
const login=new LoginPage(page)
await login.goto()
await login.login('standard_user','wrong')
await expect(login.error).toBeVisible()
})


test('TC13 Empty username', async({page})=>{
const login=new LoginPage(page)
await login.goto()
await login.login('','secret_sauce')
await expect(login.error).toBeVisible()
})


test('TC14 Empty password', async({page})=>{
const login=new LoginPage(page)
await login.goto()
await login.login('standard_user','')
await expect(login.error).toBeVisible()
})


test('TC15 Checkout without first name', async({page})=>{
const login=new LoginPage(page)
const inventory=new InventoryPage(page)
const cart=new CartPage(page)
const checkout=new CheckoutPage(page)
await login.goto()
await login.login('Standard_user','secret_sauce')
await inventory.addBackPack()
await inventory.openCart()
await cart.checkout()
await checkout.fillCheckout('','Doe','411001')
await expect(checkout.error).toBeVisible()
})


test('TC16 Checkout without last name', async({page})=>{
const login=new LoginPage(page)
const inventory=new InventoryPage(page)
const cart=new CartPage(page)
const checkout=new CheckoutPage(page)
await login.goto()
await login.login('Standard_user','secret_sauce')
await inventory.addBackPack()
await inventory.openCart()
await cart.checkout()
await checkout.fillCheckout('Jhon','','411001')
await expect(checkout.error).toBeVisible()
})


test('TC17 Checkout without zip', async({page})=>{
const login=new LoginPage(page)
const inventory=new InventoryPage(page)
const cart=new CartPage(page)
const checkout=new CheckoutPage(page)
await login.goto()
await login.login('Standard_user','secret_sauce')
await inventory.addBackPack()
await inventory.openCart()
await cart.checkout()
await checkout.fillCheckout('Jhon','Doe','')
await expect(checkout.error).toBeVisible()
})

test('TC18 Add all product', async({page})=>{
const login=new LoginPage(page)
await login.goto()
await login.login('standard_user','secret_sauce')

const addButton=page.locator('button:has-text("Add to cart")')

const count= await addButton.count()

for(let i=0;i<count;i++){
await addButton.nth(i).click()
}

})

test('TC19 Remove all items', async({page})=>{
const login=new LoginPage(page)
await login.goto()
await login.login('standard_user','secret_sauce')

const addButton=page.locator('button:has-text("Add to cart")')

const count= await addButton.count()

for(let i=0;i<count;i++){
await addButton.nth(i).click()
}

const removeButton=page.locator('button:has-text("Remove")')

const removeCount= await removeButton.count()

for(let i=0;i<removeCount;i++){
await removeButton.nth(i).click()
}

})


test('TC20 Checkout with long zip code', async({page})=>{
const login=new LoginPage(page)
await login.goto()
const inventory=new InventoryPage(page)
const cart=new CartPage(page)
const checkout=new CheckoutPage(page)
await login.login('Standard_user','secret_sauce')
await inventory.addBackPack()
await inventory.openCart()
await cart.checkout()
await checkout.fillCheckout('Jhon','Doe','9999999999')
})


