<script setup>
import { ref } from 'vue';
import { useAuthStore } from '@/stores/auth';
import { FavoriteStore } from '@/stores/favorites/FavoriteStore';

const store = FavoriteStore();
const auth = useAuthStore();

const props = defineProps({
  productId: {
    type: Number,
    required: true
  }
});

const isFavorite = ref(false);

const toggleFavorite = async () => {
  if (isFavorite.value) {
    try {
      await store.removeFavorite(props.productId, auth.user.access_token);
    } catch (error) {
      console.error("Error fetching favorites:", error);
    }
  } else {
    try {
      await store.addFavorite(props.productId, auth.user.access_token);
    } catch (error) {
      console.error("Error fetching favorites:", error);
    }
  }
  isFavorite.value = !isFavorite.value;
};
</script>

<template>
  <button @click="toggleFavorite" :class="{
    'text-red-500': isFavorite,
    'text-gray-500': !isFavorite
  }"
    class="rounded-md text-center text-sm transition-all focus:shadow-none active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
    type="button">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" stroke="black" class="w-6 h-6">
      <path
        d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 0 1-.383-.218 25.18 25.18 0 0 1-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0 1 12 5.052 5.5 5.5 0 0 1 16.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 0 1-4.244 3.17 15.247 15.247 0 0 1-.383.219l-.022.012-.007.004-.003.001a.752.752 0 0 1-.704 0l-.003-.001Z" />
    </svg>
  </button>
</template>
