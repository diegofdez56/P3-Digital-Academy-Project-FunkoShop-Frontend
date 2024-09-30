<script setup>
import AdminHeading from '@/components/AdminDashboard/AdminHeading.vue';
import { CategoryStore } from '@/stores/category/CategoryStore';
import { onMounted, ref } from 'vue';

const listCategoryStore = CategoryStore();
const listCategories = ref([]);

async function getCategories() {
  const response = await listCategoryStore.getCategories();
  listCategories.value = [...response];
}

onMounted(async () => {
  getCategories();
});

console.log(listCategories)
</script>

<template>
    <div>
        <AdminHeading title="Categories Management"/>
        //aqui todo para configurar las categorías
    </div>
</template>
  
  
  
<style scoped>
</style>