/*
Test case: Login with valid credentials
steps:
1) Navigate to app url
2) navigate to login page via home page
3) enter valid credentials
4) verify successful login by clicking 'My Account' page presence
*/

import {test,expect, Page} from "@playwright/test";
import { HomePage } from "../pages/HomePage";
import { LoginPage } from "../pages/LoginPage";
import { MyAccountPage } from "../pages/MyAccountPage";
import { TestConfig } from "../test.config";

let config: TestConfig;
let homePage: HomePage;
let loginPage: LoginPage;
let myAccountPage: MyAccountPage;

//this hooks run before each test
test.beforeEach(async ({page})=>{

config = new TestConfig();
await page.goto(config.appUrl);

homePage = new HomePage(page);
loginPage = new LoginPage(page);
myAccountPage = new MyAccountPage(page);
})

test.afterEach(async ({page})=>{
await page.waitForTimeout(3000);
await page.close();
})

test("user login test",{tag: ['@master','@sanity','@regression']}, async ()=>{
//navigate to login page via home page
await homePage.clickMyAccount();
await homePage.clickLogin();

//enter valid credentials & logged in
await loginPage.login(config.email, config.password);

//verify successful login
const isLoggedIn = await myAccountPage.isMyAccountPageExists();
expect(isLoggedIn).toBeTruthy();
})