<script setup>
import CheckoutPayment from '@/components/Checkout/CheckoutPayment.vue'
</script>

<template>
  <main class="py-16">
    <div class="mx-auto max-w-full lg:mx-0 text-start px-24">
      <h2 class="text-3xl font-semibold tracking-tight text-dark sm:text-4xl">Checkout</h2>
      <p class="mt-2 text-lg leading-8 text-gray-500">There are 3 products in your cart</p>
    </div>
    <CheckoutPayment />
  </main>
</template>
