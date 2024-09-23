export default class Perfil {

    #firstName
    #lastName
    #street
    #city
    #region
    #postalCode
    #country
    #subscribed
    #shipping
    #address
    #phoneNumber
    #accessToken

    constructor(firstName, lastName, phoneNumber, street, city, region, postalCode, country, address, subscribed, shipping, accessToken) {
        this.#firstName = firstName
        this.#lastName = lastName
        this.#street = street
        this.#city = city
        this.#region = region
        this.#postalCode = postalCode
        this.#country = country
        this.#subscribed = subscribed
        this.#shipping = shipping
        this.#address = address
        this.#phoneNumber = phoneNumber
        this.#accessToken = accessToken
    }

    getFirstName() {
        return this.#firstName
    }

    getLastName() { 
        return this.#lastName
    }

    getStreet() {
        return this.#street
    }

    getCity() { 
        return this.#city
    }

    getRegion() {
        return this.#region
    }

    getPostalCode() {
        return this.#postalCode
    }

    getCountry() {  
        return this.#country
    }

    getSubscribed() {
        return this.#subscribed 
    }

    getShipping() {
        return this.#shipping
    }

    getAddress() {
        return this.#address
    }

    getPhoneNumber() {
        return this.#phoneNumber
    }

    getAccessToken() {
        return this.#accessToken
    }

}