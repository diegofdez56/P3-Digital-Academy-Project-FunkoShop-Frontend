<script setup>
defineProps({
  category: {
    type: Object,
    required: true
  }
})
/* 
const emit = defineEmits(['edit', 'delete'])

const handleEdit = () => {
  emit('edit', props.product)
}

const handleDelete = () => {
  emit('delete', props.product.id)
} */
</script>

<template>
  <tr class="bg-slate-50 hover:bg-gray-100 text-slate-900 border-t border-slate-300">
    <td class="px-4 py-3 font-semibold">{{ category.name }}</td>
    <td class="px-4 py-3"><img v-if="category.imageHash" :src="category.imageHash" class="w-20 h-8" /></td>
    <td class="px-4 py-3">
      <div class="relative flex gap-x-3">
        <div class="flex h-6 items-center">
<!--           <input id="comments" name="comments" type="checkbox" v-model="category.highlights"
            class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600" /> -->
        </div>
      </div>
    </td>

    <!-- <td class="px-4 py-3 text-center">
      <button  class="">
      </button>

      <button  class="ml-2 w-10 h-10 bg-red-600 hover:bg-red-500 rounded-full">
        <img src="@/assets/icons/delete.svg" alt="Delete Icon" class="mx-auto" />
      </button>
    </td> -->
  </tr>
</template>
