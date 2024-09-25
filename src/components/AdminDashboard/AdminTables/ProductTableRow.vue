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
    <td class="px-4 py-5 font-semibold">{{ product.name }}</td>
    <td class="px-4 py-5">{{ product.category.name }}</td>
    <td class="px-4 py-5">{{ product.rating }}</td>
    <td class="px-4 py-5">{{ product.stock }}</td>
    <td class="px-4 py-5">{{ product.discount ? product.discount.percentage + '%' : 'No' }}</td>
    <td class="px-4 py-5">{{ product.is_available ? 'Yes' : 'No' }}</td>


    <td class="px-4 py-5 text-center">
      <button @click="handleEdit" class="">E
      </button>

      <button @click="handleDelete" class="ml-2">D
      </button>
    </td>
  </tr>
</template>
