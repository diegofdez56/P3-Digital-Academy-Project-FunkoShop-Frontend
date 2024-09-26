import { defineStore } from 'pinia';
import { useProductService } from './ProductService';

export const useProductStore = defineStore('productStore', () => {
  const productService = useProductService();

  return {
    ...productService, 
  };
});
