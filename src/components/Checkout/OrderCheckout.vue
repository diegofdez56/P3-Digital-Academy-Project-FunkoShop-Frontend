<script setup>
import { useCartStore } from '@/stores/cart/cartStore';

const cartStore = useCartStore();

const products = cartStore.products;

const totalPrice = Number(cartStore.totalPrice) || 0;

const shippingCost = totalPrice >= 50 ? 'Gratis' : 5.99;

const totalPayable = totalPrice + (totalPrice >= 50 ? 0 : shippingCost);
</script>
<template>

    <h2 class="text-2xl font-semibold">Your Order</h2>
    <div class="justify-between bg-slate-950 text-white flex px-8 py-4 rounded-t-xl mt-7">
        <p class="text-lg font-semibold">Product</p>
        <p class="text-lg font-semibold">Subtotal</p>
    </div>
    <div class="border-t border border-gray-300">
        <div v-for="product in products" :key="product.id"
            class="flex items-center justify-between border-gray-300 border-b pr-8 py-4">
            <div class="flex items-center">
                <img :src="product.imageSrc" :alt="product.imageAlt" class="h-24 w-24 rounded-md object-cover" />
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
            <p class="font-medium text-md">{{ typeof shippingCost === 'string' ? shippingCost : shippingCost.toFixed(2) + '€' }}</p>
        </div>
        <div class="flex justify-between border-gray-300 px-8 py-3">
            <p class="font-regular text-md">Discount (-)</p>
            <p class="font-medium text-md text-red-600">-09.00€</p>
        </div>
    </div>
    <div class="rounded-b-xl flex justify-between border border-gray-300 px-8 py-6">
        <p class="font-regular text-md">Total Payable</p>
        <p class="font-medium text-md text-green-700">{{ totalPayable.toFixed(2) }}€</p>
    </div>

</template>