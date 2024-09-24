<script setup>
import { defineProps, computed } from 'vue';
import ReviewIcon from './ReviewIcon.vue';
import FavoriteIcon from './FavoriteIcon.vue';
import BadgeCard from './BadgeCard.vue';
import ProductModal from './../ProductDetail/ProductModal.vue';

const props = defineProps({
  product: {
    type: Object,
    required: true,
  },
});

// const productImage = computed(() => {
//   if (!props.product.image) return '';
//   return props.product.image.startsWith('http')
//     ? props.product.image
//     : new URL(`../assets/img/CardImage/${props.product.image}`, import.meta.url).href;
// });

const discountedPrice = computed(() => {
  if (props.product.discount && props.product.discount.isActive) {
    const discountAmount = props.product.price * (props.product.discount.percentage / 100);
    return (props.product.price - discountAmount).toFixed(2);
  }
  return props.product.price.toFixed(2);
});
</script>

<template>
  <div class="relative flex flex-col my-6 bg-white shadow-sm border border-slate-200 rounded-lg w-64">
    <div class="flex justify-between pt-3 px-3">
      <BadgeCard
        :percentage="product.discount?.percentage"
        :is-active="product.discount?.isActive"
        :is-available="product.isAvailable"
      />
      <FavoriteIcon />
    </div>
    <div class="relative p-2 h-60 overflow-hidden rounded-xl bg-clip-border">
      <!-- <img
        :src="productImage"
        alt="product image"
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
        <p v-if="product.discount && product.discount.isActive" class="text-red-500 text-sm font-semibold">
            ${{ discountedPrice }}
          </p>
          <p v-if="product.discount && product.discount.isActive" class="line-through text-gray-500 text-xs">
            ${{ product.price.toFixed(2) }}
          </p>
          <p v-else class="text-black text-sm font-semibold">
            ${{ product.price.toFixed(2) }}
          </p>
        <ProductModal :product="product" />
      </div>
    </div>
  </div>
</template>
