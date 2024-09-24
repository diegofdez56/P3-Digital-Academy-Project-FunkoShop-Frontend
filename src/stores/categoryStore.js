import { defineStore } from 'pinia'
import axios from 'axios'

const BASE_URL = import.meta.env.VITE_API_ENDPOINT + '/categories'

export const useCategoryStore = defineStore('categories', {
  state: () => ({
    categories: [],
    isLoading: false,
    error: null
  }),

  actions: {
    async fetchCategories() {
      this.isLoading = true
      this.error = null
      try {
        const response = await axios.get(BASE_URL)
        this.categories = [{ id: null, name: 'All' }, ...response.data]
      } catch (error) {
        this.error = error.response?.data?.message || error.message
      } finally {
        this.isLoading = false
      }
    }
  }
})
