export class LoginPage{

constructor(page){
this.page = page
this.usernameInput = page.locator('#user-name')
this.passwordInput = page.locator('#password')
this.loginBtn = page.locator('#login-button')
this.error = page.locator('[data-test="error"]')

}

async goto(){
   await this.page.goto('https://www.saucedemo.com/')
}
async login(username,password){
await this.usernameInput.fill(username)
await this.passwordInput.fill(password)
await this.loginBtn.click()
}
}