import axios from 'axios'
import { defineStore } from 'pinia'

const BASE_URL = import.meta.env.VITE_API_ENDPOINT + '/products'

export const useProductStore = defineStore('products', {
  state: () => ({
    products: [],
    product: null,
    isLoading: false,
    error: null,
    currentPage: 0,
    size: 8,
    totalPages: 0,
    selectedCategory: { id: null, name: 'All' }
  }),

  actions: {
    async fetchAllProducts(page = 0, size = 8, sortBy = 'name', sortOrder = 'asc') {
      this.isLoading = true
      this.error = null
      try {
        const params = { page, size, sort: `${sortBy},${sortOrder}` }
        let url = BASE_URL

        if (this.selectedCategory && this.selectedCategory.id !== null) {
          url = `${BASE_URL}/category/${this.selectedCategory.id}`
        }

        const response = await axios.get(url, { params })
        this.products = response.data.content
        this.currentPage = response.data.number
        this.size = response.data.size
        this.totalPages = response.data.totalPages
      } catch (error) {
        this.handleError(error)
      } finally {
        this.isLoading = false
      }
    },

    async setCategory(category) {
      this.selectedCategory = category
      this.currentPage = 0
      await this.fetchAllProducts(0, this.size)
    },

    async fetchProductById(id) {
      this.isLoading = true
      this.error = null
      try {
        const response = await axios.get(`${BASE_URL}/${id}`)
        this.product = response.data
      } catch (error) {
        this.handleError(error)
      } finally {
        this.isLoading = false
      }
    },

    async searchProductsByKeyword(
      keyword,
      page = 0,
      size = 8,
      sortBy = 'categoryId,name',
      sortOrder = 'asc'
    ) {
      this.isLoading = true
      this.error = null
      try {
        const response = await axios.get(`${BASE_URL}/keyword/${keyword}`, {
          params: { page, size, sort: `${sortBy},${sortOrder}` }
        })
        this.products = response.data.content
        this.currentPage = response.data.number
        this.size = response.data.size
        this.totalPages = response.data.totalPages
      } catch (error) {
        this.handleError(error)
      } finally {
        this.isLoading = false
      }
    },

    async updateProduct(id, product) {
      this.isLoading = true
      this.error = null
      try {
        const response = await axios.put(`${BASE_URL}/${id}`, product)
        this.product = response.data
        const index = this.products.findIndex((p) => p.id === id)
        if (index !== -1) {
          this.products[index] = response.data
        }
      } catch (error) {
        this.handleError(error)
      } finally {
        this.isLoading = false
      }
    },

    async deleteProduct(id) {
      this.isLoading = true
      this.error = null
      try {
        await axios.delete(`${BASE_URL}/${id}`)
        this.products = this.products.filter((product) => product.id !== id)
      } catch (error) {
        this.handleError(error)
      } finally {
        this.isLoading = false
      }
    },

    handleError(error) {
      this.error = error.response
        ? `Server Error: ${error.response.status} - ${
            error.response.data.message || error.response.statusText
          }`
        : error.request
          ? 'No response from server. Please check your network or server status.'
          : `Error: ${error.message}`
    }
  }
})
