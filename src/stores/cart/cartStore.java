import { ref, computed } from 'vue';
import { defineStore } from 'pinia';
import axios from 'axios';

export const useCartStore = defineStore('cart', () => {
  
  const items = ref([]);

 
  const totalQuantity = computed(() =>
    items.value.reduce((total, item) => total + item.quantity, 0)
  );

  
  const totalPrice = computed(() =>
    items.value.reduce((total, item) => total + item.price * item.quantity, 0)
  );

 
  const addItem = (product, quantity = 1) => {
    const existingItem = items.value.find(item => item.id === product.id);
    if (existingItem) {
      existingItem.quantity += quantity; 
    } else {
      items.value.push({ ...product, quantity }); 
    }
  };

  const removeItem = (id) => {
    items.value = items.value.filter(item => item.id !== id);
  };

  
  const updateQuantity = (id, quantity) => {
    const item = items.value.find(item => item.id === id);
    if (item) {
      if (quantity > 0) {
        item.quantity = quantity;
      } else {
        removeItem(id); 
      }
    }
  };

  const clearCart = () => {
    items.value = [];
  };

  return {
    items,
    totalQuantity,
    totalPrice,
    addItem,
    removeItem,
    updateQuantity,
    clearCart
  };
});
