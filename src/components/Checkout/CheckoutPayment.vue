<script setup>
import OrderCheckout from './OrderCheckout.vue';
import BillingDetails from './BillingDetails.vue';
</script>

<template>
  <div class="grid grid-cols-1 md:grid-cols-2 gap-8 p-6 lg:p-24">
    <div class="space-y-6">
      <h2 class="text-2xl font-semibold">Billing Details</h2>
      <BillingDetails />
      
    </div>
    <div>
      <OrderCheckout />

      <div class="mt-10">
        <div class="justify-between bg-slate-950 text-white flex px-8 py-4 rounded-t-xl">
          <h3 class="text-lg font-medium">Payment</h3>
        </div>
        <div class="border-gray-300 border py-10 px-14 rounded-b-xl">
          <div class="flex items-center">
            <input type="radio" id="cod" name="payment-method"
              class="h-4 w-4 text-blue-600 accent-blueFunko-700 border-gray-300" />
            <label for="cod" class="ml-2 block text-md font-light text-gray-900">Cash on Delivery</label>
          </div>
          <div class="flex items-center py-4">
            <input type="radio" id="online" name="payment-method"
              class="h-4 w-4 text-blue-600 accent-blueFunko-700 border-gray-300" />
            <label for="online" class="ml-2 block text-md font-light text-gray-900">Online Gateway</label>
          </div>
          <p class="text-xs px-1 text-ultralight text-gray-700">Paypal / Visa / MasterCard</p>
        </div>
      </div>

      <div class="mt-10">
        <button
          class="w-full bg-blueFunko-700 text-white text-semibold text-lg py-3 px-4 rounded-md hover:bg-blueFunko-800">
          Place an order
        </button>
      </div>
    </div>
  </div>
</template>
