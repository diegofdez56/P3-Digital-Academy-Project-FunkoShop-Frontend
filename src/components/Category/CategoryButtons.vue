<script setup>
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import { useCategoryStore } from '../../stores/category/categoryStore';
import { storeToRefs } from 'pinia';

const router = useRouter();
const categoryStore = useCategoryStore();
const { categories, selectedCategory } = storeToRefs(categoryStore);

const handleCategoryChange = (category) => {
  categoryStore.setCategory(category);
  router.push({ name: 'products', query: { categoryId: category.id } });
};

const buttonClasses = computed(() => (category) => {
  return [
    'px-4 py-2 m-2 rounded',
    category.id === selectedCategory.value.id ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700',
  ];
});
</script>

<template>
  <div class="flex flex-wrap justify-center my-4">
    <button
      v-for="category in categories"
      :key="category.id"
      @click="handleCategoryChange(category)"
      :class="buttonClasses(category)"
    >
      {{ category.name }}
    </button>
  </div>
</template>
