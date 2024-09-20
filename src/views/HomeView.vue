<script setup>
import CarrouselBanner from '@/components/HomePage/CarrouselBanner.vue'
import CardsCarrousel from '@/components/Cards/CardsCarrousel.vue'
import ProductModal from '@/components/ProductDetail/ProductModal.vue'
</script>

<template>
  <header>
    <CarrouselBanner />
  </header>
  <main class="flex gap-x-8 flex-col justify-center py-16">
    <div class="mx-auto max-w-full lg:mx-0 text-start px-24">
      <h2 class="text-3xl font-bold tracking-tight text-dark sm:text-4xl">DISCOUNTED PRODUCTS</h2>
      <p class="mt-2 text-lg leading-8 text-gray-600">
        Funkos on sale! Grabs yours before they're gone.
      </p>
    </div>
    <CardsCarrousel> </CardsCarrousel>
    <ProductModal />
  </main>
</template>
