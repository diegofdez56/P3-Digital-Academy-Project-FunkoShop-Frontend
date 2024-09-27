<script setup>
defineProps({
  label: { type: String, required: true },
  to: { type: String, required: true },
  iconPath: { type: String, required: false }
})
</script>

<template>
  <li>
    <router-link :to="to" class="flex gap-4 px-5 py-2.5 text-base font-medium text-slate-950 uppercase transition-all duration-300 hover:bg-blueFunko-100" active-class="bg-blueFunko-50">
        <img v-if="iconPath" :src="iconPath" alt="icon" class="" />
        <span>{{ label }}</span>
    </router-link>
  </li>
</template>

<style scoped>
</style>
