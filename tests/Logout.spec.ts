/*
test case: User Logout
tags: @master @regression
steps:
1) navigate to app url
2) go to login page from home page
3) login with valid credential
4) verify 'My account' page
5) click on logout link
6) click on continue
7) verify user is redirected to home page
*/

import {test,expect} from "@playwright/test";
import { HomePage } from "../pages/HomePage";
import { LoginPage } from "../pages/LoginPage";
import { MyAccountPage } from "../pages/MyAccountPage";
import { LogoutPage } from "../pages/LogoutPage";
import { TestConfig } from "../test.config";
import { ne } from "@faker-js/faker";
import { TimeOut } from "../utils/timeouts";

//declare shared variables
let config: TestConfig;
let homePage: HomePage;
let loginPage: LoginPage;
let myAccountPage: MyAccountPage;
let logoutPage: LogoutPage;

//setup before each test
test.beforeEach(async ({page})=>{
    config = new TestConfig();
    await page.goto(config.appUrl);

    //initalize page objects
    homePage = new HomePage(page);
    loginPage = new LoginPage(page);
    myAccountPage = new MyAccountPage(page);
    //logoutPage = new LogoutPage(page);
})

test.afterEach(async ({page})=>{
    await page.close();
})

test("user logout test",{tag: ['@master','@regression']},async ()=>{
    await homePage.clickMyAccount();
    await homePage.clickLogin();

    await loginPage.login(config.email,config.password);

    //verify successful login
    expect(await myAccountPage.isMyAccountPageExists()).toBeTruthy();
    
    //click logout which return logout page instance
    logoutPage = await myAccountPage.clickLogout();
    //await TimeOut.wait(myAccountPage);
    //verify continue btn
    expect(await logoutPage.isContinueBtnVisible()).toBeTruthy();

    homePage = await logoutPage.clickContinue();
    expect(await homePage.isHomePageExists()).toBeTruthy();

})