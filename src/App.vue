<script setup>
import { RouterView, useRoute } from 'vue-router'
import NavBar from './components/NavBar/NavBar.vue'
import FooterComponent from './components/Footer/FooterComponent.vue'

const route = useRoute()
</script>

<template>
  <div class="flex flex-col min-h-screen">
    <header>
      <NavBar />
    </header>
    <div class="wrapper"></div>
    
    <div class="flex-grow">
      <RouterView />
    </div>

    <footer v-if="route.path != '/404' && !route.meta.requiresAdmin">
      <FooterComponent />
    </footer>
  </div>
</template>
