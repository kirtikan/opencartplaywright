/*
test case: Search Product
Tags: @master, @regression

Steps:
1) navigate to the url
2) enter the product name in the search field
3) click th e search btn
4) verify if product is displayed in the search results
*/

import {test,expect} from "@playwright/test";
import { HomePage } from "../pages/HomePage";
import { SearchResultPage } from "../pages/SearchResultPage";
import { TestConfig } from "../test.config";

let config: TestConfig;
let homePage: HomePage;
let searchResultPage: SearchResultPage;

//PW hook run before each test
test.beforeEach(async({page})=>{
    config = new TestConfig();
    await page.goto(config.appUrl);

    homePage = new HomePage(page);
    searchResultPage = new SearchResultPage(page);
})

//PW hook run after each test
test.afterEach(async ({page})=>{
    await page.close();
})

test("Product search test",{tag:['@master','@regression']},async()=>{
    const productName = config.productName;

    await homePage.enterProductName(productName);
    await homePage.clickSearch();

    expect(await searchResultPage.isSearchPageResultExist()).toBe(true);

    expect(await searchResultPage.isProductExist(productName)).toBeTruthy();
})
