<script setup>
import { onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import BaseTable from '@/components/AdminDashboard/AdminTables/BaseTable.vue'
import BasePagination from '@/components/BaseComponents/BasePagination.vue'
import { OrderStore } from '@/stores/order/orderStore'
import { useAuthStore } from '@/stores/auth'
import OrdersTableRow from './OrdersTableRow.vue'

const ordersStore = OrderStore()
const auth = useAuthStore()

const {
  orders,
  currentPage,
  totalPages,
  isLoading,
  error
} = storeToRefs(ordersStore)

const fetchAllOrdersByAdmin = () => {
  ordersStore.fetchAllOrdersByAdmin(auth.user.access_token)
}

onMounted(() => {
  fetchAllOrdersByAdmin()
})

const refreshOrders = () => {
  fetchAllOrdersByAdmin()
}

defineExpose({
  refreshOrders
})

const handlePageChange = (newPage) => {
  ordersStore.fetchAllOrdersByAdmin(auth.user.access_token, newPage)
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
      <OrdersTableRow
        v-for="order in orders" 
        :key="order.id" 
        :order="order"
      />
    </BaseTable>

    <BasePagination
      :currentPage="currentPage"
      :totalPages="totalPages"
      @changePage="handlePageChange"
    />
  </div>
</template>
