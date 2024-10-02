<script setup>
import { ref, onMounted } from 'vue'
import { useProductStore } from '@/stores/productStore'
import { storeToRefs } from 'pinia'
import BaseTable from '@/components/AdminDashboard/AdminTables/BaseTable.vue'
import ProductTableRow from './ProductTableRow.vue'
import BasePagination from '@/components/BaseComponents/BasePagination.vue'
import ConfirmDeleteModal from '../AdminModals/ConfirmDeleteModal.vue'

const productStore = useProductStore()

const {
  products,
  currentPage,
  totalPages,
  isLoading: productLoading,
  error: productError
} = storeToRefs(productStore)

const itemsPerPage = 10
const showDeleteModal = ref(false)
const productToDelete = ref(null)

const fetchProducts = (page = currentPage.value, size = itemsPerPage) => {
  productStore.fetchAllProducts(page, size, 'createdAt', 'desc')
}

onMounted(() => {
  fetchProducts()
})

const refreshProducts = () => {
  fetchProducts()
}

defineExpose({
  refreshProducts
})

const handlePageChange = (newPage) => {
  productStore.fetchAllProducts(newPage, itemsPerPage, 'createdAt', 'desc')
}

const handleEdit = (product) => {
  console.log('Editing product:', product)
}

const handleDeleteClick = (productId) => {
  productToDelete.value = productId
  showDeleteModal.value = true
}

const confirmDelete = async () => {
  await productStore.deleteProduct(productToDelete.value)
  fetchProducts()
  closeModal()
}

const closeModal = () => {
  showDeleteModal.value = false 
  productToDelete.value = null
}

</script>

<template>
  <div v-if="productLoading" class="flex justify-center">
    <p>Loading products...</p>
  </div>

  <div v-else-if="productError" class="text-center mt-2 text-red-500">
    <p>Error: {{ productError }}</p>
  </div>

  <div v-else>
    <BaseTable :headers="['Name', 'Category','Stock', 'Discount', 'Actions']">
      <ProductTableRow 
        v-for="product in products" 
        :key="product.id" 
        :product="product"
        @edit="handleEdit"
        @delete="handleDeleteClick"
      />
    </BaseTable>

    <BasePagination
      :currentPage="currentPage"
      :totalPages="totalPages"
      @changePage="handlePageChange"
    />

    <ConfirmDeleteModal 
      v-if="showDeleteModal" 
      @confirm="confirmDelete"
      @click.self="closeModal" 
      @cancel="closeModal"
    />
  </div>
</template>
