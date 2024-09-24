import { defineStore } from "pinia";
import { ref } from "vue";
import Perfil from "./Perfil";
import PerfilService from "./PerfilService";


export const perfilStore = defineStore('perfil', () => {

    const perfil = ref(
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

        const perfil = new Perfil(firstName, lastName, phoneNumber, street, city, region, postalCode, country, address, subscribed, shipping, userAccesToken)
        const service = new PerfilService(perfil)
        return service.setProfile()

    }

    function getProfile(accessToken) {
        const service = new PerfilService()
        return service.getProfile(accessToken)
    }

    return { perfil, setProfile, getProfile };
});