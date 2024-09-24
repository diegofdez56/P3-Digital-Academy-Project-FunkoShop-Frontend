<script setup>
import { useRouter } from 'vue-router';
// import { useAuthStore } from '@/stores/auth';
import logoutIcon from '@/assets/icons/log-out.svg';

const router = useRouter();
// const authStore = useAuthStore();

const handleLogout = () => {
  localStorage.removeItem('access_token');
  localStorage.removeItem('refresh_token');

  router.push('/');
};
</script>

<template>
  <button class="flex gap-4 px-5 py-2.5 text-base font-medium text-slate-950 uppercase transition-all duration-300 hover:bg-blueFunko-100" @click="handleLogout">
    <img :src="logoutIcon" alt="Logout icon" class="" />
    Log out
  </button>
</template>

<style scoped>
</style>
