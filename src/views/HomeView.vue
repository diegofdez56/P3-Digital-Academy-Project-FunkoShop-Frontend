<script setup>
import { useI18n } from 'vue-i18n';
import CarrouselBanner from '@/components/HomePage/CarrouselBanner.vue';
import CardsCarrousel from '@/components/Cards/CardsCarrousel.vue';
import NewArrivalsCarrousel from '@/components/Cards/NewArrivalsCarrousel.vue';

const { t } = useI18n();
</script>

<template>
  <header>
    <CarrouselBanner />
  </header>
  <main class="flex gap-x-8 flex-col justify-center py-16">
    <div class="mx-auto max-w-full lg:mx-0 text-start px-24">
      <h2 class="text-3xl font-bold tracking-tight text-dark sm:text-4xl text-center">{{ t('discountedProducts') }}</h2>
      <p class="mt-2 text-lg leading-8 text-gray-600 text-center">
        {{ t('discountedDescription') }}
      </p>
    </div>
    <CardsCarrousel /> 
    <div class="mx-auto max-w-full lg:mx-0 px-24 mt-10">
      <h2 class="text-3xl font-bold tracking-tight text-dark sm:text-4xl text-center">{{ t('newArrivals') }}</h2>
      <p class="mt-2 text-lg leading-8 text-gray-600 text-center">{{ t('newArrivalsDescription') }}</p>
    </div>
    <NewArrivalsCarrousel />
  </main>
</template>
