<script setup>
import ReviewIcon from './ReviewIcon.vue';
import FavoriteIcon from './FavoriteIcon.vue';
import BadgeCard from './BadgeCard.vue';
import ProductModal from './../ProductDetail/ProductModal.vue';
import { useProductModal } from '/src/composables/useProductModal.js';

const props = defineProps({
  product: {
    type: Object,
    required: true
  }
});

const { isModalOpen, openModal, closeModal } = useProductModal();

/* const productImage = computed(() => {
  if (!props.product.image) return '';
  return props.product.image.startsWith('http')
    ? props.product.image
    : new URL(`../assets/img/CardImage/${props.product.image}`, import.meta.url).href;
}); */
</script>

<template>
  <div class="relative flex flex-col my-6 bg-white shadow-sm border border-slate-200 rounded-lg w-64">
    <div class="flex justify-between pt-3 px-3">
      <BadgeCard />
      <FavoriteIcon />
    </div>
    <div class="relative p-2 h-60 overflow-hidden rounded-xl bg-clip-border">
      <!-- <img
        :src="productImage"
        alt="card-image"
        class="h-full w-full object-cover rounded-md"
      /> -->
      <img src='../../assets/img/CardImage/Groot.png' alt="product image"
        class="h-full w-full object-cover rounded-md" />
    </div>
    <div>
      <ReviewIcon />
    </div>
    <div class="p-3">
      <p class="text-slate-600 leading-normal font-light text-xs">
        {{ product.category?.name || 'Category' }}
      </p>
      <div class="mb-2 flex items-center justify-between">
        <p class="text-slate-800 text-md font-semibold">{{ product.name }}</p>
      </div>
      <div class="flex justify-between items-center">
        <p class="text-black text-sm font-semibold">
          ${{ product.price ? product.price.toFixed(2) : '0.00' }}
        </p>
        <button @click="openModal" class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
          Ver Detalles
        </button>
      </div>
    </div>

    <ProductModal :isOpen="isModalOpen" @close="closeModal" :product="product" />
  </div>
</template>
