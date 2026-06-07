import {Page,Locator} from "@playwright/test";

export class CheckoutPage{
    private readonly page:Page;
    private readonly checkoutHeading: Locator;

    constructor(page:Page){
        this.page = page;
        this.checkoutHeading = this.page.locator("#content>h1"); 
    }

    async isCheckoutExist(): Promise<boolean>{
        return await this.checkoutHeading.isVisible();
    }
}