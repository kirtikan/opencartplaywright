import {test,expect} from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";
import { HomePage } from "../pages/HomePage";
import { MyAccountPage } from "../pages/MyAccountPage";
import { TestConfig } from "../test.config";
import { DataProvider } from "../utils/dataProvider";

//load Json data from logindata.json
const jsonPath = "testdata/logindata.json";
const jsonTestData = DataProvider.getTestDataFromJson(jsonPath);

for(const data of jsonTestData){
    test(`login with json data ${data.testName}`,{tag: '@datadriven'}, async ({page})=>{
        const config = new TestConfig();
        await page.goto(config.appUrl);

        const homePage = new HomePage(page);
        await homePage.clickMyAccount();
        await homePage.clickLogin();

        const loginPage = new LoginPage(page);
        await loginPage.login(data.email, data.password);

        if(data.expected.toLowerCase()==="success"){
            const myAccountPage = new MyAccountPage(page);
            const isLoggedIn = myAccountPage.isMyAccountPageExists();
            expect(isLoggedIn).toBeTruthy();
        }
        else{
            const errorMsg = await loginPage.getLoginError();
            expect(errorMsg).toBe(' Warning: No match for E-Mail Address and/or Password.');
        }
    })
}
