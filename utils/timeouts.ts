import {Page,Locator} from "@playwright/test";
import { HomePage } from "../pages/HomePage";
import { MyAccountPage } from "../pages/MyAccountPage";

export class TimeOut{
    static async wait(page:Page){
        await page.waitForTimeout(4000);
    }
}