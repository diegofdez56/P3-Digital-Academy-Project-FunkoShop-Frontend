<script setup>
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';

const { t } = useI18n(); 

const placeholderText = computed(() => t('newsletter.enterEmail'));
</script>


<template>
  <div class="md:col-span-7 max-w-[640px] flex flex-col gap-5 md:gap-8">
    <div class="flex flex-col gap-2">
      <h2 class="text-blueFunko-50 text-2xl md:text-4xl font-semibold uppercase">
        {{ t('newsletter.subscribeHeading') }} </h2>
      <div class="text-blueFunko-50/90 text-lg md:text-xl font-open-sans">
        {{ t('newsletter.subscribeDescription') }}
      </div>
    </div>

    <form class="flex flex-wrap lg:gap-0 gap-4">
      <input type="email" :placeholder="placeholderText"
        class="w-full lg:max-w-[395px] px-6 py-4 rounded-full lg:rounded-r-[30px] focus:outline-none focus:bg-blueFunko-50 placeholder:text-slate-400 text-slate-950" />
      <button type="submit"
        class="px-6 py-4 bg-blueFunko-200 hover:bg-blueFunko-300 text-slate-900 font-semibold rounded-full lg:rounded-l-[30px]">
        {{ t('newsletter.subscribe') }}
      </button>
    </form>
  </div>
</template>
