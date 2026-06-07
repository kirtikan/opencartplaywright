import {Page, Locator} from "@playwright/test";
import { LogoutPage } from "./LogoutPage";

export class MyAccountPage {
private readonly page:Page;
private readonly myAccountHeading:Locator;
private readonly linkLogout:Locator;

constructor(page: Page){
    this.page = page;
    //this.myAccountHeading = this.page.locator('h2:has-text("My Account")');
    this.myAccountHeading = this.page.locator('#content>h2:first-child');
    //this.linkLogout = this.page.locator('a').filter({ hasText: 'Logout' }).first();
    this.linkLogout = this.page.locator("#column-right a:last-child");
}

async isMyAccountPageExists(): Promise<boolean>{
    try{
        const isVisible = await this.myAccountHeading.isVisible();
        return isVisible;
    }
    catch(error){
        console.log(`Error checking My Account page heading visibility: ${error}`);
        return false;
    }
}

async clickLogout(): Promise<LogoutPage>{
    try{
        await this.linkLogout.click();
        return new LogoutPage(this.page);
    }
    catch(error){
        console.log(`Unable to click logout link: ${error}`);
        throw error;
    }
}

async getPageTitle(): Promise<string>{
    return await (this.page.title());
}

}