<script setup>
import { onMounted, ref } from 'vue';
import { useProductStore } from '../stores/productStore';
import { storeToRefs } from 'pinia';
import ProductList from './../components/Products/ProductList.vue';
import { CategoryStore } from '@/stores/category/categoryStore';

const productStore = useProductStore();

const listCategoryStore = CategoryStore();
const listCategories = ref([]);

const {
  products,
  isLoading: productLoading,
  error: productError,
  currentPage,
  totalPages,
  selectedCategory,
} = storeToRefs(productStore);

const {
  isLoading: categoryLoading,
  error: categoryError,
} = storeToRefs(CategoryStore);

async function getCategories() {
  const response = await listCategoryStore.getCategories();
  listCategories.value = [{ id: null, name: 'All' }, ...response]; ; 
}

onMounted(() => {
  productStore.fetchAllProducts();
  getCategories();
});

const handlePageChange = (newPage) => {
  productStore.fetchAllProducts(newPage);
};

const handleCategoryChange = (category) => {
  productStore.setCategory(category);
};
</script>

<template>
  <div class="min-h-screen">
    <div v-if="!categoryLoading && !categoryError" class="flex flex-wrap justify-center my-4">
      <button
        v-for="category in listCategories"
        :key="category.id"
        @click="handleCategoryChange(category)"
        :class="[
          'px-4 py-2 m-2 rounded',
          category.id === selectedCategory.id ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700',
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
