import { ref, computed } from 'vue';
import ProductRepository from './ProductRepository.js';

export const useProductService = () => {
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
    try {
      const data = await ProductRepository.fetchAllProducts(page, sizeValue, sortBy, sortOrder, selectedCategory.value);
      products.value = data.content;
      currentPage.value = data.number;
      size.value = data.size;
      totalPages.value = data.totalPages;
    } catch (err) {
      handleError(err);
    } finally {
      isLoading.value = false;
    }
  };

  const fetchProductById = async (id) => {
    isLoading.value = true;
    try {
      product.value = await ProductRepository.fetchProductById(id);
    } catch (err) {
      handleError(err);
    } finally {
      isLoading.value = false;
    }
  };

  const searchProductsByKeyword = async (keyword, page = 0, sizeValue = 8, sortBy = 'categoryId,name', sortOrder = 'asc') => {
    isLoading.value = true;
    try {
      const data = await ProductRepository.searchProductsByKeyword(keyword, page, sizeValue, sortBy, sortOrder);
      products.value = data.content;
      currentPage.value = data.number;
      size.value = data.size;
      totalPages.value = data.totalPages;
    } catch (err) {
      handleError(err);
    } finally {
      isLoading.value = false;
    }
  };

  const fetchDiscountedProducts = async () => {
    isLoading.value = true;
    try {
      products.value = await ProductRepository.fetchDiscountedProducts();
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
    try {
      const newProducts = await ProductRepository.fetchNewProducts();
      productsNew.value = newProducts;
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
    try {
      const updatedProduct = await ProductRepository.updateProduct(id, productData);
      product.value = updatedProduct;
      const index = products.value.findIndex((p) => p.id === id);
      if (index !== -1) {
        products.value[index] = updatedProduct;
      }
    } catch (err) {
      handleError(err);
    } finally {
      isLoading.value = false;
    }
  };

  const deleteProduct = async (id) => {
    isLoading.value = true;
    try {
      await ProductRepository.deleteProduct(id);
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
    fetchProductById,
    searchProductsByKeyword,
    fetchDiscountedProducts,
    fetchNewProducts,
    updateProduct,
    deleteProduct,
  };
};
