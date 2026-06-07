import {test as base} from "@playwright/test";
import { HomePage } from "../pages/HomePage";
import { LoginPage } from "../pages/LoginPage";
import { MyAccountPage } from "../pages/MyAccountPage";
import { LogoutPage } from "../pages/LogoutPage";
import { SearchResultPage } from "../pages/SearchResultPage";
import { ProductPage } from "../pages/ProductPage";
import { ShoppingCartPage } from "../pages/ShoppingCartPage";
import { RegistrationPage } from "../pages/RegistrationPage";
import { CheckoutPage } from "../pages/CheckoutPage";

type PageFixtures = {
    homePage: HomePage;
    registrationPage: RegistrationPage;
    myAccountPage: MyAccountPage;
    logoutPage: LogoutPage;
    loginPage: LoginPage;
    searchResultPage: SearchResultPage;
    productPage: ProductPage;
    shoppingCartPage: ShoppingCartPage;
    checkoutPage: CheckoutPage;
};

export const test = base.extend<PageFixtures>({
    homePage: async({page},use)=>{
        await use(new HomePage(page));
    },

    registrationPage: async({page},use)=>{
        await use(new RegistrationPage(page));
    },

    myAccountPage: async({page},use)=>{
        await use(new MyAccountPage(page));
    },

    logoutPage: async({page},use)=>{
        await use(new LogoutPage(page));
    },

    loginPage: async({page},use)=>{
        await use(new LoginPage(page));
    },

    searchResultPage: async({page},use)=>{
        await use(new SearchResultPage(page));
    },

    productPage: async({page},use)=>{
        await use(new ProductPage(page));
    },

    shoppingCartPage: async({page},use)=>{
        await use(new ShoppingCartPage(page));
    },

    checkoutPage: async({page},use)=>{
        await use(new CheckoutPage(page));
    }
});
export {expect} from "@playwright/test";