export class CartPage{

   constructor(page){
    this.page =page
    this.checkoutbtn = page.locator('#checkout')
    this.continueshopping = page.locator('#continue-shopping')
}

  async checkout(){
  await this.checkoutbtn.waitFor({ state: 'visible' })
  await this.checkoutbtn.click()
}

async continueShoppingClick(){
  await this.continueshopping.waitFor({ state: 'visible' })
  await this.continueshopping.click()
}
}