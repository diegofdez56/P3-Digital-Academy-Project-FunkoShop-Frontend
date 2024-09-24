<script setup>
import { RouterView } from 'vue-router'
import NavBar from './components/NavBar/NavBar.vue';
import FooterComponent from './components/Footer/FooterComponent.vue';
</script>

<template>
  <header>
    <NavBar />
  </header>
  <div class="wrapper">
    
  </div>

  <RouterView />
  <footer>
    <FooterComponent />
  </footer>
</template>
