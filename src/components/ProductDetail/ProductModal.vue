<script setup>
import { ref, computed } from 'vue';
import { Dialog, DialogPanel, TransitionChild, TransitionRoot } from '@headlessui/vue';
import { XMarkIcon } from '@heroicons/vue/24/outline';
import { StarIcon } from '@heroicons/vue/20/solid';
import { useModal } from '/src/composables/useProduct.js';
import { useProductStore } from './../../stores/productStore.js';
import { storeToRefs } from 'pinia';

const { isOpen, closeModal } = useModal();

const productStore = useProductStore();
const { product } = storeToRefs(productStore);

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
  if (!product.value || !product.value.image) return '';
  return product.value.image.startsWith('http')
    ? product.value.image
    : new URL(`../assets/img/CardImage/${product.value.image}`, import.meta.url).href;
});
</script>

<template>
  <div class="flex justify-center my-4">
        <button @click="isOpen.value = true"
            class="flex justify-center items-center w-full rounded-md bg-primary px-10 py-2 text-white transition-all hover:bg-secondary focus:outline-none">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-4 h-4 mr-1.5">
                <path fill-rule="evenodd"
                    d="M7.5 6v.75H5.513c-.96 0-1.764.724-1.865 1.679l-1.263 12A1.875 1.875 0 0 0 4.25 22.5h15.5a1.875 1.875 0 0 0 1.865-2.071l-1.263-12a1.875 1.875 0 0 0-1.865-1.679H16.5V6a4.5 4.5 0 1 0-9 0ZM12 3a3 3 0 0 0-3 3v.75h6V6a3 3 0 0 0-3-3Zm-3 8.25a3 3 0 1 0 6 0v-.75a.75.75 0 0 1 1.5 0v.75a4.5 4.5 0 1 1-9 0v-.75a.75.75 0 0 1 1.5 0v.75Z"
                    clip-rule="evenodd"></path>
            </svg>
        </button>
    </div>
  <TransitionRoot as="template" :show="isOpen">
    <Dialog class="relative z-10" @close="closeModal">
      <TransitionChild
        as="template"
        enter="ease-out duration-300"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="ease-in duration-200"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <div class="fixed inset-0 hidden bg-gray-500 bg-opacity-75 transition-opacity md:block"></div>
      </TransitionChild>

      <div class="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div
          class="flex min-h-full items-stretch justify-center text-center md:items-center md:px-2 lg:px-4"
        >
          <TransitionChild
            as="template"
            enter="ease-out duration-300"
            enter-from="opacity-0 translate-y-4 md:translate-y-0 md:scale-95"
            enter-to="opacity-100 translate-y-0 md:scale-100"
            leave="ease-in duration-200"
            leave-from="opacity-100 translate-y-0 md:scale-100"
            leave-to="opacity-0 translate-y-4 md:translate-y-0 md:scale-95"
          >
            <DialogPanel
              class="flex w-full transform text-left text-base transition md:my-8 md:max-w-2xl md:px-4 lg:max-w-4xl"
            >
              <div
                class="relative flex w-full items-center overflow-hidden bg-white px-4 pb-8 pt-14 shadow-2xl sm:px-6 sm:pt-8 md:p-6 lg:p-8"
              >
                <button
                  type="button"
                  class="absolute right-4 top-4 text-gray-400 hover:text-gray-500 sm:right-6 sm:top-8 md:right-6 md:top-6 lg:right-8 lg:top-8"
                  @click="closeModal"
                >
                  <span class="sr-only">Close</span>
                  <XMarkIcon class="h-6 w-6" aria-hidden="true" />
                </button>

                <div
                  class="grid w-full grid-cols-1 items-start gap-x-6 gap-y-8 sm:grid-cols-12 lg:gap-x-8"
                >
                  <div
                    class="aspect-h-3 aspect-w-2 overflow-hidden rounded-lg bg-gray-100 sm:col-span-4 lg:col-span-5"
                  >
                    <img
                      :src="productImage"
                      :alt="product.value?.name || 'Product Image'"
                      class="object-cover object-center"
                    />
                  </div>
                  <div class="sm:col-span-8 lg:col-span-7">
                    <h2 class="text-2xl font-bold text-gray-900 sm:pr-12">
                      {{ product.value?.name || 'Product Name' }}
                    </h2>

                    <section aria-labelledby="information-heading" class="mt-2">
                      <div class="mt-6">
                        <h4 class="sr-only">Reviews</h4>
                        <div class="flex items-center">
                          <div class="flex items-center">
                            <StarIcon
                              v-for="rating in 5"
                              :key="rating"
                              :class="{
                                'text-gray-900': (product.value?.rating || 0) >= rating,
                                'text-gray-200': (product.value?.rating || 0) < rating,
                                'h-5 w-5 flex-shrink-0': true,
                              }"
                              aria-hidden="true"
                            />
                          </div>
                          <p class="sr-only">
                            {{ product.value?.rating || 0 }} out of 5 stars
                          </p>
                          <a
                            href="#"
                            class="ml-3 text-sm font-medium text-indigo-600 hover:text-indigo-500"
                          >
                            {{ product.value?.reviewCount || 0 }} reviews
                          </a>
                        </div>
                      </div>
                      <h3 class="text-2xl text-gray-900 font-semibold">
                        ${{ product.value?.price ? product.value.price.toFixed(2) : '0.00' }}
                      </h3>
                      <div>
                        <h4 class="text-xl text-gray-900 font-semibold">Descripción</h4>
                        <p class="text-md text-gray-900">
                          {{ product.value?.description || 'No hay descripción disponible.' }}
                        </p>
                      </div>
                    </section>
                    <section aria-labelledby="options-heading" class="mt-10">
                      <h3 id="options-heading" class="sr-only">Opciones de producto</h3>
                      <div class="mt-6 flex items-center space-x-4">
                        <button
                          @click="decrementQuantity"
                          class="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
                        >
                          -
                        </button>
                        <span class="text-xl font-medium">{{ quantity }}</span>
                        <button
                          @click="incrementQuantity"
                          class="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
                        >
                          +
                        </button>
                      </div>
                      <form>
                        <button
                          type="submit"
                          class="mt-6 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 py-3 px-8 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                        >
                          Añadir al carrito
                        </button>
                      </form>
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
