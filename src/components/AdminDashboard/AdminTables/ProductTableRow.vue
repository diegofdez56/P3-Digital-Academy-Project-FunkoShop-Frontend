<script setup>
import deleteIcon from '@/assets/icons/delete.svg';
import editIcon from '@/assets/icons/edit.svg';

const props = defineProps({
  product: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['edit', 'delete'])

const handleEdit = () => {
  emit('edit', props.product)
}

const handleDelete = () => {
  emit('delete', props.product.id)
}
</script>

<template>

  <tr class="bg-slate-50 hover:bg-gray-100 text-slate-900 border-t border-slate-300">
    <td class="px-4 py-3 font-semibold">{{ product.name }}</td>
    <td class="px-4 py-3 flex gap-1"><img v-if="product.imageHash" :src="product.imageHash" class="h-10 w-10 object-cover rounded-md" /> <img v-if="product.imageHash2" :src="product.imageHash2" class="h-10 w-10 object-cover rounded-md" /> </td>
    <td class="px-4 py-3">{{ product.category.name }}</td>
    <td class="px-4 py-3">{{ product.stock }}</td>
    <td class="px-4 py-3">{{ product.price }}€</td>
    <td class="px-4 py-3">{{ product.discount ? product.discount + '%' : 'No' }}</td>


    <td class="px-4 py-3 flex gap-4">
      <button @click="handleEdit" class="w-10 h-10 bg-blueFunko-700 hover:bg-blueFunko-600 rounded-full">
        <img :src="editIcon" alt="Edit Icon" class="mx-auto" />
      </button>

      <button @click="handleDelete" class="w-10 h-10 bg-red-600 hover:bg-red-700 rounded-full">
        <img :src="deleteIcon" alt="Delete Icon" class="mx-auto" />
      </button>
    </td>
  </tr>
</template>
