<script setup>
import { onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import BaseTable from '@/components/AdminDashboard/AdminTables/BaseTable.vue'
import BasePagination from '@/components/BaseComponents/BasePagination.vue'
import OrderTableRow from './OrderTableRow.vue'
import { useAuthStore } from '@/stores/auth'
import { OrderStore } from '@/stores/order/orderStore'

const auth = useAuthStore()
const orderStore = OrderStore()

const { orders, currentPage, totalPages, isLoading, error } = storeToRefs(orderStore)

async function fetchOrders() {
  try {
    await orderStore.fetchAllOrdersByUser(auth.user.access_token, currentPage.value)
  } catch (err) {
    console.error('Error fetching orders:', err)
  }
}

onMounted(() => {
  fetchOrders()
})

async function handlePageChange(newPage) {
  try {
    await orderStore.fetchAllOrdersByUser(auth.user.access_token, newPage)
  } catch (err) {
    console.error('Error fetching orders:', err)
  }
}
</script>

<template>
  <div v-if="isLoading" class="flex justify-center">
    <p>Loading orders...</p>
  </div>
  <div v-else-if="error" class="text-center mt-2 text-red-500">
    <p>Error: {{ error }}</p>
  </div>
  <div v-else>
    <BaseTable :headers="['Status', 'Order ID', 'Total Items', 'Total Price', 'Details']">
      <OrderTableRow v-for="order in orders" :key="order.order_id" :order="order" />
    </BaseTable>
    <BasePagination
      v-if="totalPages > 1"
      :currentPage="currentPage"
      :totalPages="totalPages"
      @changePage="handlePageChange"
    />
  </div>
</template>
