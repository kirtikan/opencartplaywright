/*
Test Case - End 2 End flow
Tag: endtoend

steps:
- navigate to url, click on register
- fill registration & assert account creation
- logout & assert logout
- click login & assert logged in
- enter product & click search, assert searched product
- select the product, set quantity & add to cart, assert successful msg
- click on items, view cart & assert the total with items total
- click on checkout & then assert
*/

import {test,expect, Page} from "@playwright/test";
import { HomePage } from "../pages/HomePage";
import { RegistrationPage } from "../pages/RegistrationPage";
import { LoginPage } from "../pages/LoginPage";
import { LogoutPage } from "../pages/LogoutPage";
import { MyAccountPage } from "../pages/MyAccountPage";
import { SearchResultPage } from "../pages/SearchResultPage";
import { ProductPage } from "../pages/ProductPage";
import { ShoppingCartPage } from "../pages/ShoppingCartPage";
import { TestConfig } from "../test.config";
import { RandomDataUtil } from "../utils/randomDataGenerator";
import { CheckoutPage } from "../pages/CheckoutPage";

let config: TestConfig;
let homePage: HomePage;
let registrationPage: RegistrationPage;
let logoutPage: LogoutPage;
let myAccountPage: MyAccountPage;
let loginPage: LoginPage;
let searchResultPage: SearchResultPage;
let productPage: ProductPage;
let shoppingCartPage: ShoppingCartPage;
let checkoutPage: CheckoutPage;

test("End To End Test", {tag: '@endtoend'}, async({page})=>{
    config = new TestConfig();

    //navigate to url
    await page.goto(config.appUrl);
    const productName = config.productName;

    homePage = new HomePage(page);
    await homePage.clickMyAccount();
    await homePage.clickRegister();

    //fill registration
    registrationPage = new RegistrationPage(page);
    const emailInput = RandomDataUtil.getEmail();
    const pwdInput = RandomDataUtil.getPassword();
    const regData = {
        firstName: RandomDataUtil.getFirstName(),
        lastName: RandomDataUtil.getLastName(),
        email: emailInput,
        phone: RandomDataUtil.getPhoneNumber(),
        password: pwdInput
    }
    //complete registration
    await registrationPage.completeRegistration(regData);
    expect(await registrationPage.getConfirmationMsg()).toContain("Your Account Has Been Created!");
    
    //landing to MyAccount page
    myAccountPage = await registrationPage.clickContinueToAccount();
    expect(await myAccountPage.isMyAccountPageExists()).toBeTruthy();

    //logging out from MyAccount page
    logoutPage = await myAccountPage.clickLogout();
    expect(await logoutPage.isContinueBtnVisible()).toBeTruthy();
    await logoutPage.clickContinue();

    //login with registered account
    await homePage.clickMyAccount();
    await homePage.clickLogin();
    loginPage = new LoginPage(page);
    await loginPage.login(emailInput,pwdInput);

    //search the product
    await homePage.enterProductName(config.productName);
    await homePage.clickSearch();

    //select the searched product post asserting its existance
    productPage = await searchProduct(productName,page);

    //set quantity & add to cart that product then assert the confirm msg
    await productPage.setQuantity(config.productQuantity);
    await productPage.addToCart();
    expect(await productPage.isConfirmationMsgVisible()).toBeTruthy();

    //move to shopping cart page
    await productPage.clickOnItems();
    await productPage.clickOnViewCart();
    shoppingCartPage = new ShoppingCartPage(page);
    const cartPageTotal = await shoppingCartPage.getTotalPrice();
    
    const itemsText = await homePage.getItemsIconText();
    const txt:string[] = itemsText.split('-');
    const itemsPrice = txt[1].trim();

    //asserting price in items button with shopping cart page total, both should be same
    expect(itemsPrice).toEqual(cartPageTotal);

    //checking out page existance from checkout heading
    checkoutPage = await shoppingCartPage.clickOnCheckout();
    expect(await checkoutPage.isCheckoutExist()).toBeTruthy();
})

async function searchProduct(product:string, page:Page): Promise<ProductPage> {
    searchResultPage = new SearchResultPage(page);
    expect(await searchResultPage.isProductExist(product)).toBeTruthy();
    return productPage = await searchResultPage.selectProduct(product);
}

    



