import {Page, Locator} from "@playwright/test";

export class HomePage {
    private readonly page: Page;
    //locators
    private readonly linkMyAccount: Locator;
    private readonly linkRegister: Locator;
    private readonly linkLogin: Locator;
    private readonly searchBox: Locator;
    private readonly searchBtn: Locator;
    private readonly btnItemIcon: Locator;

    //constructor
    constructor(page: Page){
        this.page = page;
        this.linkMyAccount = this.page.locator("a[title='My Account']");
        this.linkRegister = this.page.getByRole('link', { name: 'Register' });
        this.linkLogin = this.page.getByRole('link', { name: 'Login' });
        this.searchBox = this.page.getByRole('textbox', { name: 'Search' });
        this.searchBtn = this.page.locator('span.input-group-btn');
        this.btnItemIcon = this.page.locator("span#cart-total");
    }

    //actions
    async isHomePageExists(){
        let title:string = await this.page.title();
        if(title){
            return true;
        }
        return false;
    }

    async clickMyAccount(){
        try{
            await this.linkMyAccount.click();
        }
        catch(error){
            console.log(`Exception occured while clicking 'My Account': ${error}`);
            throw error;
        }       
    }

    async clickRegister(){
        try{
            await this.linkRegister.click();
        }
        catch(error){
            console.log(`Exception occured while clicking 'Register': ${error}`);
            throw error;
        }       
    }

    async clickLogin(){
        try{
            await this.linkLogin.click();
        }
        catch(error){
            console.log(`Exception occured while clicking 'Login': ${error}`);
            throw error;
        }       
    }

    //Enter product nae in the searchbox:
    async enterProductName(pName: string){
        try{
            await this.searchBox.fill(pName);
        }
        catch(error){
            console.log(`Error occured while entering product name: ${error}`);
            throw error;
        }
    }

    //click search btn
    async clickSearch(){
        try{
            await this.searchBtn.click();
        }
        catch(error){
            console.log(`Error occured while clicking on search button: ${error}`);
            throw error;
        }
    }

    async getItemsIconText():Promise<string>{
        return await this.btnItemIcon.innerText();
    }
}