<script setup>
import { reactive, ref, computed, onMounted } from 'vue'
import { useCartStore } from '@/stores/cart/cartStore'
import { loadStripe } from '@stripe/stripe-js'
import { useAuthStore } from '@/stores/auth'
import { ProfileStore } from '@/stores/Profile/ProfileStore'
import { OrderStore } from '@/stores/order/orderStore'
import router from '@/router'
import Alert from '@/components/BaseComponents/AlertPopup.vue'

const cartStore = useCartStore()
const store = ProfileStore()
const auth = useAuthStore()
const orderStore = OrderStore()

const stripePublicKey = import.meta.env.VITE_STRIPE_PUBLIC_KEY
const apiEndpoint = import.meta.env.VITE_API_ENDPOINT

const stripe = ref(null)
const cardElement = ref(null)
const elements = ref(null)
const processing = ref(false)

const cartProducts = computed(() => cartStore.products)
const totalPrice = computed(() => cartStore.totalPrice)

const shippingCost = computed(() => {
  if (cartProducts.value.length === 0 || totalPrice.value === 0) {
    return 0
  }
  return totalPrice.value > 75 ? 0 : 5.99
})

const discount = ref(0.0)

const totalPayable = computed(() => totalPrice.value + shippingCost.value - discount.value)

const billingDetails = reactive({
  firstName: '',
  lastName: '',
  email: '',
  address: '',
  address2: '',
  city: '',
  country: '',
  postcode: '',
  phone: '',
  additionalInfo: '',
  differentAddress: false
})

const showAlert = ref(false)
const alertData = reactive({
  type: 'success',
  title: 'Success',
  message: 'Your payment was successful!'
})

async function getProfile() {
  const response = await store.getProfile(auth.user.access_token)
  const responseUser = auth.user

  if (response.phoneNumber) {
    const splitPhoneNumber = response.phoneNumber.split('-')
    billingDetails.phone = splitPhoneNumber[1]
  }
  billingDetails.firstName = response.firstName || ''
  billingDetails.lastName = response.lastName || ''
  billingDetails.email = responseUser.email || ''
  billingDetails.address = response.street || ''
  billingDetails.region = response.region || ''
  billingDetails.city = response.city || ''
  billingDetails.country = response.country || ''
  billingDetails.postcode = response.postalCode || ''
}

getProfile()

const selectedPaymentMethod = ref('cod')

onMounted(async () => {
  if (!stripePublicKey) {
    return
  }

  stripe.value = await loadStripe(stripePublicKey)

  if (!stripe.value) {
    return
  }

  elements.value = stripe.value.elements()

  cardElement.value = elements.value.create('card')
  cardElement.value.mount('#card-element')

  cardElement.value.on('change', (event) => {
    const displayError = document.getElementById('card-errors')
    if (event.error) {
      displayError.textContent = event.error.message
    } else {
      displayError.textContent = ''
    }
  })
})

const handlePayment = async () => {
  if (selectedPaymentMethod.value === 'cod') {
    const products = []
    cartProducts.value.forEach((product) => {
      products.push({ id: product.id, quantity: product.quantity })
    })

    const newOrder = {
      status: 'Pending',
      totalPrice: cartStore.totalPrice,
      totalItems: cartStore.totalQuantity,
      orderItems: products,
      tracking: null,
      paid: false
    }

    try {
      const response = await orderStore.addOrder(auth.user.access_token, newOrder)
      if (!response || !response.id) {
        throw new Error('Failed to create order')
      }
      cartStore.clearCart()
      const orderId = response.id
      router.push({ path: '/order/success', query: { orderId } })
    } catch (error) {
      console.error('Error adding order:', error)
    }

    alertData.type = 'success'
    alertData.title = 'Order Placed'
    alertData.message = 'Order placed with Cash on Delivery.'
    showAlert.value = true
    return
  }

  if (selectedPaymentMethod.value === 'online') {
    processing.value = true

    const billingDetailsData = {
      name: `${billingDetails.firstName} ${billingDetails.lastName}`,
      email: billingDetails.email,
      address: {
        city: billingDetails.city,
        state: billingDetails.region,
        country: billingDetails.country,
        line1: billingDetails.street,
        postal_code: billingDetails.postcode
      },
      phone: billingDetails.phone
    }

    try {
      const amount = Math.round(totalPayable.value * 100)

      const response = await fetch(`${apiEndpoint}/payments/create-payment-intent`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${auth.user.access_token}`
        },
        body: JSON.stringify({
          amount: amount,
          currency: 'eur'
        })
      })

      if (!response.ok) {
        const errorResponse = await response.json()
        throw new Error(errorResponse.error.message || 'Failed to create PaymentIntent')
      }

      const { clientSecret } = await response.json()

      const result = await stripe.value.confirmCardPayment(clientSecret, {
        payment_method: {
          card: cardElement.value,
          billing_details: billingDetailsData
        }
      })

      if (result.error) {
        alertData.type = 'error'
        alertData.title = 'Payment Failed'
        alertData.message = `Payment failed: ${result.error.message}`
        showAlert.value = true
      } else if (result.paymentIntent.status === 'succeeded') {
        alertData.type = 'success'
        alertData.title = 'Payment Successful'
        alertData.message = 'Payment successful! Thank you for your purchase.'
        showAlert.value = true

        orderPayment(result.paymentIntent.payment_method_types[0] === 'card', 'Paid')
      }
    } catch (error) {
      alertData.type = 'error'
      alertData.title = 'Error'
      alertData.message = `An error occurred: ${error.message}`
      showAlert.value = true
    } finally {
      processing.value = false
    }
  }
}

async function orderPayment(isPaid, status) {
  const products = []
  cartProducts.value.forEach((product) => {
    products.push({ id: product.id, quantity: product.quantity })
  })

  const newOrder = {
    status: status,
    totalPrice: cartStore.totalPrice,
    totalItems: cartStore.totalQuantity,
    orderItems: products,
    tracking: null,
    paid: isPaid
  }

  try {
    const response = await orderStore.addOrder(auth.user.access_token, newOrder)
    if (!response || !response.id) {
      throw new Error('Failed to create order')
    }
    cartStore.clearCart()
    const orderId = response.id
    router.push({ path: '/order/success', query: { orderId } })
  } catch (error) {
    console.error('Error adding order:', error)
  }
}
</script>

<template>
  <div class="grid grid-cols-1 md:grid-cols-2 gap-8 p-6 lg:p-24">
    <div class="space-y-6">
      <h2 class="text-2xl font-semibold">Billing Details</h2>

      <div class="grid grid-cols-2 gap-4">
        <div>
          <input
            type="text"
            id="first-name"
            v-model="billingDetails.firstName"
            class="mt-1 block w-full rounded-md py-2.5 px-4 border-gray-300 border focus:ring-2 focus:ring-inset focus:outline-blueFunko-400/60 focus:ring-blueFunko-300/60 text-sm font-light"
            placeholder="First name*"
            required
          />
        </div>

        <div>
          <input
            type="text"
            id="last-name"
            v-model="billingDetails.lastName"
            class="mt-1 block w-full rounded-md py-2.5 px-4 border-gray-300 border focus:ring-2 focus:ring-inset focus:outline-blueFunko-400/60 focus:ring-blueFunko-300/60 text-sm font-light"
            placeholder="Last name*"
            required
          />
        </div>

        <div>
          <input
            type="email"
            id="email"
            v-model="billingDetails.email"
            class="mt-1 block w-full rounded-md py-2.5 px-4 border-gray-300 border focus:ring-2 focus:ring-inset focus:outline-blueFunko-400/60 focus:ring-blueFunko-300/60 text-sm font-light"
            placeholder="Email*"
            required
          />
        </div>

        <div>
          <input
            type="text"
            id="address"
            v-model="billingDetails.address"
            class="mt-1 block w-full rounded-md py-2.5 px-4 border-gray-300 border focus:ring-2 focus:ring-inset focus:outline-blueFunko-400/60 focus:ring-blueFunko-300/60 text-sm font-light"
            placeholder="Address*"
            required
          />
        </div>

        <div>
          <input
            type="text"
            id="city"
            v-model="billingDetails.city"
            class="mt-1 block w-full rounded-md py-2.5 px-4 border-gray-300 border focus:ring-2 focus:ring-inset focus:outline-blueFunko-400/60 focus:ring-blueFunko-300/60 text-sm font-light"
            placeholder="City / Town*"
            required
          />
        </div>

        <div>
          <input
            type="text"
            id="address2"
            v-model="billingDetails.region"
            class="mt-1 block w-full rounded-md py-2.5 px-4 border-gray-300 border focus:ring-2 focus:ring-inset focus:outline-blueFunko-400/60 focus:ring-blueFunko-300/60 text-sm font-light"
            placeholder="Region"
          />
        </div>

        <div>
          <input
            type="text"
            id="country"
            v-model="billingDetails.country"
            class="mt-1 block w-full rounded-md py-2.5 px-4 border-gray-300 border focus:ring-2 focus:ring-inset focus:outline-blueFunko-400/60 focus:ring-blueFunko-300/60 text-sm font-light"
            placeholder="Country*"
            required
          />
        </div>

        <div>
          <input
            type="text"
            id="postcode"
            v-model="billingDetails.postcode"
            class="mt-1 block w-full rounded-md py-2.5 px-4 border-gray-300 border focus:ring-2 focus:ring-inset focus:outline-blueFunko-400/60 focus:ring-blueFunko-300/60 text-sm font-light"
            placeholder="Postcode / ZIP*"
            required
          />
        </div>

        <!-- Phone -->
        <div>
          <input
            type="text"
            id="phone"
            v-model="billingDetails.phone"
            class="mt-1 block w-full rounded-md py-2.5 px-4 border-gray-300 border focus:ring-2 focus:ring-inset focus:outline-blueFunko-400/60 focus:ring-blueFunko-300/60 text-sm font-light"
            placeholder="Phone*"
            required
          />
        </div>
      </div>

      <div>
        <textarea
          id="additional-info"
          v-model="billingDetails.additionalInfo"
          class="mt-1 block w-full rounded-md py-2.5 h-52 px-4 border-gray-300 border focus:ring-2 focus:ring-inset focus:outline-blueFunko-400/60 focus:ring-blueFunko-300/60 text-sm font-light text-start"
          placeholder="Additional information"
        ></textarea>
      </div>
    </div>

    <div>
      <h2 class="text-2xl font-semibold">Your Order</h2>

      <div class="justify-between bg-slate-950 text-white flex px-8 py-4 rounded-t-xl mt-7">
        <p class="text-lg font-semibold">Product</p>
        <p class="text-lg font-semibold">Subtotal</p>
      </div>

      <div class="border-t border border-gray-300">
        <div
          v-for="product in cartProducts"
          :key="product.id"
          class="flex items-center justify-between border-gray-300 border-b pr-8 py-4"
        >
          <div class="flex items-center">
            <img
              :src="product.imageHash"
              :alt="product.name"
              class="h-24 w-24 rounded-md object-cover"
            />
            <div class="ml-4">
              <h4 class="text-base font-medium">{{ product.name }}</h4>
              <p class="text-sm text-gray-500">Qty: {{ product.quantity }}</p>
            </div>
          </div>
          <p class="text-base font-medium">{{ (product.price * product.quantity).toFixed(2) }}€</p>
        </div>
      </div>

      <div class="border border-gray-300">
        <div class="flex justify-between border-gray-300 px-8 py-3">
          <p class="font-regular text-md">Subtotal</p>
          <p class="font-medium text-md">{{ totalPrice.toFixed(2) }}€</p>
        </div>

        <div class="flex justify-between border-gray-300 px-8 py-3">
          <p class="font-regular text-md">Shipping cost (+)</p>
          <p class="font-medium text-md">{{ shippingCost.toFixed(2) }}€</p>
        </div>
      </div>

      <div class="rounded-b-xl flex justify-between border border-gray-300 px-8 py-6">
        <p class="font-regular text-md">Total</p>
        <p class="font-medium text-md text-green-700">{{ totalPayable.toFixed(2) }}€</p>
      </div>
      <div class="mt-10">
        <Alert
          v-if="showAlert"
          :type="alertData.type"
          :title="alertData.title"
          :message="alertData.message"
          @close="showAlert = false"
        />
      </div>
      <div class="mt-10">
        <div class="justify-between bg-slate-950 text-white flex px-8 py-4 rounded-t-xl">
          <h3 class="text-lg font-medium">Payment</h3>
        </div>
        <div class="border-gray-300 border py-10 px-14 rounded-b-xl">
          <div class="flex items-center">
            <input
              type="radio"
              id="cod"
              name="payment-method"
              v-model="selectedPaymentMethod"
              value="cod"
              class="h-4 w-4 text-blue-600 accent-blueFunko-700 border-gray-300"
            />
            <label for="cod" class="ml-2 block text-md font-light text-gray-900">
              Cash on Delivery
            </label>
          </div>

          <div class="flex items-center py-4">
            <input
              type="radio"
              id="online"
              name="payment-method"
              v-model="selectedPaymentMethod"
              value="online"
              class="h-4 w-4 text-blue-600 accent-blueFunko-700 border-gray-300"
            />
            <label for="online" class="ml-2 block text-md font-light text-gray-900">
              Online Gateway
            </label>
          </div>

          <p class="text-xs px-1 text-ultralight text-gray-700">Visa / MasterCard</p>

          <div
            v-show="selectedPaymentMethod === 'online'"
            id="card-element"
            class="mt-4 p-3 border border-gray-300 rounded-md"
          ></div>

          <div id="card-errors" role="alert" class="text-red-500 mt-2"></div>
        </div>
      </div>

      <div class="mt-10">
        <button
          @click="handlePayment"
          :disabled="processing"
          class="w-full bg-blueFunko-700 text-white font-semibold text-lg py-3 px-4 rounded-md hover:bg-blueFunko-800 disabled:opacity-50"
        >
          {{ processing ? 'Processing...' : 'Place an order' }}
        </button>
      </div>
    </div>
  </div>
</template>
