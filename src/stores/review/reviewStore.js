import { defineStore } from 'pinia';
import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_ENDPOINT;

export const useReviewStore = defineStore('reviewStore', {
  state: () => ({
    reviews: [],
    review: null,
    loading: false,
    error: null,
  }),

  actions: {
    async fetchAllReviews() {
      this.loading = true;
      this.error = null;
      try {
        const response = await axios.get(`${BASE_URL}/reviews`);
        this.reviews = response.data;
      } catch (error) {
        this.error = 'Failed to fetch reviews';
      } finally {
        this.loading = false;
      }
    },

    async fetchReviewById(id) {
      this.loading = true;
      this.error = null;
      try {
        const response = await axios.get(`${BASE_URL}/reviews/${id}`);
        this.review = response.data;
      } catch (error) {
        this.error = `Failed to fetch review with ID ${id}`;
      } finally {
        this.loading = false;
      }
    },

    async addReview(reviewData) {
      this.loading = true;
      this.error = null;
      try {
        const response = await axios.post(`${BASE_URL}/reviews`, reviewData);
        this.reviews.push(response.data);
      } catch (error) {
        this.error = 'Failed to create review';
      } finally {
        this.loading = false;
      }
    },

    async updateReview(id, reviewData) {
      this.loading = true;
      this.error = null;
      try {
        const response = await axios.put(`${BASE_URL}/reviews/${id}`, reviewData);
        const index = this.reviews.findIndex(review => review.id === id);
        if (index !== -1) {
          this.reviews[index] = response.data;
        }
      } catch (error) {
        this.error = `Failed to update review with ID ${id}`;
      } finally {
        this.loading = false;
      }
    },

    async deleteReview(id) {
      this.loading = true;
      this.error = null;
      try {
        await axios.delete(`${BASE_URL}/reviews/${id}`);
        this.reviews = this.reviews.filter(review => review.id !== id);
      } catch (error) {
        this.error = `Failed to delete review with ID ${id}`;
      } finally {
        this.loading = false;
      }
    }
  }
});
