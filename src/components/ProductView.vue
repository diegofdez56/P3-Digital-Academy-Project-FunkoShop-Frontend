<script setup>
import { onMounted } from 'vue'
import { useProductStore } from '../stores/productStore'
import { storeToRefs } from 'pinia'
import ProductList from '../components/ProductList.vue'

const productStore = useProductStore()
const { products, isLoading, error, currentPage, totalPages, categories, selectedCategory } =
  storeToRefs(productStore)

const fetchProducts = () => {
  productStore.fetchAllProducts(currentPage.value)
}

onMounted(() => {
  fetchProducts()
})

const handlePageChange = (newPage) => {
  productStore.fetchAllProducts(newPage)
}

const handleCategoryChange = (category) => {
  productStore.setCategory(category)
}
</script>

<template>
  <div>
    <div class="flex flex-wrap justify-center my-4">
      <button v-for="category in categories" :key="category.id" @click="handleCategoryChange(category)" :class="[
        'px-4 py-2 m-2 rounded',
        category.id === selectedCategory.id
          ? 'bg-blue-600 text-white'
          : 'bg-gray-200 text-gray-700'
      ]">
        {{ category.name }}
      </button>
    </div>

    <div v-if="isLoading" class="text-center mt-2">
      <p>Loading products...</p>
    </div>
    <div v-else-if="error" class="text-center mt-2 text-red-500">
      <p>Error: {{ error }}</p>
    </div>
    <div v-else>
      <ProductList :products="products" :currentPage="currentPage" :totalPages="totalPages"
        @changePage="handlePageChange" />
    </div>
  </div>
</template>