import axios from "axios"

export default class AuthRepository {

    constructor() {
        this.baseUrl = import.meta.env.VITE_API_ENDPOINT
    }

    async login(credentials) {
        try {
            let headersList = {
                "Accept": "*/*",
                "Content-Type": "application/json"
            }

            let bodyContent = JSON.stringify({
                "email": credentials.getUsername(),
                "password": credentials.getPassword()
            });

            let reqOptions = {
                url: this.baseUrl + '/auth/authenticate',
                method: "POST",
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
