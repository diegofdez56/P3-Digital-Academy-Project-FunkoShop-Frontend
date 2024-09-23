<script setup>
import { defineProps, defineEmits } from 'vue';
import FunkoCard from './Cards/FunkoCard.vue';

defineProps({
  products: {
    type: Array,
    required: true,
  },
  currentPage: {
    type: Number,
    required: true,
  },
  totalPages: {
    type: Number,
    required: true,
  },
});

const emits = defineEmits(['changePage']);

const goToPage = (page) => {
  emits('changePage', page);
};
</script>

<template>
  <div>
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
      <FunkoCard
        v-for="product in products"
        :key="product.productId"
        :product="product"
        class="mx-auto"
      />
    </div>

    <div class="flex justify-center my-6">
      <button
        @click="goToPage(currentPage - 1)"
        :disabled="currentPage === 0"
        class="px-4 py-2 mx-2 bg-gray-200 rounded disabled:opacity-50"
      >
        Previous
      </button>
      <span class="mx-2">Page {{ currentPage + 1 }} of {{ totalPages }}</span>
      <button
        @click="goToPage(currentPage + 1)"
        :disabled="currentPage + 1 >= totalPages"
        class="px-4 py-2 mx-2 bg-gray-200 rounded disabled:opacity-50"
      >
        Next
      </button>
    </div>
  </div>
</template>
