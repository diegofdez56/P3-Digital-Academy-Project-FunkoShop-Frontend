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

    async register(credentialsRegister) {
        try {
            const response = await axios.post(this.baseUrl + '/register', {
                "username": credentialsRegister.username,
                "password": btoa(credentialsRegister.password),
                "email": credentialsRegister.email
            });
    
            return response.data;
    
        } catch (error) {
            console.log('Error during registration:', error);
            return error.toJSON();
        }
    }
}
