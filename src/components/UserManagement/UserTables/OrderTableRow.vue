<script setup>
import { useProductModal } from '@/composables/useProductModal';
import OrderItemsModal from './OrderItemsModal.vue';
import { EllipsisHorizontalCircleIcon } from '@heroicons/vue/20/solid';

defineProps({
  order: {
    type: Object,
    required: true
  }
})

const { isModalOpen, openModal, closeModal } = useProductModal()

</script>
<template>
  <tr class="bg-slate-50 hover:bg-gray-100 text-slate-900 border-t border-slate-300">
    <td class="px-4 py-3">{{ order.status }}</td>
    <td class="px-4 py-3">{{ order.totalItems }}</td>
    <td class="px-4 py-3">{{ order.totalPrice }}</td>
    <td>
      <button @click="openModal" class="px-1.5 py-1.5 ml-4 lg:ml-4 bg-white rounded-md shadow-md flex">
        <EllipsisHorizontalCircleIcon class="h-5 w-5 flex-shrink-0 text-gray-700 group-hover:text-gray-400 mr-2" aria-hidden="true" />
        Details
      </button>
      <OrderItemsModal :isOpen="isModalOpen" @close="closeModal" :order="order" />
    </td>
  </tr>

</template>