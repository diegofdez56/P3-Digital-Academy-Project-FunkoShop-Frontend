<script setup>
import ReviewIcon from './ReviewIcon.vue';
import FavoriteIcon from './FavoriteIcon.vue';
import BadgeCard from './BadgeCard.vue'
import ProductModal from './../ProductDetail/ProductModal.vue'
import { useProductModal } from '/src/composables/useProductModal.js'
import { computed } from 'vue'
import { ArrowsPointingOutIcon, ShoppingCartIcon } from '@heroicons/vue/24/outline';
import { useCartStore } from '@/stores/cart/cartStore';
// import { FavoriteStore } from '/src/store/favorite/favoriteStore.js'

const props = defineProps({
  product: {
    type: Object,
    required: true
  }
})

const { isModalOpen, openModal, closeModal } = useProductModal()
const cartStore = useCartStore()


const discountedPrice = computed(() => {
  if (props.product.discount && props.product.discount > 0) {
    const discountAmount = props.product.price * (props.product.discount / 100);
    return (props.product.price - discountAmount).toFixed(2);
  }
  return props.product.price.toFixed(2);
});

const productImageUrl = computed(() => {
  if (props.product.imageHash) {

    const isBase64 = props.product.imageHash.startsWith('/') || props.product.imageHash.includes('base64');

    if (isBase64) {
      return `data:image/png;base64,${props.product.imageHash}`;
    } else {
      return props.product.imageHash;
    }
  }
  return '';
});

const addToCart = () => {
  if (1 <= props.product.stock) {
    const productToAdd = {
      id: props.product.id,
      name: props.product.name,
      price: discountedPrice.value,
      imageHash: props.product.imageHash
    }
    cartStore.addProduct(productToAdd, 1)
  } else {
    console.error('Quantity exceeds stock')
  }
}
</script>

<template>
  <div class="relative flex flex-col my-6 bg-white shadow-sm border border-slate-200 rounded-lg w-64">
    <div class="flex justify-between pt-3 px-3">
      <div class="w-full flex place-items-center justify-between">
        <BadgeCard :id="product.name" :stock="product.stock" :isDiscount="product.discount > 0 ? true : false"
          :discount="product.discount > 0 ? product.discount : 0" :isNew="product.isNew" />
        <FavoriteIcon :productId="product.id" />
      </div>
    </div>
    <div class="relative flex justify-center items-center p-2 h-60 overflow-hidden rounded-xl bg-clip-border">
      <img :src="productImageUrl ? productImageUrl : 'https://iili.io/2HTt1PR.jpg'" alt="product image" class="h-[230px] w-[230px] object-cover rounded-md cursor-pointer"
        @click="openModal" />
    </div>
    <div>
      <ReviewIcon :average="Math.round(product.averageRating)" />
    </div>
    <div class="p-3">
      <p class="text-slate-600 leading-normal font-light text-xs">
        {{ product.category?.name || 'Category' }}
      </p>
      <div class="mb-2 flex items-center justify-between">
        <p class="text-slate-800 text-md font-semibold">{{ product.name }}</p>
      </div>
      <div class="flex justify-between items-center">
        <div>
          <p v-if="product.discount && product.discount > 0" class="line-through text-gray-500 text-sm">
            {{ product.price.toFixed(2) }}€
          </p>
          <p v-if="product.discount && product.discount > 0" class="text-red-600 text-base font-semibold">
            {{ discountedPrice }}€
          </p>

          <p v-else class="text-black text-base font-semibold">{{ product.price.toFixed(2) }}€</p>
        </div>
        <div>
          <button @click="addToCart" class="px-2 py-2 mr-2 bg-gray-200 text-white rounded hover:bg-gray-300">
            <ShoppingCartIcon class="size-6 text-black" />
          </button>
          <button @click="openModal" class="px-2 py-2 bg-gray-200 text-white rounded hover:bg-gray-300">
            <ArrowsPointingOutIcon class="size-6 text-black" />
          </button>
        </div>
      </div>
    </div>

    <ProductModal :isOpen="isModalOpen" @close="closeModal" :product="product" />
  </div>
</template>
