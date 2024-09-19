<script setup>
defineProps({
  icon: {
    type: String,
    required: true
  },
  link: {
    type: String,
    required: true
  },
  alt: {
    type: String,
    required: true
  }
})
</script>

<template>
  <a :href="link" target="_blank" rel="noopener noreferrer">
    <img
      :src="icon"
      :alt="alt"
      class="w-full min-w-12 h-12 rounded-full hover:opacity-75 transition-opacity duration-200"
    />
  </a>
</template>
