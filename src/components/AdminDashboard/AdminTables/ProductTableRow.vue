<script setup>
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
    <td class="px-4 py-3">{{ product.category.name }}</td>
    <!-- <td class="px-4 py-3">{{ product.rating }}</td> -->
    <td class="px-4 py-3">{{ product.stock }}</td>
    <td class="px-4 py-3">{{ product.discount ? product.discount + '%' : 'No' }}</td>


    <td class="px-4 py-3 text-center">
      <button @click="handleEdit" class="">
      </button>

      <button @click="handleDelete" class="ml-2 w-10 h-10 bg-red-600 hover:bg-red-500 rounded-full">
        <img src="@/assets/icons/delete.svg" alt="Delete Icon" class="mx-auto" />
      </button>
    </td>
  </tr>
</template>
