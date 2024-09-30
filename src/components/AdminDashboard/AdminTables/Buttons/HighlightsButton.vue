<script setup>
defineProps({
    category: {
        type: Object,
        required: true
    }
})

function change() {
    
}
</script>

<template>
    <button @click="change()"
        :class="category.highlights ? 'bg-blueFunko-100 hover:bg-slate-300' : 'bg-slate-300 hover:bg-blueFunko-100'"
        class="flex gap-4 px-5 py-2.5 text-base font-medium text-slate-950 uppercase transition-all duration-300">
        {{ !category.highlights ? 'No Selected' : 'Selected' }}
    </button>
</template>

<style scoped></style>