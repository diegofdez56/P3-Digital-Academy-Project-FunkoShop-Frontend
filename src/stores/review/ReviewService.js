import ReviewRepository from "./ReviewRepository"

export default class ReviewService {

    #repo

    constructor() {
        this.#repo = new ReviewRepository()
    }

    async addReview(review, accessToken) {
        const response = await this.#repo.addReview(review, accessToken)
        return response
    }

    async updateReview(review, accessToken) {
        const response = await this.#repo.updateReview(review, accessToken)
        return response
    }

    async getReviewByIdAndUser(orderItemId, accessToken) {
        const response = await this.#repo.getReviewByIdAndUser(orderItemId, accessToken)
        return response
    }

}