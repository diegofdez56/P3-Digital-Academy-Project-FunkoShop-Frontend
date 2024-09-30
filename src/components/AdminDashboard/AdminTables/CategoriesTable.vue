<script setup>
import { ref, onMounted } from 'vue'
import BaseTable from '@/components/AdminDashboard/AdminTables/BaseTable.vue'
import { CategoryStore } from '@/stores/category/CategoryStore'
import CategoryTableRow from './CategoryTableRow.vue';

const listCategoryStore = CategoryStore();
const listCategories = ref([]);

async function getCategories() {
  try {
    const response = await listCategoryStore.getCategories();
    listCategories.value = [...response];
  } catch (error) {
    console.error('Error fetching categories:', error);
  }
}


onMounted(() => {
  getCategories()
})

</script>

<template>
  <div>
    <BaseTable :headers="['Name', 'Imagen','Highlights']">
      <CategoryTableRow 
        v-for="category in listCategories" 
        :key="category.id" 
        :category="category"
      />
    </BaseTable>
  </div>
</template>
