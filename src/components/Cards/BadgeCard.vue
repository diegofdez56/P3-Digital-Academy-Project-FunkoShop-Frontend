<script setup>
const props = defineProps({
  isAvailable: Boolean,
  isNew: Boolean,
  isDiscount: Boolean,
  discount: Object
})
</script>

<template>
  <div
    class="rounded-xl px-2.5 border border-transparent text-md flex items-center text-white transition-all shadow-sm"
    :class="
      !props.isAvailable
        ? 'bg-slate-800'
        : props.isDiscount
          ? 'bg-red-500'
          : props.isNew
            ? 'bg-blueFunko-700'
            : ''
    "
  >
    <div v-if="!(props.isAvailable && !props.isDiscount && !props.isNew)">
      <p v-if="!props.isAvailable">Sold</p>
      <p v-if="props.isAvailable && props.isDiscount" class="">{{ discount.percentage }}% off</p>
      <p v-if="props.isAvailable && !props.isDiscount && props.isNew">New</p>
    </div>
  </div>
</template>
