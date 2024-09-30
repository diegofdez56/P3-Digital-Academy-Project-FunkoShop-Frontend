import axios from "axios"

export default class CategoryRepository {

    constructor() {
        this.apiKey = import.meta.env.VITE_API_KEY
        this.idList = import.meta.env.VITE_ID_LIST
    }

    async getCategories() {
        try {
            let headersList = {
                "Accept": "*/*",
                "Content-Type": "application/json"
            }

            let reqOptions = {
                url: 'https://youtube.googleapis.com/youtube/v3/playlistItems?part=snippet%2CcontentDetails&maxResults=25&playlistId=' + this.idList + '&key=' + this.apiKey,
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
