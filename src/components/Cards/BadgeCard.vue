<script setup>
const props = defineProps({
  isAvailable: Boolean,
  isNew: Boolean,
  isDiscount: Boolean
});

</script>

<template>
  <div
    :class="!(props.isAvailable && !props.isDiscount && !props.isNew) ? 'rounded-xl bg-slate-800 px-2.5 border border-transparent text-xs flex items-center text-white transition-all shadow-sm' : ''">
    <div v-if="!(props.isAvailable && !props.isDiscount && !props.isNew)">
      <p v-if="!props.isAvailable">Sold</p>
      <p v-if="props.isAvailable && props.isDiscount">Discount</p>
      <p v-if="props.isAvailable && !props.isDiscount && props.isNew">New</p>
    </div>
  </div>
</template>
