<script setup>
import { computed } from 'vue';

const { currentPage, totalPages } = defineProps({
  currentPage: {
    type: Number,
    required: true
  },
  totalPages: {
    type: Number,
    required: true
  }
});

const emit = defineEmits(['changePage']);

const isFirstPage = computed(() => currentPage === 0);
const isLastPage = computed(() => currentPage === totalPages - 1);

const handlePageChange = (newPage) => {
  if (newPage < 0 || newPage >= totalPages) return;
  emit('changePage', newPage);
};

const generateVisiblePages = (current, total, maxVisiblePages) => {
  const pages = [1];
  if (total <= maxVisiblePages) {
    for (let i = 2; i <= total; i++) {
      pages.push(i);
    }
  } else {
    if (current > 3) pages.push("...");
    
    const startPage = Math.max(2, Math.min(current - 1, total - 3));
    const endPage = Math.min(total - 1, Math.max(current + 1, 4));

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    if (current < total - 2) pages.push("...");
    pages.push(total);
  }
  return pages;
};

const visiblePages = computed(() => generateVisiblePages(currentPage + 1, totalPages, 5));
</script>

<template>
  <div class="flex justify-center items-center mt-5 w-full max-w-md mx-auto space-x-2">
    <button 
      :disabled="isFirstPage"
      aria-disabled="isFirstPage"
      @click="handlePageChange(currentPage - 1)"
      class="px-3 py-2 bg-slate-100 hover:bg-blueFunko-100 rounded disabled:opacity-50"
    >
      Prev
    </button>

    <div v-for="(page, index) in visiblePages" :key="index">
      <button
        v-if="page !== '...'"
        @click="handlePageChange(page - 1)"
        class="px-3 py-2 bg-slate-100 hover:bg-blueFunko-100 rounded"
        :class="{ 'bg-blueFunko-100 text-slate-950 font-semibold': page === currentPage + 1 }"
        :aria-current="page === currentPage + 1 ? 'page' : undefined"
      >
        {{ page }}
      </button>
      <span v-else class="text-sm text-gray-400 px-2">...</span>
    </div>

    <button 
      :disabled="isLastPage"
      aria-disabled="isLastPage"
      @click="handlePageChange(currentPage + 1)"
      class="px-3 py-2 bg-slate-100 hover:bg-blueFunko-100 rounded disabled:opacity-50"
    >
      Next
    </button>
  </div>
</template>
