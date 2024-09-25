<script setup>
import { onMounted } from 'vue'
import { useProductStore } from '@/stores/productStore'
import { storeToRefs } from 'pinia'
import BaseTable from '@/components/AdminDashboard/AdminTables/BaseTable.vue'
import ProductTableRow from './ProductTableRow.vue'
import BasePagination from '@/components/BaseComponents/BasePagination.vue'

const productStore = useProductStore()

const {
  products,
  currentPage,
  totalPages,
  isLoading: productLoading,
  error: productError
} = storeToRefs(productStore)

const itemsPerPage = 2

onMounted(() => {
  productStore.fetchAllProducts(currentPage.value, itemsPerPage)
})

const handlePageChange = (newPage) => {
  productStore.fetchAllProducts(newPage, itemsPerPage)
}

const handleEdit = (product) => {
  console.log('Editing product:', product)
}

const handleDelete = async (productId) => {
  await productStore.deleteProduct(productId)
  productStore.fetchAllProducts(currentPage.value, itemsPerPage)
}

console.log(products);
</script>

<template>
  <div v-if="productLoading" class="flex justify-center">
    <p>Loading products...</p>
  </div>

  <div v-else-if="productError" class="text-center mt-2 text-red-500">
    <p>Error: {{ productError }}</p>
  </div>

  <div v-else>
    <BaseTable :headers="['Name', 'Category', 'Rating', 'Stock', 'Discount', 'Available', 'Actions']">
      <ProductTableRow 
        v-for="product in products" 
        :key="product.id" 
        :product="product"
        @edit="handleEdit"
        @delete="handleDelete"
      />
    </BaseTable>

    <BasePagination
      :currentPage="currentPage"
      :totalPages="totalPages"
      @changePage="handlePageChange"
    />
  </div>
</template>
