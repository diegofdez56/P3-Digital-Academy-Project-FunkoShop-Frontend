import { defineStore } from "pinia";
import { ref } from "vue";
import Profile from "./Profile";
import ProfileService from "./ProfileService";


export const ProfileStore = defineStore('profile', () => {

    const profile = ref(
        {
            firstName: '',
            lastName: '',
            street: '',
            city: '',
            region: '',
            postalCode: '',
            country: '',
            subscribed: false,
            shipping: false,
            address: '',
            phoneNumber: '',
            userAccesToken: ''
        }
    )

    function setProfile(firstName, lastName, phoneNumber, street, city, region, postalCode, country, address, subscribed, shipping, userAccesToken) {

        const profile = new Profile(firstName, lastName, phoneNumber, street, city, region, postalCode, country, address, subscribed, shipping, userAccesToken)
        const service = new ProfileService(profile)
        return service.setProfile()

    }

    function getProfile(accessToken) {
        const service = new ProfileService()
        return service.getProfile(accessToken)
    }

    return { profile, setProfile, getProfile };
});