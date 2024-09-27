<script setup>
import logoutIcon from '@/assets/icons/log-out.svg';
import { logoutStore } from '@/stores/logout';

const logout = logoutStore();

</script>

<template>
  <button @click="logout.logout()" class="flex gap-4 px-5 py-2.5 text-base font-medium text-slate-950 uppercase transition-all duration-300 hover:bg-blueFunko-100">
    <img :src="logoutIcon" alt="Logout icon" class="" />
    Log out
  </button>
</template>

<style scoped>
</style>
