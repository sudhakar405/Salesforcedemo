export class InventoryPage{

constructor(page){
 this.page = page
 this.backpack = page.locator('#add-to-cart-sauce-labs-backpack')
 this.backlight = page.locator('#add-to-cart-sauce-labs-bike-light')
 this.removebackpack = page.locator('#remove-sauce-labs-backpack')
 this.cart = page.locator('.shopping_cart_link')
 this.cartbadge = page.locator('.shopping_cart_badge')

}
  async addBackPack(){
   await this.backpack.waitFor({ state: 'visible' })
   await this.backpack.click()
}
    async addBikeLight(){
    await this.backlight.waitFor({ state: 'visible' })
    await this.backlight.click()
}
    async addremoveItem(){
   await this.removebackpack.click()
}
  async openCart(){
  await this.cart.click()
}

}