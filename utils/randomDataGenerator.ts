import {faker} from "@faker-js/faker";

export class RandomDataUtil{
    static getFirstName(){
        return faker.person.firstName();
    }

    static getLastName(){
        return faker.person.lastName();
    }

    static getFullName(){
        return faker.person.fullName();
    }

    static getEmail(){
        return faker.internet.email();
    }

    static getPhoneNumber(){
        return faker.phone.number();
    }

    static getUserName(){
        return faker.internet.username();
    }

    static getPassword(){
        return faker.internet.password();
    }

    static getRandomCountry(){
        return faker.location.country();
    }

    static getRandomState(){
        return faker.location.state();
    }

    static getRandomCity(){
        return faker.location.city();
    }

    static getRandomPin(){
        return faker.location.zipCode();
    }

    static getRandomAddress(){
        return faker.location.streetAddress();
    }

    static getRandomPassword(length: number=10): string {
        return faker.internet.password({length});
    }

    static getRandomAlphaNumeric(length:number): string{
        return faker.string.alphanumeric({length});
    }

    static getRandomNumric(length:number):string{
        return faker.string.numeric({length});
    }

    static getRandomUUID():string{
        return faker.string.uuid();
    }
}