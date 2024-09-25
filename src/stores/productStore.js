import { ref, computed } from 'vue';
import { defineStore } from 'pinia';
import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_ENDPOINT + '/products';

export const useProductStore = defineStore('products', () => {
 
  const products = ref([]);
  const productsNew = ref([]);
  const product = ref(null);
  const isLoading = ref(false);
  const error = ref(null);
  const currentPage = ref(0);
  const size = ref(8);
  const totalPages = ref(0);
  const selectedCategory = ref({ id: null, name: 'All' });

  const totalProducts = computed(() => products.value.length);

  
  const fetchAllProducts = async (page = 0, sizeValue = 8, sortBy = 'name', sortOrder = 'asc') => {
    isLoading.value = true;
    error.value = null;
    try {
      const params = { page, size: sizeValue, sort: `${sortBy},${sortOrder}` };
      let url = BASE_URL;

      if (selectedCategory.value && selectedCategory.value.id !== null) {
        url = `${BASE_URL}/category/${selectedCategory.value.id}`;
      }

      const response = await axios.get(url, { params });
      products.value = response.data.content;
      currentPage.value = response.data.number;
      size.value = response.data.size;
      totalPages.value = response.data.totalPages;
    } catch (err) {
      handleError(err);
    } finally {
      isLoading.value = false;
    }
  };

  const setCategory = async (category) => {
    selectedCategory.value = category;
    currentPage.value = 0;
    await fetchAllProducts(0, size.value);
  };

  const fetchProductById = async (id) => {
    isLoading.value = true;
    error.value = null;
    try {
      const response = await axios.get(`${BASE_URL}/${id}`);
      product.value = response.data;
    } catch (err) {
      handleError(err);
    } finally {
      isLoading.value = false;
    }
  };

  const searchProductsByKeyword = async (keyword, page = 0, sizeValue = 8, sortBy = 'categoryId,name', sortOrder = 'asc') => {
    isLoading.value = true;
    error.value = null;
    try {
      const response = await axios.get(`${BASE_URL}/keyword/${keyword}`, {
        params: { page, size: sizeValue, sort: `${sortBy},${sortOrder}` }
      });
      products.value = response.data.content;
      currentPage.value = response.data.number;
      size.value = response.data.size;
      totalPages.value = response.data.totalPages;
    } catch (err) {
      handleError(err);
    } finally {
      isLoading.value = false;
    }
  };

  const fetchDiscountedProducts = async () => {
    isLoading.value = true;
    error.value = null;
    try {
      const response = await axios.get(`${BASE_URL}/discounted`);
      products.value = response.data;
      currentPage.value = 0;
      totalPages.value = 1;
    } catch (err) {
      handleError(err);
    } finally {
      isLoading.value = false;
    }
  };

  const fetchNewProducts = async () => {
    isLoading.value = true;
    error.value = null;
    try {
      const response = await axios.get(`${BASE_URL}/new`);
      console.log('Fetched products:', response.data); 
      productsNew.value = response.data;
      console.log('Products in store:', productsNew.value); 
      currentPage.value = 0;
      totalPages.value = 1;
    } catch (err) {
      handleError(err);
    } finally {
      isLoading.value = false;
    }
  };
  
  

  const updateProduct = async (id, productData) => {
    isLoading.value = true;
    error.value = null;
    try {
      const response = await axios.put(`${BASE_URL}/${id}`, productData);
      product.value = response.data;
      const index = products.value.findIndex((p) => p.id === id);
      if (index !== -1) {
        products.value[index] = response.data;
      }
    } catch (err) {
      handleError(err);
    } finally {
      isLoading.value = false;
    }
  };

  const deleteProduct = async (id) => {
    isLoading.value = true;
    error.value = null;
    try {
      await axios.delete(`${BASE_URL}/${id}`);
      products.value = products.value.filter((product) => product.id !== id);
    } catch (err) {
      handleError(err);
    } finally {
      isLoading.value = false;
    }
  };

  const handleError = (err) => {
    error.value = err.response
      ? `Server Error: ${err.response.status} - ${err.response.data.message || err.response.statusText}`
      : err.request
      ? 'No response from server. Please check your network or server status.'
      : `Error: ${err.message}`;
  };

  return {
    products,
    product,
    productsNew,
    isLoading,
    error,
    currentPage,
    size,
    totalPages,
    selectedCategory,
    totalProducts, 
    fetchAllProducts,
    setCategory,
    fetchProductById,
    searchProductsByKeyword,
    fetchDiscountedProducts,
    fetchNewProducts,
    updateProduct,
    deleteProduct
  };
});
