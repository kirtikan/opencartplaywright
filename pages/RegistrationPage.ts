import { th } from "@faker-js/faker";
import {Page, Locator} from "@playwright/test";
import { MyAccountPage } from "./MyAccountPage";

export class RegistrationPage{

    private readonly page: Page;
    private readonly txtFirstName: Locator;
    private readonly txtLastName: Locator;
    private readonly txtEmail: Locator;
    private readonly txtTelephone: Locator;
    private readonly txtPassword: Locator;
    private readonly txtConfirmPassword: Locator;
    private readonly chkdPolicy: Locator;
    private readonly btnContinue: Locator;
    private readonly msgConfirmation: Locator;
    private readonly continueToAccountBtn: Locator;

    constructor(page:Page){
        this.page = page;
        this.txtFirstName = this.page.getByRole('textbox', {name: 'First Name'});
        this.txtLastName = this.page.getByRole('textbox', {name: 'Last Name'});
        this.txtEmail = this.page.getByRole('textbox', {name: 'E-Mail'});
        this.txtTelephone = this.page.getByRole('textbox', {name: 'Telephone'});
        this.txtPassword = this.page.getByLabel('Password', {exact: true});
        this.txtConfirmPassword = this.page.getByRole('textbox', { name: 'Password Confirm' });
        this.chkdPolicy = this.page.locator("input[name='agree']");
        this.btnContinue = this.page.locator("input[type='submit']");
        this.msgConfirmation = this.page.locator("#content>h1");
        this.continueToAccountBtn = this.page.locator(".btn.btn-primary");
    }

    //Actions:
    async setFirstName(fname: string) : Promise<void> {
        await this.txtFirstName.fill(fname);
    }

    async setLastName(lname: string) : Promise<void> {
        await this.txtLastName.fill(lname);
    }

    async setEmail(email: string) : Promise<void> {
        await this.txtEmail.fill(email);
    }

    async setTelephone(tel: string) : Promise<void> {
        await this.txtTelephone.fill(tel);
    }

    async setPassword(pwd: string) : Promise<void> {
        await this.txtPassword.fill(pwd);
    }

    async setConfirmPassowrd(pwd: string) : Promise<void> {
        await this.txtConfirmPassword.fill(pwd);
    }

    async setPrivatePolicy(): Promise<void> {
        await this.chkdPolicy.check();
    }

     async completeRegistration(userData: {
        firstName: string,
        lastName: string,
        email: string,
        phone: string,
        password: string
    }): Promise<void>{
        await this.setFirstName(userData.firstName);
        await this.setLastName(userData.lastName);
        await this.setEmail(userData.email);
        await this.setTelephone(userData.email);
        await this.setPassword(userData.password);
        await this.setConfirmPassowrd(userData.password);   
        await this.setPrivatePolicy();
        await this.clickContinue();
    }

    async clickContinue(): Promise<void> {
        await this.btnContinue.click();
    }

    async clickContinueToAccount(): Promise<MyAccountPage>{
        await this.continueToAccountBtn.click();
        return new MyAccountPage(this.page);
    }

    async getConfirmationMsg(): Promise<string> {
        return await this.msgConfirmation.textContent() ?? '';
    }

}