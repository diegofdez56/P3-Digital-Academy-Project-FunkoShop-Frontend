<script setup>
import {
    Dialog,
    DialogPanel,
    TransitionChild,
    TransitionRoot
} from '@headlessui/vue'

defineProps({
    isOpen: {
        type: Boolean,
        required: true
    },
    orderItemId: Number,
})

const emit = defineEmits(['close'])
</script>

<template>
    <TransitionRoot as="template" :show="isOpen">
        <Dialog class="relative z-10" @close="emit('close')">
            <TransitionChild as="template" enter="ease-out duration-300" enter-from="opacity-0" enter-to="opacity-100"
                leave="ease-in duration-200" leave-from="opacity-100" leave-to="opacity-0">
                <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
            </TransitionChild>

            <div class="fixed inset-0 z-10 w-screen overflow-y-auto">
                <div class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                    <TransitionChild as="template" enter="ease-out duration-300"
                        enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        enter-to="opacity-100 translate-y-0 sm:scale-100" leave="ease-in duration-200"
                        leave-from="opacity-100 translate-y-0 sm:scale-100"
                        leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95">
                        <DialogPanel
                            class="shadow-xl transition-all w-full max-w-md lg:max-w-[550px] xl:max-w-[650px] 2xl:max-w-[750px] rounded-2xl">
                            <div class="flex">
                                <div
                                    class="relative flex h-auto max-w-sm lg:max-w-[550px] xl:max-w-[650px] 2xl:max-w-[750px] flex-1 flex-col justify-center px-6 py-12 lg:px-8 bg-white border-2 rounded-xl border-gray-300/30 shadow-md">
                                    <div class="sm:mx-auto sm:w-full sm:max-w-sm">
                                        <p>Review</p>
                                    </div>
                                    <div
                                        class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm lg:max-w-[550px] xl:max-w-[650px] 2xl:max-w-[750px]">
                                        aqui {{ orderItemId }}
                                        <div class="flex justify-center w-full items-center mt-2">
                                            <button @click="emit('close')"
                                                class="border-2 border-black/30 rounded-lg mt-6 py-2 px-12 hover:bg-gray-50">
                                                Close
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </DialogPanel>
                    </TransitionChild>
                </div>
            </div>
        </Dialog>
    </TransitionRoot>
</template>