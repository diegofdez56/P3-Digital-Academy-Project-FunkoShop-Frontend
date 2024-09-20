<script setup>
import { RouterLink, RouterView } from 'vue-router'
import NavBar from './components/NavBar/NavBar.vue';
import FooterComponent from './components/Footer/FooterComponent.vue';
import ProductsComp from './components/ProductsComp.vue';
</script>

<template>
  <ProductsComp />
  <header>
    <NavBar />
  </header>
  <div class="wrapper">
    <nav>
      <RouterLink to="/">Home</RouterLink>
      <RouterLink to="/about">About</RouterLink>
    </nav>
  </div>

  <RouterView />
  <footer>
    <FooterComponent />
  </footer>
</template>
