import {test,expect} from "../fixtures/page.fixture";
import { TestConfig } from "../test.config"; 
import { RandomDataUtil } from "../utils/randomDataGenerator";

let config: TestConfig;

test("End To End Test", {tag: '@fix'}, async ({
    page,
    homePage,
    registrationPage,
    myAccountPage,
    logoutPage,
    loginPage,
    searchResultPage,
    productPage,
    shoppingCartPage,
    checkoutPage
    })=>{
    config = new TestConfig();

    //navigate to url
    await page.goto(config.appUrl);
    const productName = config.productName;
    await homePage.clickMyAccount();
    await homePage.clickRegister();

    //fill registration
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
    await loginPage.login(emailInput,pwdInput);

    //search the product
    await homePage.enterProductName(config.productName);
    await homePage.clickSearch();

    //select the searched product post asserting its existance
    //productPage = await searchProduct(productName,page);
    expect(await searchResultPage.isProductExist(productName)).toBeTruthy();
    productPage = await searchResultPage.selectProduct(productName);

    //set quantity & add to cart that product then assert the confirm msg
    await productPage.setQuantity(config.productQuantity);
    await productPage.addToCart();
    expect(await productPage.isConfirmationMsgVisible()).toBeTruthy();

   //move to shopping cart page
    await productPage.clickOnItems();
    await productPage.clickOnViewCart();
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

// async function searchProduct(product:string, searchResultPage): Promise<ProductPage> {
//     searchResultPage = new SearchResultPage(page);
//     expect(await searchResultPage.isProductExist(product)).toBeTruthy();
//     return productPage = await searchResultPage.selectProduct(product);
// }

    



