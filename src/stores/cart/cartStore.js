import { ref, computed, watch } from 'vue';
import { defineStore } from 'pinia';

export const useCartStore = defineStore('cart', () => {
  const products = ref(JSON.parse(localStorage.getItem('cart') || '[]'));

  const totalQuantity = computed(() => {
    return products.value.reduce((total, product) => total + product.quantity, 0);
  });

  const totalPrice = computed(() => {
    const total = products.value.reduce((sum, product) => sum + product.price * product.quantity, 0);
    return Math.round(total * 100) / 100;
  });

  const addProduct = (product, quantity = 1) => {
    console.log('Producto a añadir:', product);
    const existingProduct = products.value.find(item => item.id === product.id);
    if (existingProduct) {
      existingProduct.quantity += quantity;
    } else {
      products.value.push({ ...product, quantity, imageHash: product.imageHash });
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
    localStorage.setItem('cart', JSON.stringify(products.value));
  };

  watch(products, saveCart, { deep: true });

  return {
    products,       
    totalQuantity,  
    totalPrice,    
    addProduct,     
    removeProduct,  
    updateQuantity, 
    clearCart      
  };
});
