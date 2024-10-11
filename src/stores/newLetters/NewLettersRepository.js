import axios from "axios"

const BASE_URL = import.meta.env.VITE_API_ENDPOINT + '/news-letter';

export default class CategoryRepository {

    async setNewLetters(email) {
        try {
            let headersList = {
                "Accept": "*/*",
                "Content-Type": "application/json"
            }

            let bodyContent = JSON.stringify({
                "email": email
            });
            
            let reqOptions = {
                url: BASE_URL,
                method: "POST",
                headers: headersList,
                data: bodyContent
            }

            const response = await axios.request(reqOptions);

            const data = await response.data

            return data;

        } catch (error) {
            return error.toJSON()
        }
    }

    async unsubscribeNewsletter(code) {
        try {
            let headersList = {
                "Accept": "*/*",
            };

            let reqOptions = {
                url: `${BASE_URL}/unsubscribe?code=${code}`,
                method: "DELETE",
                headers: headersList
            };

            const response = await axios.request(reqOptions);
            return response.data;
        } catch (error) {
            return error.toJSON();
        }
    }

}
