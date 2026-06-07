import {Page,Locator} from "@playwright/test";
import { CheckoutPage } from "./CheckoutPage";

export class ShoppingCartPage{
    private readonly page:Page;
    private readonly cartPageTotal: Locator;
    private readonly btnCheckout: Locator;

    constructor(page:Page){
        this.page = page;
        this.cartPageTotal = this.page.locator("//table").last().locator("//tr").filter({hasText:'Total'}).locator("td").last();
        this.btnCheckout = this.page.locator("a.btn.btn-primary");
    }

    async getTotalPrice(): Promise<string>{
        try{
            return await this.cartPageTotal.innerText();
        }
        catch(error){
            console.log(`Unable to retrieve total price: ${error}`);
            throw error;
        }
    }

    async clickOnCheckout(): Promise<CheckoutPage>{
        this.btnCheckout.click();
        return new CheckoutPage(this.page);
    }

}