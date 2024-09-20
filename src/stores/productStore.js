import axios from 'axios';
import { defineStore } from 'pinia';

const BASE_URL = import.meta.env.VITE_API_ENDPOINT;

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    "Authorization": `Bearer ${localStorage.getItem('token')}`,
  },
});

export const useProductStore = defineStore("products", {
  state: () => ({
    products: [],
    product: null,
    loading: false,
    error: null,
  }),

  getters: {
    allProducts: (state) => state.products,
    singleProduct: (state) => state.product,
    isLoading: (state) => state.loading,
    hasError: (state) => state.error,
  },

  actions: {
    async fetchAllProducts({ pageNum = 1, pageSize = 10, sortBy = 'name', sortOrder = 'asc' } = {}) {
      this.loading = true;
      try {
        const response = await api.get(`/products`, {
          params: { pageNum, pageSize, sortBy, sortOrder },
        });
        this.products = response.data;
      } catch (error) {
        this.error = error;
      } finally {
        this.loading = false;
      }
    },

    async fetchProductById(id) {
      this.loading = true;
      try {
        const response = await api.get(`/products/${id}`);
        this.product = response.data;
      } catch (error) {
        this.error = error;
      } finally {
        this.loading = false;
      }
    },

    async fetchProductsByCategory({ categoryId, pageNum = 1, pageSize = 10, sortBy = 'name', sortOrder = 'asc' }) {
      this.loading = true;
      try {
        const response = await api.get(`/products/category/${categoryId}`, {
          params: { pageNum, pageSize, sortBy, sortOrder },
        });
        this.products = response.data;
      } catch (error) {
        this.error = error;
      } finally {
        this.loading = false;
      }
    },

    async searchProductsByKeyword({ keyword, pageNum = 1, pageSize = 10, sortBy = 'name', sortOrder = 'asc' }) {
      this.loading = true;
      try {
        const response = await api.get(`/products/keyword/${keyword}`, {
          params: { pageNum, pageSize, sortBy, sortOrder },
        });
        this.products = response.data;
      } catch (error) {
        this.error = error;
      } finally {
        this.loading = false;
      }
    },

    async createProduct(product) {
      this.loading = true;
      try {
        const response = await api.post(`/products`, product);
        this.products.push(response.data);
      } catch (error) {
        this.error = error;
      } finally {
        this.loading = false;
      }
    },

    async updateProduct(id, product) {
      this.loading = true;
      try {
        const response = await api.put(`/products/${id}`, product);
        this.product = response.data;
      } catch (error) {
        this.error = error;
      } finally {
        this.loading = false;
      }
    },

    async deleteProduct(id) {
      this.loading = true;
      try {
        await api.delete(`/products/${id}`);
        this.products = this.products.filter((product) => product.id !== id);
      } catch (error) {
        this.error = error;
      } finally {
        this.loading = false;
      }
    },
  },
});
