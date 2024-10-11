import { defineStore } from 'pinia';
import OrderService from './OrderService';
import { ref } from 'vue';

export const OrderStore = defineStore('orderStore', () => {
  const orders = ref([])
  const currentPage = ref(0)
  const pageSize = ref(8)
  const totalPages = ref(0)
  const error = ref(null)
  const isLoading = ref(false)

  async function fetchAllOrdersByUser(accessToken, page = this.currentPage, size = this.pageSize) {
    isLoading.value = true
    error.value = null

    try {
      const params = { page, size }
      const service = new OrderService();
      const response = await service.fetchAllOrdersByUser(accessToken, params)

      orders.value = response.content || []
      currentPage.value = response.number || 0
      totalPages.value = response.totalPages || 1
    } catch (err) {
      error.value = 'Error al obtener los pedidos.'
      console.error('Error: ', err)
    } finally {
      isLoading.value = false
    }
  }

  async function fetchAllOrdersByAdmin(accessToken, page = 0, size = 8) {
    isLoading.value = true
    error.value = null

    try {
      const params = { page, size }
      const service = new OrderService()
      const response = await service.fetchAllOrdersByAdmin(accessToken, params)

      orders.value = response.content || []
      currentPage.value = response.number || 0
      totalPages.value = response.totalPages || 1
    } catch (err) {
      error.value = 'Error al obtener los pedidos.'
      console.error('Error: ', err)
    } finally {
      isLoading.value = false
    }
  }

  return { error, isLoading, currentPage, orders, pageSize, totalPages, fetchAllOrdersByUser, fetchAllOrdersByAdmin }
});
