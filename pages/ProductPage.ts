import {Page,Locator, expect} from "@playwright/test";

export class ProductPage{
    private readonly page:Page;
    private readonly inputQuantity: Locator;
    private readonly addToCartBtn: Locator;
    private readonly confirmMsg: Locator;
    private readonly btnItems: Locator;
    private readonly viewCart: Locator;

    constructor(page:Page){
        this.page = page;
        this.addToCartBtn = this.page.locator("button#button-cart");
        this.inputQuantity = this.page.locator("input[name=quantity]");
        this.confirmMsg = this.page.locator(".alert.alert-success");
        this.btnItems = this.page.locator("#cart");
        this.viewCart = this.page.locator("strong:has-text(' View Cart')");
    }

    //set quantity
    async setQuantity(qty:string){
        await this.inputQuantity.fill('');
        await this.inputQuantity.fill(qty);
    }

    //add product to cart
    async addToCart(){
        await this.addToCartBtn.click();
    }
    
    //check confirmaion msg is visible
    async isConfirmationMsgVisible():Promise<boolean>{
        try{
            if(this.confirmMsg.textContent()!=null){
                return true;
            }
            else{
                return false;
            }
        }
        catch(error){
            console.log(`Confirmation msg not found: ${error}`);
            return false;
        }
    }

    async clickOnItems(){
        await this.btnItems.click();
    }

    async clickOnViewCart(){
        await this.viewCart.click();
    }

}