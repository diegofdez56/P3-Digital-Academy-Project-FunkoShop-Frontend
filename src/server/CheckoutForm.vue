<script setup>
import { ref, onMounted } from 'vue';
import { loadStripe } from '@stripe/stripe-js';
import { useAuthStore } from '@/stores/auth';

const props = defineProps({
    isOpen: {
        type: Boolean,
        default: false
    },
    products: {
        type: Array,
        default: () => [],
    },
});

const emit = defineEmits(['close']);
const auth = useAuthStore();

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);
const error = ref('');
const success = ref(false);
const loading = ref(false);
let stripe;
let elements;
let cardElement;

onMounted(async () => {
    stripe = await stripePromise;
    elements = stripe.elements();
    cardElement = elements.create('card');
    cardElement.mount('#card-element');
});

const handleSubmit = async () => {
    loading.value = true;
    error.value = '';
    success.value = false;

    const totalAmount = props.products.reduce((total, product) => total + product.price * product.quantity, 0);

    try {
        const response = await fetch(`${import.meta.env.VITE_API_ENDPOINT}/payments/create-payment-intent`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authentication': `Bearer ${auth.user.access_token}`,
            },
            body: JSON.stringify({ amount: totalAmount * 100 }),
        });

        const { client_secret } = await response.json();

        const result = await stripe.confirmCardPayment(client_secret, {
            payment_method: {
                card: cardElement,
            },
        });

        if (result.error) {
            error.value = result.error.message;
        } else {
            if (result.paymentIntent.status === 'succeeded') {
                success.value = true;
                emit('close'); 
            }
        }
    } catch (err) {
        error.value = 'An error occurred. Please try again.';
    } finally {
        loading.value = false;
    }
};

const handleClose = () => {
    emit('close');
};
</script>

<template>
  <div v-if="isOpen" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div class="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
      <h2 class="text-lg font-bold mb-4">Checkout</h2>
      <form @submit.prevent="handleSubmit">
        <div id="card-element" class="mb-4 border p-3 rounded shadow-sm"></div>
        <button type="submit" :disabled="loading" class="bg-blue-500 text-white p-3 rounded w-full">
          Pay
        </button>
        <div v-if="error" class="text-red-500 mt-2">{{ error }}</div>
        <div v-if="success" class="text-green-500 mt-2">Payment successful!</div>
      </form>
      <button @click="handleClose" class="mt-4 text-gray-500 hover:text-gray-700 w-full">
        Close
      </button>
    </div>
  </div>
</template>