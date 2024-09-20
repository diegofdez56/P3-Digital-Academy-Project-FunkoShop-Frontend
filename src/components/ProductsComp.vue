<template>
  <div>
    <button @click="fetchProducts">Fetch Products</button>
    <div v-if="productStore.isLoading">Loading...</div>
    <div v-if="productStore.error">Error: {{ productStore.error }}</div>
    <ul>
      <li v-for="product in productStore.products" :key="product.id">{{ product.name }}</li>
    </ul>
  </div>
</template>

<script setup>
import { useProductStore } from './../stores/productStore';
import { onMounted } from 'vue';

const productStore = useProductStore();

const fetchProducts = () => {
  productStore.fetchAllProducts();
};

onMounted(() => {
  fetchProducts();
});
</script>