<!-- src/views/ProductView.vue -->
<script setup>
import { onMounted } from 'vue';
import { useProductStore } from '../stores/productStore';
import { storeToRefs } from 'pinia';
import ProductList from '../components/ProductList.vue';

const productStore = useProductStore();
const { products, isLoading, error, currentPage, totalPages } = storeToRefs(productStore);

const fetchProducts = () => {
  productStore.fetchAllProducts(currentPage.value);
};

onMounted(() => {
  fetchProducts();
});

const handlePageChange = (newPage) => {
  productStore.fetchAllProducts(newPage);
};
</script>

<template>
  <div>
    <div v-if="isLoading" class="text-center mt-2">
      <p>Loading products...</p>
    </div>
    <div v-else-if="error" class="text-center mt-2 text-red-500">
      <p>Error: {{ error }}</p>
    </div>
    <div v-else>
      <ProductList
        :products="products"
        :currentPage="currentPage"
        :totalPages="totalPages"
        @changePage="handlePageChange"
      />
    </div>
  </div>
</template>


