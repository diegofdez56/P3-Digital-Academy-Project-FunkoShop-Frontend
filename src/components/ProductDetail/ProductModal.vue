<script setup>
import { computed, ref } from 'vue'; // Asegúrate de importar ref aquí
import { Dialog, DialogPanel, TransitionChild, TransitionRoot } from '@headlessui/vue';
import { XMarkIcon } from '@heroicons/vue/24/outline';
import { StarIcon } from '@heroicons/vue/20/solid';

const props = defineProps({
  isOpen: {
    type: Boolean,
    required: true
  },
  product: {
    type: Object,
    required: true
  }
});
const emit = defineEmits(['close']);

const quantity = ref(1);

const incrementQuantity = () => {
  quantity.value++;
};

const decrementQuantity = () => {
  if (quantity.value > 1) {
    quantity.value--;
  }
};

const productImage = computed(() => {
  if (!props.product.image) return '';
  return props.product.image.startsWith('http')
    ? props.product.image
    : new URL(`../assets/img/CardImage/${props.product.image}`, import.meta.url).href;
});
</script>

<template>
  <TransitionRoot as="template" :show="isOpen">
    <Dialog class="relative z-10" @close="emit('close')">
      <TransitionChild as="template" enter="ease-out duration-300" enter-from="opacity-0" enter-to="opacity-100"
        leave="ease-in duration-200" leave-from="opacity-100" leave-to="opacity-0">
        <div class="fixed inset-0 hidden bg-gray-500 bg-opacity-75 transition-opacity md:block"></div>
      </TransitionChild>

      <div class="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div class="flex min-h-full items-stretch justify-center text-center md:items-center md:px-2 lg:px-4">
          <TransitionChild as="template" enter="ease-out duration-300"
            enter-from="opacity-0 translate-y-4 md:translate-y-0 md:scale-95"
            enter-to="opacity-100 translate-y-0 md:scale-100" leave="ease-in duration-200"
            leave-from="opacity-100 translate-y-0 md:scale-100"
            leave-to="opacity-0 translate-y-4 md:translate-y-0 md:scale-95">
            <DialogPanel
              class="flex w-full transform text-left text-base transition md:my-8 md:max-w-2xl md:px-4 lg:max-w-4xl">
              <div class="relative flex w-full items-center overflow-hidden bg-white px-4 pb-8 pt-14 shadow-2xl sm:px-6 sm:pt-8 md:p-6 lg:p-8">
                <button type="button"
                  class="absolute right-4 top-4 text-gray-400 hover:text-gray-500 sm:right-6 sm:top-8 md:right-6 md:top-6 lg:right-8 lg:top-8"
                  @click="emit('close')">
                  <span class="sr-only">Close</span>
                  <XMarkIcon class="h-6 w-6" aria-hidden="true" />
                </button>

                <div class="grid w-full grid-cols-1 items-start gap-x-6 gap-y-8 sm:grid-cols-12 lg:gap-x-8">
                  <div class="aspect-h-3 aspect-w-2 overflow-hidden rounded-lg bg-gray-100 sm:col-span-4 lg:col-span-5">
                    <img :src="productImage" :alt="props.product.name || 'Product Image'"
                      class="object-cover object-center" />
                  </div>
                  <div class="sm:col-span-8 lg:col-span-7">
                    <h2 class="text-2xl font-bold text-gray-900 sm:pr-12">
                      {{ props.product.name || 'Product Name' }}
                    </h2>

                    <section aria-labelledby="information-heading" class="mt-2">
                      <div class="mt-6">
                        <h4 class="sr-only">Reviews</h4>
                        <div class="flex items-center">
                          <div class="flex items-center">
                            <StarIcon v-for="rating in 5" :key="rating" :class="{
                              'text-gray-900': (props.product.rating || 0) >= rating,
                              'text-gray-200': (props.product.rating || 0) < rating,
                              'h-5 w-5 flex-shrink-0': true,
                            }" aria-hidden="true" />
                          </div>
                          <p class="sr-only">
                            {{ props.product.rating || 0 }} out of 5 stars
                          </p>
                          <a href="#" class="ml-3 text-sm font-medium text-indigo-600 hover:text-indigo-500">
                            {{ props.product.reviewCount || 0 }} reviews
                          </a>
                        </div>
                      </div>
                      <h3 class="text-2xl text-gray-900 font-semibold">
                        ${{ props.product.price ? props.product.price.toFixed(2) : '0.00' }}
                      </h3>
                      <div>
                        <h4 class="text-xl text-gray-900 font-semibold">Description</h4>
                        <p class="text-md text-gray-900">
                          {{ props.product.description || 'No hay descripción disponible.' }}
                        </p>
                      </div>
                    </section>
                    <section aria-labelledby="options-heading" class="mt-10">
                      <h3 id="options-heading" class="sr-only">Opciones de producto</h3>
                      <div class="mt-4">
                        <label for="quantity" class="block text-sm font-medium text-gray-700">Qty.</label>
                        <div class="flex mt-1">
                          <button @click="decrementQuantity" class="px-2 py-1 border rounded-l-md bg-gray-200 hover:bg-gray-300">-</button>
                          <input type="text" id="quantity" class="border-t border-b border-gray-300 w-16 text-center" 
                            v-model="quantity" readonly />
                          <button @click="incrementQuantity" class="px-2 py-1 border rounded-r-md bg-gray-200 hover:bg-gray-300">+</button>
                        </div>
                      </div>
                      <div class="mt-6">
                        <button type="button" class="w-full rounded-md border border-transparent bg-blue-600 px-4 py-2 text-base font-medium text-white hover:bg-blue-700 focus:outline-none">
                          Add to Cart
                        </button>
                      </div>
                    </section>
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
