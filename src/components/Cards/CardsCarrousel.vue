<template>
  <div class="container mx-auto relative">
    <button
      @click="scrollLeft"
      class="absolute top-1/2 left-0 transform -translate-y-1/2 z-30 bg-gray-400 hover:bg-gray-500 text-white p-2 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400"
      aria-label="Slide left"
    >
      <svg
        width="24px"
        height="24px"
        viewBox="0 0 8 14"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M7 1L1 7L7 13"
          stroke="white"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    </button>

    <button
      @click="scrollRight"
      class="absolute top-1/2 right-0 transform -translate-y-1/2 z-30 bg-gray-400 hover:bg-gray-500 text-white p-2 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400"
      aria-label="Slide right"
    >
      <svg
        width="24px"
        height="24px"
        viewBox="0 0 8 14"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M1 1L7 7L1 13"
          stroke="white"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    </button>

    <div ref="carousel" class="flex overflow-x-auto scroll-smooth space-x-4 py-4 mx-4">
      <div v-for="(funko, index) in funkoList" :key="index" class="flex-none w-64">
        <FunkoCard />
      </div>
    </div>
  </div>
</template>

<script>
import FunkoCard from './FunkoCard.vue'

export default {
  name: 'ScrollableCarousel',
  components: { FunkoCard },
  data() {
    return {
      funkoList: [
        { id: 1 },
        { id: 2 },
        { id: 3 },
        { id: 4 },
        { id: 5 },
        { id: 6 },
        { id: 7 },
        { id: 8 }
      ]
    }
  },
  methods: {
    scrollLeft() {
      const carousel = this.$refs.carousel
      carousel.scrollBy({ left: -carousel.clientWidth / 4, behavior: 'smooth' })
    },
    scrollRight() {
      const carousel = this.$refs.carousel
      carousel.scrollBy({ left: carousel.clientWidth / 4, behavior: 'smooth' })
    }
  }
}
</script>

<style scoped>
.scrollbar-hide::-webkit-scrollbar {
  display: none;
}
.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>
