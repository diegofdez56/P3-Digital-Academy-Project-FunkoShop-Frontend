import { defineStore } from "pinia";
import ReviewService from "./ReviewService";


export const ReviewStore = defineStore('categories', () => {

    function addReview(review, accessToken) {
        const service = new ReviewService()
        return service.addReview(review, accessToken)
    }

    function updateReview(review, accessToken) {
        const service = new ReviewService()
        return service.updateReview(review, accessToken)
    }

    function getReviewByIdAndUser(orderItemId, accessToken) {
        const service = new ReviewService()
        return service.getReviewByIdAndUser(orderItemId, accessToken)
    }

    return { addReview, getReviewByIdAndUser,updateReview };
});