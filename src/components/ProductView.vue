<script setup>
import { onMounted } from 'vue'
import { useProductStore } from '../stores/productStore'
import { useCategoryStore } from '../stores/category/categoryStore'
import { storeToRefs } from 'pinia'
import ProductList from './../components/Products/ProductList.vue'
import SearchComponent from './../components/NavBar/SearchButton.vue' // Importa el componente de búsqueda

const productStore = useProductStore()
const categoryStore = useCategoryStore()

const {
  products,
  isLoading: productLoading,
  error: productError,
  currentPage,
  totalPages,
  selectedCategory
} = storeToRefs(productStore)

const { categories, isLoading: categoryLoading, error: categoryError } = storeToRefs(categoryStore)

// Cargar categorías y productos al montar el componente
onMounted(() => {
  categoryStore.fetchCategories()
  productStore.fetchAllProducts()
})

// Manejador para cambiar de página
const handlePageChange = (newPage) => {
  productStore.fetchAllProducts(newPage)
}

// Manejador para cambiar de categoría
const handleCategoryChange = (category) => {
  productStore.setCategory(category)
}

// Manejador del término de búsqueda
const handleSearch = (searchQuery) => {
  productStore.searchProductsByKeyword(searchQuery) // Llama al método de búsqueda con el término proporcionado
}
</script>

<template>
  <div class="min-h-screen">
    <!-- Componente de búsqueda -->
    <SearchComponent @onSearch="handleSearch" />

    <!-- Categorías -->
    <div v-if="!categoryLoading && !categoryError" class="flex flex-wrap justify-center my-4">
      <button
        v-for="category in categories"
        :key="category.id"
        @click="handleCategoryChange(category)"
        :class="[
          'px-4 py-2 m-2 rounded',
          category.id === selectedCategory.id
            ? 'bg-blue-600 text-white'
            : 'bg-gray-200 text-gray-700'
        ]"
      >
        {{ category.name }}
      </button>
    </div>
    <div v-else-if="categoryLoading" class="text-center mt-2">
      <p>Loading categories...</p>
    </div>
    <div v-else-if="categoryError" class="text-center mt-2 text-red-500">
      <p>Error: {{ categoryError }}</p>
    </div>

    <!-- Productos -->
    <div v-if="productLoading" class="text-center mt-2">
      <p>Loading products...</p>
    </div>
    <div v-else-if="productError" class="text-center mt-2 text-red-500">
      <p>Error: {{ productError }}</p>
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
