<script setup>
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { ref } from 'vue';
import axios from 'axios';

const { t } = useI18n();

const placeholderText = computed(() => t('newsletter.enterEmail'));
const email = ref('');

async function setNewLetter() {
  let headersList = {
    "Accept": "*/*",
    "Content-Type": "application/json"
  }

  let bodyContent = JSON.stringify({
    "email": email.value
  });

  let reqOptions = {
    url: "http://localhost:8080/api/v1/news-letter",
    method: "POST",
    headers: headersList,
    data: bodyContent,
  }
  try {
    let response = await axios.request(reqOptions);

    if (response.status == 201) {
      alert('Suscrito satisfactoriamente');
    }
  } catch (error) {
    console.error('Error al suscribirse:', error);
    alert('Hubo un error en la suscripción o existe el email en la base de datos.');
  }
}
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

    <form class="flex flex-wrap lg:gap-0 gap-4" @submit.prevent="setNewLetter">
      <input type="email" :placeholder="placeholderText" v-model="email"
        class="w-full lg:max-w-[395px] px-6 py-4 rounded-full lg:rounded-r-[30px] focus:outline-none focus:bg-blueFunko-50 placeholder:text-slate-400 text-slate-950" />
      <button type="submit"
        class="px-6 py-4 bg-blueFunko-200 hover:bg-blueFunko-300 text-slate-900 font-semibold rounded-full lg:rounded-l-[30px]">
        {{ t('newsletter.subscribe') }}
      </button>
    </form>
  </div>
</template>
