import axios from "axios"

export default class PerfilRepository {

    constructor() {
        this.baseUrl = import.meta.env.VITE_API_ENDPOINT
    }

    async setPerfil(profile) {
        try {
            let headersList = {
                "Accept": "*/*",
                "Authorization": "Bearer " + profile.getAccessToken(),
                "Content-Type": "application/json"
            }

            let bodyContent = JSON.stringify({
                "firstName": profile.getFirstName(),
                "lastName": profile.getLastName(),
                "phoneNumber": profile.getPhoneNumber(),
                "street": profile.getStreet(),
                "city": profile.getCity(),
                "region": profile.getRegion(),
                "postalCode": profile.getPostalCode(),
                "country": profile.getCountry(),
                "address": null,
                "subscribed": profile.getSubscribed(),
                "shipping": profile.getShipping()
            });
            console.log(headersList.Authorization);
            

            let reqOptions = {
                url: this.baseUrl + '/profiles/' + profile.getUserId(),
                method: "PUT",
                headers: headersList,
                data: bodyContent,
            }

            const response = await axios.request(reqOptions);

            const data = await response.data

            return data;

        } catch (error) {
            return error.toJSON()
        }
    }
}
