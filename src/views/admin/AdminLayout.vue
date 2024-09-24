<script setup>
import AdminSidebar from '@/components/AdminDashboard/AdminSidebar.vue';

</script>

<template>
    <div class="flex h-screen  bg-slate-200">
        <AdminSidebar />
  
      <div class="flex-1 p-8">
          <h1 class="text-1xl font-semibold text-slate-950 pb-5">Admin Dashboard</h1>
  
        <router-view />
      </div>
    </div>
</template>
  

  
<style scoped>
</style>
  