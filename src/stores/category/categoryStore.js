import { ref } from 'vue';
import { defineStore } from 'pinia';
import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_ENDPOINT + '/categories';

export const useCategoryStore = defineStore('categories', () => {
  const categories = ref([]);
  const isLoading = ref(false);
  const error = ref(null);

  const fetchCategories = async () => {
    isLoading.value = true;
    error.value = null;
    try {
      const response = await axios.get(BASE_URL);
      categories.value = [{ id: null, name: 'All' }, ...response.data];
    } catch (err) {
      error.value = err.response?.data?.message || err.message;
    } finally {
      isLoading.value = false;
    }
  };

  return {
    categories,
    isLoading,
    error,
    fetchCategories
  };
});
