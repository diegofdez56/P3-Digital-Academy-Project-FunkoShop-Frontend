import axios from "axios"

const BASE_URL = import.meta.env.VITE_API_ENDPOINT + '/categories';

export default class CategoryRepository {

    async getCategories() {
        try {
            let headersList = {
                "Accept": "*/*",
                "Content-Type": "application/json"
            }

            let reqOptions = {
                url: BASE_URL,
                method: "GET",
                headers: headersList
            }

            const response = await axios.request(reqOptions);

            const data = await response.data

            return data;

        } catch (error) {
            return error.toJSON()
        }
    }
}
