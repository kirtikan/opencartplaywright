/*
Test Case: Add Product To Cart
Tags: @master, @regression

Steps:
- Navigate to to app url
- Enter an existing product name in search box
- click the search
- verify the product in search result
- select the product
- set the quantity
- add product to cart
- verify the success msg
*/

import {test,expect} from "@playwright/test";
import { TestConfig } from "../test.config";
import { HomePage } from "../pages/HomePage";
import { SearchResultPage } from "../pages/SearchResultPage";
import { ProductPage } from "../pages/ProductPage";

let config: TestConfig;
let homePage: HomePage;
let searchResultPage: SearchResultPage;
let productPage: ProductPage;

test.beforeEach(async ({page})=>{
    config = new TestConfig();
    await page.goto(config.appUrl);

    homePage = new HomePage(page);
    searchResultPage = new SearchResultPage(page);
    productPage = new ProductPage(page);
})

test.afterEach(async ({page})=>{
    await page.waitForTimeout(2000);
    await page.close();
})

test("Add to cart test",{tag:['@master','@regression']},async ()=>{
    const productName = config.productName;
    await homePage.enterProductName(productName);
    await homePage.clickSearch();

    expect(await searchResultPage.isProductExist(productName)).toBeTruthy();

    if(await searchResultPage.isProductExist(productName)){
        await searchResultPage.selectProduct(productName);
        await productPage.setQuantity(config.productQuantity);
        await productPage.addToCart();
    }
    //assert success msg is visible
    expect(await productPage.isConfirmationMsgVisible()).toBeTruthy();
})