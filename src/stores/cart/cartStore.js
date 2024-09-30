import { ref, computed, watch } from 'vue';
import { defineStore } from 'pinia';

export const useCartStore = defineStore('cart', () => {
  const products = ref(JSON.parse(localStorage.getItem('cart') || '[]') || []);

  const totalQuantity = computed(() => {
    return products.value.reduce((total, product) => total + (product.quantity || 0), 0);
  });

  const totalPrice = computed(() => {
    return (Math.round(products.value.reduce((total, product) => total + (product.price || 0) * (product.quantity || 0), 0) * 100) / 100).toFixed(2);
  });

  const addProduct = (product, quantity = 1) => {
    if (!product || !product.id || !product.price) {
      console.error("Invalid product", product);
      return; 
    }

    const existingProduct = products.value.find(item => item.id === product.id);
    if (existingProduct) {
      existingProduct.quantity += quantity;
    } else {
      products.value.push({ ...product, quantity });
    }
    saveCart();
  };

  const removeProduct = (id, quantity = 1) => {
    const product = products.value.find(product => product.id === id);
    if (product) {
      if (product.quantity > quantity) {
        product.quantity -= quantity;
      } else {
        products.value = products.value.filter(product => product.id !== id);
      }
      saveCart();
    }
  };

  const updateQuantity = (id, quantity) => {
    const product = products.value.find(product => product.id === id);
    if (product) {
      if (quantity > 0) {
        product.quantity = quantity;
      } else {
        removeProduct(id);
      }
    }
    saveCart();
  };

  const clearCart = () => {
    products.value = [];
    saveCart();
  };

  const saveCart = () => {
    try {
      localStorage.setItem('cart', JSON.stringify(products.value));
    } catch (error) {
      console.error("Failed to save cart to localStorage", error);
    }
  };

  const loadCartFromJSON = (jsonString) => {
    try {
      const parsedProducts = JSON.parse(jsonString);
      if (Array.isArray(parsedProducts)) {
        products.value = parsedProducts.map(product => ({
          ...product,
          quantity: product.quantity || 1 
        }));
        saveCart();
      } else {
        console.error("Invalid JSON format for products");
      }
    } catch (error) {
      console.error("Failed to parse JSON", error);
    }
  };

  watch(products, saveCart, { deep: true });

  return {
    products,
    totalQuantity,
    totalPrice,
    addProduct,
    removeProduct,
    updateQuantity,
    clearCart,
    loadCartFromJSON 
  };
});
