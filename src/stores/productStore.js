import axios from 'axios';
import { defineStore } from 'pinia';

const BASE_URL = import.meta.env.VITE_API_ENDPOINT + '/products';
console.log('BASE_URL:', BASE_URL);

export const useProductStore = defineStore('products', {
  state: () => ({
    products: [],
    product: null,
    isLoading: false,
    error: null,
    currentPage: 0,
    size: 8,
    totalPages: 0,
  }),

  actions: {
    async fetchAllProducts(page = 0, size = 8, sortBy = 'name', sortOrder = 'asc') {
      console.log('fetchAllProducts called with params:', { page, size, sortBy, sortOrder });
      this.isLoading = true;
      this.error = null;
      try {
        console.log('Sending GET request to:', BASE_URL, {
          params: { page, size, sort: `${sortBy},${sortOrder}` },
        });
        const response = await axios.get(BASE_URL, {
          params: { page, size, sort: `${sortBy},${sortOrder}` },
        });
        console.log('Response data:', response.data);
        this.products = response.data.content;
        this.currentPage = response.data.number;
        this.size = response.data.size;
        this.totalPages = response.data.totalPages;
      } catch (error) {
        console.error('Error fetching all products:', error);
        this.handleError(error);
      } finally {
        this.isLoading = false;
        console.log('fetchAllProducts finished');
      }
    },

    async fetchProductById(id) {
      console.log('fetchProductById called with id:', id);
      this.isLoading = true;
      this.error = null;
      try {
        console.log('Sending GET request to:', `${BASE_URL}/${id}`);
        const response = await axios.get(`${BASE_URL}/${id}`);
        console.log('Response data:', response.data);
        this.product = response.data;
      } catch (error) {
        console.error('Error fetching product by ID:', error);
        this.handleError(error);
      } finally {
        this.isLoading = false;
        console.log('fetchProductById finished');
      }
    },

    async fetchProductsByCategory(categoryId, page = 0, size = 8, sortBy = 'categoryId,name', sortOrder = 'asc') {
      console.log('fetchProductsByCategory called with params:', { categoryId, page, size, sortBy, sortOrder });
      this.isLoading = true;
      this.error = null;
      try {
        console.log('Sending GET request to:', `${BASE_URL}/category/${categoryId}`, {
          params: { page, size, sort: `${sortBy},${sortOrder}` },
        });
        const response = await axios.get(`${BASE_URL}/category/${categoryId}`, {
          params: { page, size, sort: `${sortBy},${sortOrder}` },
        });
        console.log('Response data:', response.data);
        this.products = response.data.content;
        this.currentPage = response.data.number;
        this.size = response.data.size;
        this.totalPages = response.data.totalPages;
      } catch (error) {
        console.error('Error fetching products by category:', error);
        this.handleError(error);
      } finally {
        this.isLoading = false;
        console.log('fetchProductsByCategory finished');
      }
    },

    async searchProductsByKeyword(keyword, page = 0, size = 8, sortBy = 'categoryId,name', sortOrder = 'asc') {
      console.log('searchProductsByKeyword called with params:', { keyword, page, size, sortBy, sortOrder });
      this.isLoading = true;
      this.error = null;
      try {
        console.log('Sending GET request to:', `${BASE_URL}/keyword/${keyword}`, {
          params: { page, size, sort: `${sortBy},${sortOrder}` },
        });
        const response = await axios.get(`${BASE_URL}/keyword/${keyword}`, {
          params: { page, size, sort: `${sortBy},${sortOrder}` },
        });
        console.log('Response data:', response.data);
        this.products = response.data.content;
        this.currentPage = response.data.number;
        this.size = response.data.size;
        this.totalPages = response.data.totalPages;
      } catch (error) {
        console.error('Error searching products by keyword:', error);
        this.handleError(error);
      } finally {
        this.isLoading = false;
        console.log('searchProductsByKeyword finished');
      }
    },

    // Uncomment and update createProduct if needed
    // async createProduct(product) {
    //   console.log('createProduct called with product:', product);
    //   this.isLoading = true;
    //   this.error = null;
    //   try {
    //     console.log('Sending POST request to:', BASE_URL, product);
    //     const response = await axios.post(BASE_URL, product);
    //     console.log('Response data:', response.data);
    //     // Optionally, you can refresh the product list or add the new product to `this.products`
    //     // this.products.push(response.data);
    //   } catch (error) {
    //     console.error('Error creating product:', error);
    //     this.handleError(error);
    //   } finally {
    //     this.isLoading = false;
    //     console.log('createProduct finished');
    //   }
    // },

    async updateProduct(id, product) {
      console.log('updateProduct called with id and product:', id, product);
      this.isLoading = true;
      this.error = null;
      try {
        console.log('Sending PUT request to:', `${BASE_URL}/${id}`, product);
        const response = await axios.put(`${BASE_URL}/${id}`, product);
        console.log('Response data:', response.data);
        this.product = response.data;
        // Optionally, update the product in `this.products` if it's loaded
        const index = this.products.findIndex((p) => p.id === id);
        if (index !== -1) {
          this.products[index] = response.data;
        }
      } catch (error) {
        console.error('Error updating product:', error);
        this.handleError(error);
      } finally {
        this.isLoading = false;
        console.log('updateProduct finished');
      }
    },

    async deleteProduct(id) {
      console.log('deleteProduct called with id:', id);
      this.isLoading = true;
      this.error = null;
      try {
        console.log('Sending DELETE request to:', `${BASE_URL}/${id}`);
        await axios.delete(`${BASE_URL}/${id}`);
        console.log('Product deleted successfully');
        // Optionally, remove the product from `this.products`
        this.products = this.products.filter((product) => product.id !== id);
      } catch (error) {
        console.error('Error deleting product:', error);
        this.handleError(error);
      } finally {
        this.isLoading = false;
        console.log('deleteProduct finished');
      }
    },

    // Centralized error handling
    handleError(error) {
      console.error('An error occurred:', error);
      this.error = error.response
        ? `Server Error: ${error.response.status} - ${error.response.data.message || error.response.statusText}`
        : error.request
        ? 'No response from server. Please check your network or server status.'
        : `Error: ${error.message}`;
    },
  },
});
