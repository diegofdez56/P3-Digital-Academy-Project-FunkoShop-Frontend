<script setup>
import { useProductModal } from '@/composables/useProductModal';
import { StarIcon } from '@heroicons/vue/20/solid';
import ReviewItemsModal from './ReviewItemsModal.vue';

const props = defineProps({
  item: {
    type: Object,
    required: true
  },
  isAdmin: Boolean
})

const average = Math.round(props.item.product.averageRating * 1.0)

const { isModalOpen, openModal, closeModal } = useProductModal()

</script>
<template>
  <tr class="bg-slate-50 hover:bg-gray-100 text-slate-900 border-t border-slate-300">
    <td class="px-4 py-3 font-semibold">{{ item.product.name }}</td>
    <td class="px-4 py-3">
      <div v-if="!isAdmin">
        <button @click="openModal" class="px-1.5 py-1.5 ml-4 lg:ml-4 bg-white rounded-md shadow-md flex">
          <StarIcon class="h-5 w-5 flex-shrink-0 text-yellow-400 group-hover:text-gray-400" aria-hidden="true" /> {{
            average }}
        </button>
        <ReviewItemsModal :isOpen="isModalOpen" @close="closeModal" :orderItemId="item.id" />
      </div>
      <div v-else>
        <button class="px-1.5 py-1.5 ml-4 lg:ml-4 bg-white rounded-md shadow-md flex">
          <StarIcon class="h-5 w-5 flex-shrink-0 text-yellow-400 group-hover:text-gray-400" aria-hidden="true" /> {{
            average }}
        </button>
      </div>
    </td>
    <td class="px-4 py-3"><img v-if="item.product.imageHash" :src="item.product.imageHash" class="w-8 h-8" /></td>
    <td class="px-4 py-3">{{ item.quantity }}</td>
    <td class="px-4 py-3">{{ item.product.discount > 0 ? item.product.discountedPrice : item.product.price }}</td>
    <td class="px-4 py-3">{{ item.product.discount > 0 ? item.product.discount + '%' : 'No' }}</td>
    <td class="px-4 py-3">{{ item.product.category.name }}</td>
  </tr>

</template>