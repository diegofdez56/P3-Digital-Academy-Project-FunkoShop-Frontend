<script setup>
import ReviewIcon from './ReviewIcon.vue'
import FavoriteIcon from './FavoriteIcon.vue'
import BadgeCard from './BadgeCard.vue'
import ProductModal from './../ProductDetail/ProductModal.vue'

defineProps({
  product: {
    type: Object,
    required: true
  }
})

// import { computed } from 'vue';

// const productImage = computed(() => {
//   if (!props.product.image) return '';
//   return props.product.image.startsWith('http')
//     ? props.product.image
//     : new URL(`../assets/img/CardImage/${props.product.image}`, import.meta.url).href;
// });
</script>

<template>
  <div
    class="relative flex flex-col my-6 bg-white shadow-sm border border-slate-200 rounded-lg w-64"
  >
    <div class="flex justify-between pt-3 px-3">
      <BadgeCard />
      <FavoriteIcon />
    </div>
    <div class="relative p-2 h-60 overflow-hidden rounded-xl bg-clip-border">
      <img
        src="/src/assets/img/CardImage/Groot.png"
        alt="card-image"
        class="h-full w-full object-cover rounded-md"
      />
      <!-- <img src="productImage" alt="product image" class="h-full w-full object-cover rounded-md" /> -->
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
        <ProductModal />
      </div>
    </div>
  </div>
</template>
