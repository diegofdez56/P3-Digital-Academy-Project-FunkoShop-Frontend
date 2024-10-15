<script setup>
import OrderItemsModal from '@/components/UserManagement/UserTables/OrderItemsModal.vue';
import { useProductModal } from '@/composables/useProductModal';
import { CheckIcon, EllipsisHorizontalCircleIcon, XMarkIcon } from '@heroicons/vue/24/outline';


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
    <td class="px-4 py-3">{{ order.id }}</td>
    <td class="px-4 py-3">{{ order.status }}</td>
    <td class="px-4 py-3"><CheckIcon class="h-5 w-5 flex-shrink-0 text-green-600" v-if="order.paid"/> <XMarkIcon class="h-5 w-5 flex-shrink-0 text-red-600" v-else /></td>
    <td class="px-4 py-3">{{ order.totalItems }}</td>
    <td class="px-4 py-3">{{ order.totalPrice }}</td>
    <td>
      <button @click="openModal" class="px-1.5 py-1.5 ml-4 lg:ml-4 bg-white rounded-md shadow-md flex">
        <EllipsisHorizontalCircleIcon class="h-5 w-5 flex-shrink-0 text-gray-700 group-hover:text-gray-400 mr-2" aria-hidden="true" />
        Details
      </button>
      <OrderItemsModal :isOpen="isModalOpen" @close="closeModal" :order="order" :isAdmin="true"/>
    </td>
  </tr>
</template>
