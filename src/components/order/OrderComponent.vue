<template>
    <div>
      <button @click="fetchOrders">Fetch Orders</button>
      <div v-if="orderStore.loading">Loading...</div>
      <div v-if="orderStore.error">Error: {{ orderStore.error }}</div>
      <ul v-if="orderStore.orders.length">
        <li v-for="order in orderStore.orders" :key="order.id">{{ order }}</li>
      </ul>
      <div v-else>No orders found</div>
    </div>
  </template>
  
  <script setup>
  import { useOrderStore } from '../../stores/order/orderStoreNOP.js';
  import { onMounted } from 'vue';
  
  const orderStore = useOrderStore();
  
  const fetchOrders = () => {
    orderStore.fetchAllOrders();
  };
  
  onMounted(() => {
    fetchOrders();
  });
  </script>
  