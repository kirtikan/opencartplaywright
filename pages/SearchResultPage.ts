import {Page,Locator} from "@playwright/test";
import { ProductPage } from "./ProductPage";
import { error } from "node:console";

export class SearchResultPage{
    private readonly page:Page;
    private readonly searchPageHeader: Locator;
    private readonly searchProducts: Locator;

    constructor(page:Page){
        this.page = page;
        this.searchPageHeader = page.locator("#content h1");
        this.searchProducts = page.locator("h4>a");
    }

    async isSearchPageResultExist(){
        try{
            const headerText = await this.searchPageHeader.textContent();
            return headerText?.includes('Search -') ?? false;
        }
        catch(error){
            return false;
        }
    }

    async isProductExist(productName:string): Promise<boolean>{
        try{
            const count = await this.searchProducts.count();
            for(let i=0; i<count; i++){
                const product = this.searchProducts.nth(i);
                const title = await product.innerText();
                if(title === productName){
                    return true;
                }
            }
        }
        catch(error){
            console.log(`Error checking product existence: ${error}`)
        }   
        return false;
    }

    async selectProduct(productName:string): Promise<ProductPage>{
        try
        {
            const count = await this.searchProducts.count();
            for(let i=0; i<count; i++){
                const product = this.searchProducts.nth(i);
                const title = await product.innerText();
                if(title===productName)
                    await product.click();
                    return new ProductPage(this.page);
                }
            throw new Error(`Product not found: ${productName}`);
        }
        catch(error){
            throw new Error(`Error selecting product: ${error}`);
        }
    }

    async getProductCount(): Promise<number>{
        return await this.searchProducts.count();
    }

}