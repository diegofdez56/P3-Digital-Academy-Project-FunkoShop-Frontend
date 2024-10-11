<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { NewLettersStore } from '@/stores/newLetters/NewLettersStore';

const route = useRoute();
const router = useRouter();
const store = NewLettersStore();

const unsubscribingMessage = ref("Unsubscribing...");
const success = ref(false);
const error = ref(false);

onMounted(async () => {
  const code = route.query.code;
  try {
    await store.unsubscribeNewsletter(code);
    unsubscribingMessage.value = "You have successfully unsubscribed from the newsletter.";
    success.value = true;
    setTimeout(() => {
      router.push('/');
    }, 4000);
  } catch (err) {
    console.error('Error unsubscribing:', err);
    unsubscribingMessage.value = "There was an issue processing your request. Please try again.";
    error.value = true;
  }
});
</script>

<template>
  <div class="flex items-center justify-center">
    <div class="w-full p-10 md:p-14 rounded-lg text-center">
      <h1 class="text-2xl font-semibold mb-4" :class="{ 'text-blueFunko-600': success, 'text-red-600': error }">
        {{ unsubscribingMessage }}
      </h1>
      <p v-if="success" class="text-sm text-gray-500">Redirecting to home in a few seconds...</p>
    </div>
  </div>
</template>
