<script setup>
  defineEmits(['confirm', 'cancel']);
</script>

<template>
    <div class="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-50">
      <div class="bg-white p-6 md:p-10 rounded-lg shadow-lg flex flex-col gap-5">
        <h3 class="text-2xl font-semibold text-slate-950">Confirm Delete</h3>
        <p class="text-base text-slate-900">Are you sure you want to delete this product?</p>
        <div class="mt-4 flex justify-end space-x-2">
          <button @click="$emit('cancel')" class="px-5 py-2 border border-blueFunko-900 text-blueFunko-900 font-medium rounded-md hover:bg-blueFunko-900/15">Cancel</button>
          <button @click="$emit('confirm')" class="px-5 py-2 bg-red-600 text-white font-medium rounded-md hover:bg-red-500">Delete</button>
        </div>
      </div>
    </div>
</template>