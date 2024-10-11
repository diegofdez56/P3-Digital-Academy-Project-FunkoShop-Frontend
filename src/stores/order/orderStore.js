import { defineStore } from 'pinia';
import OrderService from './OrderService';

export const OrderStore = defineStore('orderStore', () => {

  function addOrder(accessToken, order) {
    try {
      const service = new OrderService()
      return service.addOrder(accessToken, order)
    } catch (error) {
      console.error('Error: ', error);
    }
  }

  return { addOrder }
});
