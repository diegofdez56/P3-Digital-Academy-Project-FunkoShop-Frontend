<script setup>
defineProps({
  item: {
    type: Object,
    required: true
  }
})
</script>
<template>
  <tr class="bg-slate-50 hover:bg-gray-100 text-slate-900 border-t border-slate-300">
    <td class="px-4 py-3 font-semibold">{{ item.product.name }}</td>
    <td class="px-4 py-3"><img v-if="item.product.imageHash" :src="item.product.imageHash" class="w-8 h-8" /></td>
    <td class="px-4 py-3">{{ item.quantity }}</td>
    <td class="px-4 py-3">{{ item.product.discount > 0 ? item.product.discountedPrice : item.product.price }}</td>
    <td class="px-4 py-3">{{ item.product.discount > 0 ? item.product.discount + '%' : 'No' }}</td>
    <td class="px-4 py-3">{{ item.product.category.name }}</td>
  </tr>

</template>