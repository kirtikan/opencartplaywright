import {Page, Locator} from "@playwright/test";

export class LoginPage{
    private readonly page: Page;
    private readonly loginEmail: Locator;
    private readonly loginPassword: Locator;
    private readonly loginBtn: Locator;
    private readonly warningMsg: Locator;

    constructor(page: Page){
        this.page = page;
        this.loginEmail = this.page.locator("#input-email");
        this.loginPassword = this.page.locator("#input-password");
        this.loginBtn = this.page.locator("input[type='submit']");
        this.warningMsg = this.page.locator(".alert.alert-danger");
    }

    async setEmail(email: string){
        await this.loginEmail.fill(email);
    }

    async setPassword(password: string){
        await this.loginPassword.fill(password);
    }

    async clickLogin(){
        await this.loginBtn.click();
    }

    async getLoginError(){
        return this.warningMsg.innerText();
    }

    async login(email: string, password: string){
        await this.setEmail(email);
        await this.setPassword(password);
        await this.clickLogin();
    }

}