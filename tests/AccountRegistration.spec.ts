import {test,expect,Page} from "@playwright/test";
import { HomePage } from "../pages/HomePage";
import { RegistrationPage } from "../pages/RegistrationPage";
import { RandomDataUtil } from "../utils/randomDataGenerator";
import { TestConfig } from "../test.config";

//let page: Page;
let homePage: HomePage;
let registrationPage: RegistrationPage;
let config: TestConfig;

//test.beforeEach(async ({context})=>{
test.beforeEach(async ({page})=>{
    //page =await context.newPage();
    config = new TestConfig();
    await page.goto(config.appUrl); //navigate to app url
    homePage = new HomePage(page);
    registrationPage = new RegistrationPage(page);
})

test.afterEach(async ({page})=>{
    await page.waitForTimeout(4000);
    await page.close();
})

// test('user registration test @master @sanity @regression', async()=>{
test('user registration test',{ tag: ['@master', '@sanity', '@regression'] },async ({ page }) => {
    
    //click on myaccount & register
    await homePage.clickMyAccount();
    await homePage.clickRegister();

    //fill the registration form
    const userData = {firstName: RandomDataUtil.getFirstName(),
                      lastName: RandomDataUtil.getLastName(),
                      email: RandomDataUtil.getEmail(),
                      phone: RandomDataUtil.getPhoneNumber(),
                      password: RandomDataUtil.getPassword()  
                    }
    await registrationPage.completeRegistration(userData);
    //validate confirmation page
    const confirmMsg = await registrationPage.getConfirmationMsg();
    expect(confirmMsg).toContain('Your Account Has Been Created!');
})