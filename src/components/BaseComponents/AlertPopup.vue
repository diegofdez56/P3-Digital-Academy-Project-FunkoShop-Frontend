<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
  type: {
    type: String,
    default: 'success'
  },
  title: {
    type: String,
    default: 'Success'
  },
  message: {
    type: String,
    default: 'Operation completed successfully.'
  }
})

const emit = defineEmits(['close'])

const visible = ref(true)

function closeAlert() {
  visible.value = false
  emit('close')
}

const alertClasses = computed(() => {
  switch (props.type) {
    case 'success':
      return 'bg-green-600'
    case 'error':
      return 'bg-red-600'
    case 'info':
      return 'bg-blue-600'
    default:
      return 'bg-green-600'
  }
})
</script>
<template>
  <div
    v-if="visible"
    role="alert"
    class="mt-3 relative flex flex-col w-full p-3 text-sm text-white rounded-md"
    :class="alertClasses"
  >
    <p class="flex text-base">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="2"
        stroke="currentColor"
        class="h-5 w-5 mr-2 mt-0.5"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z"
        ></path>
      </svg>
      {{ title }}
    </p>
    <p class="ml-4 p-3">
      {{ message }}
    </p>
    <button
      @click="closeAlert"
      class="flex items-center justify-center transition-all w-8 h-8 rounded-md text-white hover:bg-white/10 active:bg-white/10 absolute top-1.5 right-1.5"
      type="button"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        class="h-5 w-5"
        stroke-width="2"
      >
        <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"></path>
      </svg>
    </button>
  </div>
</template>
