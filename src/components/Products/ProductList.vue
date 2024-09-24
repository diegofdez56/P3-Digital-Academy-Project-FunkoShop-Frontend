<script setup>
import { defineProps, defineEmits } from 'vue'
import FunkoCard from './../Cards/FunkoCard.vue'

defineProps({
  products: {
    type: Array,
    required: true
  },
  currentPage: {
    type: Number,
    required: true
  },
  totalPages: {
    type: Number,
    required: true
  }
})

const emits = defineEmits(['changePage'])

const goToPage = (page) => {
  emits('changePage', page)
}
</script>

<template>
  <div class="mx-auto max-w-2xl px-4 pt-4 sm:px-6 sm:pt-4 lg:max-w-7xl lg:px-8">
    <div
      class="pt-4 grid justify-items-center grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8"
    >
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
