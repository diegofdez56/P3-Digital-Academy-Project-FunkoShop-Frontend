<script setup>
import FunkoCard from '@/components/Cards/FunkoCard.vue';
import { useAuthStore } from '@/stores/auth';
import { FavoriteStore } from '@/stores/favorites/FavoriteStore';
import { ref } from 'vue';


const store = FavoriteStore()
const auth = useAuthStore()
const favoriteResponse = ref([])
async function favorite() {
    const response = await store.getFavorites(auth.user.access_token)
    favoriteResponse.value = response
    console.log(favoriteResponse);

}

favorite()
</script>
<template>
    <div
        class="grid justify-items-center grid-cols-1 gap-x-8 gap-y-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-x-8 xl:grid-cols-4">
        <FunkoCard v-for="favorite in favoriteResponse" :key="favorite.id" :product="favorite.product"
            class="mx-auto" />
    </div>

</template>