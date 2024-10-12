<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { useAuthStore } from '@/stores/auth'

const { t } = useI18n()
const route = useRoute()

const order = ref(null)
const auth = useAuthStore()

onMounted(async () => {
  const orderId = route.query.orderId
  if (orderId) {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_ENDPOINT}/orders/${orderId}`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${auth.user.access_token}`
        }
      })

      if (!response.ok) {
        throw new Error('Error al recuperar la orden.')
      }

      order.value = await response.json()
    } catch (error) {
      console.error('Error:', error)
    }
  }
})
</script>

<template>
  <div v-if="order" class="flex flex-col items-center justify-center mt-52 mb-52">
    <img src="@/assets/icons/SuccessIcon.svg" alt="Success Icon" class="w-24 h-24" />

    <h1 class="text-3xl font-semibold text-center mt-4">{{ t('Payment Successful') }}</h1>
    <p class="text-center text-gray-700 mt-2">
      {{ t('Your payment has been processed successfully.') }}
    </p>

    <div class="bg-white border border-gray-300 rounded-lg p-6 mt-6 w-full max-w-md">
      <h2 class="text-lg font-semibold mb-4 text-center">{{ t('Order Details') }}</h2>
      <div class="w-full border-t border-gray-300 mb-4"></div>

      <div class="flex justify-between mb-2">
        <div>
          <p class="text-sm font-medium text-gray-500">{{ t('Order Number') }}:</p>
          <p class="text-sm text-gray-600">{{ order.id }}</p>
        </div>
        <div class="text-right">
          <p class="text-sm font-medium text-gray-500">{{ t('Total Amount') }}:</p>
          <p class="text-sm text-gray-600">{{ order.totalPrice }}€</p>
        </div>
      </div>
    </div>

    <div class="flex justify-between mt-4">
      <button class="bg-blue-500 px-4 py-2 text-white rounded mx-2">Return to Homepage</button>
      <button class="bg-blue-500 px-4 py-2 text-white rounded mx-2">Going to My Orders</button>
    </div>
  </div>

  <div v-else class="flex justify-center items-center mt-52">
    <p class="text-center text-gray-700">{{ t('loadingOrder') }}</p>
  </div>
</template>
