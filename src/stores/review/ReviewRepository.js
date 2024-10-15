import axios from "axios"

const BASE_URL = import.meta.env.VITE_API_ENDPOINT + '/reviews';

export default class ReviewRepository {

    async addReview(review, accessToken) {
        try {
            let headersList = {
                "Accept": "*/*",
                "Authorization": "Bearer " + accessToken,
                "Content-Type": "application/json"
            }

            let reqOptions = {
                url: BASE_URL,
                method: "POST",
                headers: headersList,
                data: review,
            }

            const response = await axios.request(reqOptions);

            return response.data;

        } catch (error) {
            console.error("Error in add review:", error)
            return {
                message: "Error while add review",
                details: error.response ? error.response.data : error.toJSON()
            }
        }
    }

    async updateReview(review, accessToken) {
        try {
            let headersList = {
                "Accept": "*/*",
                "Authorization": "Bearer " + accessToken,
                "Content-Type": "application/json"
            }

            let reqOptions = {
                url: BASE_URL,
                method: "PUT",
                headers: headersList,
                data: review,
            }

            const response = await axios.request(reqOptions);

            return response.data;

        } catch (error) {
            console.error("Error in update review:", error)
            return {
                message: "Error while updating review",
                details: error.response ? error.response.data : error.toJSON()
            }
        }
    }

    async getReviewByIdAndUser(orderItemId, accessToken) {
        try {
            let headersList = {
                "Accept": "*/*",
                "Authorization": "Bearer " + accessToken,
                "Content-Type": "application/json"
            }

            let reqOptions = {
                url: BASE_URL + "/" + orderItemId,
                method: "GET",
                headers: headersList
            }

            const response = await axios.request(reqOptions);

            return response.data;

        } catch (error) {
            console.error("Error in get review:", error.message)
        }
    }
}
