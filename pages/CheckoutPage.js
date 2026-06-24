export class CheckoutPage{

 constructor(page){
  this.page = page
  this.firstName =page.locator('#first-name')
  this.lastName =page.locator('#last-name')
  this.zip =page.locator('#postal-code')
  this.continueBtn =page.locator('#continue')
  this.finishBtn =page.locator('#finish')
  this.completeMsg =page.locator('.complete-header')
  this.error =page.locator('[data-test="error"]')
}

   async fillCheckout(fname,lname,zipcode){
    await this.firstName.waitFor({ state: 'visible' })
    await this.firstName.fill(fname)
    await this.lastName.fill(lname)
    await this.zip.fill(zipcode)
    await this.continueBtn.waitFor({ state: 'visible' })
    await this.continueBtn.click()
}

   async finish(){
     await this.finishBtn.waitFor({ state: 'visible' })
     await this.finishBtn.click()
}
}