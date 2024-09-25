<script setup>
import { defineProps } from 'vue'

defineProps({
  percentage: {
    type: Number,
    default: null
  },
  isActive: {
    type: Boolean,
    default: false
  },
  isAvailable: {
    type: Boolean,
    required: true
  }
})
</script>

<template>
  <div class="flex space-x-2">
    <div
      v-if="isActive && percentage"
      class="bg-red-500 text-white px-2 py-1 rounded-full text-xs font-semibold"
    >
      -{{ percentage }}%
    </div>
    <div
      v-if="!isAvailable"
      class="bg-gray-500 text-white px-2 py-1 rounded-full text-xs font-semibold"
    >
      Sold
    </div>
    <!-- <div
      v-if="!isAvailable"
      class="bg-blue-500 text-white px-2 py-1 rounded-full text-xs font-semibold"
    >
      New
    </div> -->
    <!-- <div
      v-else
      class="bg-green-500 text-white px-2 py-1 rounded-full text-xs font-semibold"
    >
      Available
    </div> -->
  </div>
</template>
