import { defineStore } from 'pinia';
import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_ENDPOINT

const api = axios.create({
    baseURL: BASE_URL,
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Basic " + localStorage.getItem("token")
    },
  });

export const useOrderStore = defineStore('orderStore', {
  state: () => ({
    orders: [],
    order: null,
    loading: false,
    error: null,
  }),

  actions: {
    async fetchAllOrders() {
      this.loading = true;
      this.error = null;
      try {
        const response = await api.get("/orders");
        this.orders = response.data;
        this.error = null;
      } catch (error) {
        this.error = 'Failed to fetch orders';
      } finally {
        this.loading = false;
      }
    },

    async fetchOrderById(id) {
      this.loading = true;
      this.error = null;
      try {
        const response = await api.get(`/orders/${id}`);
        this.order = response.data;
        this.error = null;
      } catch (error) {
        this.error = `Failed to fetch order with ID ${id}`;
      } finally {
        this.loading = false;
      }
    },

    async createOrder(orderData) {
      this.loading = true;
      this.error = null;
      try {
        const response = await api.post("/orders", orderData);
        this.orders.push(response.data);
        this.error = null;
      } catch (error) {
        this.error = 'Failed to create order';
      } finally {
        this.loading = false;
      }
    },

    async updateOrder(id, orderData) {
      this.loading = true;
      this.error = null;
      try {
        const response = await api.put(`/orders/${id}`, orderData);
        const index = this.orders.findIndex(order => order.id === id);
        if (index !== -1) {
          this.orders[index] = response.data;
        }
        this.error = null;
      } catch (error) {
        this.error = `Failed to update order with ID ${id}`;
      } finally {
        this.loading = false;
      }
    },

    async deleteOrder(id) {
      this.loading = true;
      this.error = null;
      try {
        await api.delete(`/orders/${id}`);
        this.orders = this.orders.filter(order => order.id !== id);
        this.error = null;
      } catch (error) {
        this.error = `Failed to delete order with ID ${id}`;
      } finally {
        this.loading = false;
      }
    },

    async fetchOrdersByUser(userId) {
      this.loading = true;
      try {
        const response = await api.get(`/orders/user/${userId}`);
        this.orders = response.data;
        this.error = null;
      } catch (error) {
        this.error = `Failed to fetch orders for user with ID ${userId}`;
      } finally {
        this.loading = false;
      }
    },

    // Order Items

    async addOrderItemToOrder(orderId, orderItemData) {
      this.loading = true;
      this.error = null;
      try {
        const response = await api.post(`/orders/${orderId}/items`, orderItemData);
        const index = this.orders.findIndex(order => order.id === orderId);
        if (index !== -1) {
          this.orders[index].items.push(response.data); 
        }
        this.error = null;
      } catch (error) {
        this.error = `Failed to add order item to order with ID ${orderId}`;
      } finally {
        this.loading = false;
      }
    },

    async removeOrderItemFromOrder(orderId, orderItemId) {
      this.loading = true;
      this.error = null;
      try {
        await api.delete(`/orders/${orderId}/items/${orderItemId}`);
        const index = this.orders.findIndex(order => order.id === orderId);
        if (index !== -1) {
          this.orders[index].items = this.orders[index].items.filter(item => item.id !== orderItemId);
        }
        this.error = null;
      } catch (error) {
        this.error = `Failed to remove order item with ID ${orderItemId} from order with ID ${orderId}`;
      } finally {
        this.loading = false;
      }
    }
  }
});