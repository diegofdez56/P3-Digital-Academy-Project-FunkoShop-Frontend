import axios from 'axios';
import { defineStore } from 'pinia';

const BASE_URL = import.meta.env.VITE_API_ENDPOINT;
const PAGE_SIZE = 8;

export const useProductStore = defineStore('products', {
    state: () => ({
        products: [],
        product: null,
        isLoading: false,
        error: null,
        currentPage: 0,
        size: PAGE_SIZE,
        totalPages: 0,
    }),

    actions: {
        async fetchAllProducts(page = 0, size = PAGE_SIZE, sortBy = 'category_id,name', sortOrder = 'asc') {
            this.isLoading = true;
            this.error = null;
            try {
                const response = await axios.get(`${BASE_URL}/products`, {
                    params: { page, size, sort: `${sortBy},${sortOrder}` },
                });
                this.products = response.data.content;
                this.currentPage = response.data.number;
                this.size = response.data.size;
                this.totalPages = response.data.totalPages;
            } catch (error) {
                console.error('Error fetching all products:', error);
                this.error = error.response
                    ? `Server Error: ${error.response.status} - ${error.response.data.message || error.response.statusText}`
                    : error.request
                    ? 'No response from server. Please check your network or server status.'
                    : `Error: ${error.message}`;
            } finally {
                this.isLoading = false;
            }
        },

        async fetchProductById(id) {
            this.isLoading = true;
            this.error = null;
            try {
                const response = await axios.get(`${BASE_URL}/products/${id}`);
                this.product = response.data;
            } catch (error) {
                console.error('Error fetching product by ID:', error);
                this.error = error.response ? error.response.data : error.message;
            } finally {
                this.isLoading = false;
            }
        },

        async fetchProductsByCategory(categoryId, { page = 1, size = 8, sortBy = 'category_id,name', sortOrder = 'asc' } = {}) {
            this.isLoading = true;
            this.error = null;
            try {
                const response = await axios.get(`${BASE_URL}/products/category/${categoryId}`, {
                    params: { page: page - 1, size, sort: `${sortBy},${sortOrder}` },
                });
                this.products = response.data.content;
            } catch (error) {
                console.error('Error fetching products by category:', error);
                this.error = error.response ? error.response.data : error.message;
            } finally {
                this.isLoading = false;
            }
        },

        async searchProductsByKeyword(keyword, { page = 1, size = 8, sortBy = 'category_id,name', sortOrder = 'asc' } = {}) {
            this.isLoading = true;
            this.error = null;
            try {
                const response = await axios.get(`${BASE_URL}/products/keyword/${keyword}`, {
                    params: { page: page - 1, size, sort: `${sortBy},${sortOrder}` },
                });
                this.products = response.data.content;
            } catch (error) {
                console.error('Error searching products by keyword:', error);
                this.error = error.response ? error.response.data : error.message;
            } finally {
                this.isLoading = false;
            }
        },

        async createProduct(product) {
            this.isLoading = true;
            this.error = null;
            try {
                const response = await axios.post(`${BASE_URL}/products`, product);
                this.products.push(response.data);
            } catch (error) {
                console.error('Error creating product:', error);
                this.error = error.response ? error.response.data : error.message;
            } finally {
                this.isLoading = false;
            }
        },

        async updateProduct(id, product) {
            this.isLoading = true;
            this.error = null;
            try {
                const response = await axios.put(`${BASE_URL}/products/${id}`, product);
                this.product = response.data;
                const index = this.products.findIndex((p) => p.id === id);
                if (index !== -1) {
                    this.products[index] = response.data;
                }
            } catch (error) {
                console.error('Error updating product:', error);
                this.error = error.response ? error.response.data : error.message;
            } finally {
                this.isLoading = false;
            }
        },

        async deleteProduct(id) {
            this.isLoading = true;
            this.error = null;
            try {
                await axios.delete(`${BASE_URL}/products/${id}`);
                this.products = this.products.filter((product) => product.id !== id);
            } catch (error) {
                console.error('Error deleting product:', error);
                this.error = error.response ? error.response.data : error.message;
            } finally {
                this.isLoading = false;
            }
        },
    },
});