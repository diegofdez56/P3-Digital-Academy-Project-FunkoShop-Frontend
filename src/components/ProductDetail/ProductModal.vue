<script setup>
import { ref, computed } from 'vue'
import { Dialog, DialogPanel, TransitionChild, TransitionRoot } from '@headlessui/vue'
import { XMarkIcon } from '@heroicons/vue/24/outline'
import { StarIcon } from '@heroicons/vue/20/solid'
import BadgeCard from '../Cards/BadgeCard.vue'
import FavoriteIcon from '../Cards/FavoriteIcon.vue'

import { useCartStore } from '../../stores/cart/cartStore'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const props = defineProps({
  isOpen: {
    type: Boolean,
    required: true
  },
  product: {
    type: Object,
    required: true,
  }
})
const emit = defineEmits(['close'])

const quantity = ref(1)
const currentImageIndex = ref(0)
const cartStore = useCartStore()

const discountedPrice = computed(() => {
  if (props.product.discount && props.product.discount > 0) {
    const discountAmount = props.product.price * (props.product.discount / 100)
    return (props.product.price - discountAmount).toFixed(2)
  }
  return props.product.price.toFixed(2)
})

const maxStockReached = computed(() => {
  return quantity.value >= props.product.stock
})

const incrementQuantity = () => {
  if (quantity.value < props.product.stock) {
    quantity.value++
  }
}

const decrementQuantity = () => {
  if (quantity.value > 1) {
    quantity.value--
  }
}

const addToCart = () => {
  if (quantity.value <= props.product.stock) {
    const productToAdd = {
      id: props.product.id,
      name: props.product.name,
      price: discountedPrice.value,
      imageHash: props.product.imageHash
    }
    cartStore.addProduct(productToAdd, quantity.value)
    emit('close')
  } else {
    console.error('Quantity exceeds stock')
  }
}

const productImageUrl1 = computed(() => {
  if (props.product.imageHash) {
    const isBase64 =
      props.product.imageHash.startsWith('/') || props.product.imageHash.includes('base64')

    if (isBase64) {
      return `data:image/png;base64,${props.product.imageHash}`
    } else {
      return props.product.imageHash
    }
  }
  return 'https://via.placeholder.com/230x230/cccccc/ffffff?text=No+Image'
})

const productImageUrl2 = computed(() => {
  if (props.product.imageHash2) {
    const isBase64 =
      props.product.imageHash2.startsWith('/') || props.product.imageHash2.includes('base64')

    if (isBase64) {
      return `data:image/png;base64,${props.product.imageHash2}`
    } else {
      return props.product.imageHash2
    }
  }
  return 'https://via.placeholder.com/230x230/cccccc/ffffff?text=No+Image'
})

const nextImage = () => {
  currentImageIndex.value = (currentImageIndex.value + 1) % 2
}

const previousImage = () => {
  currentImageIndex.value = (currentImageIndex.value - 1 + 2) % 2
}

const currentImageUrl = computed(() => {
  return currentImageIndex.value === 0 ? productImageUrl1.value : productImageUrl2.value
})

const isZoomed = ref(false)
const zoomStyle = ref({
  width: '250px',
  height: '250px',
  backgroundSize: '800px 800px',
  backgroundPosition: '0% 0%',
  backgroundColor: 'white',
  border: '2px solid #000',
  position: 'absolute',
  top: '0',
  left: '0',
})

const productImage = ref(null)

const zoomIn = (event) => {
  isZoomed.value = true
  const imageRect = productImage.value.getBoundingClientRect()
  const x = ((event.clientX - imageRect.left) / imageRect.width) * 100
  const y = ((event.clientY - imageRect.top) / imageRect.height) * 100

  zoomStyle.value = {
    ...zoomStyle.value,
    backgroundImage: `url(${currentImageUrl.value})`,
    backgroundPosition: `${x}% ${y}%`,
    backgroundColor: 'white',
    top: `${event.clientY - imageRect.top - 125}px`,
    left: `${event.clientX - imageRect.left - 125}px`,
  }
}

const zoomOut = () => {
  isZoomed.value = false
}
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
              <div
                class="relative flex w-full items-center overflow-hidden bg-white px-4 pb-8 pt-14 shadow-2xl sm:px-6 sm:pt-8 md:p-6 lg:p-8">
                <button type="button"
                  class="absolute right-4 top-4 text-gray-400 hover:text-gray-500 sm:right-6 sm:top-8 md:right-6 md:top-6 lg:right-8 lg:top-8"
                  @click="emit('close')">
                  <span class="sr-only">Close</span>
                  <XMarkIcon class="h-6 w-6" aria-hidden="true" />
                </button>

                <div class="grid w-full grid-cols-1 items-start gap-x-6 gap-y-8 sm:grid-cols-12 lg:gap-x-8">
                  <div
                    class="relative flex flex-col justify-center items-center aspect-h-1 aspect-w-1 overflow-hidden rounded-lg sm:col-span-4 lg:col-span-5">
                    <div class="relative" @mousemove="zoomIn" @mouseleave="zoomOut">
                      <img :src="currentImageUrl" alt="Product image" ref="productImage"
                        class="h-[320px] w-[320px] max-w-full max-h-full object-contain object-center" />
                      <div v-show="isZoomed" class="absolute pointer-events-none" :style="zoomStyle"></div>
                    </div>
                    <div class="flex justify-between w-full">
                      <button @click="previousImage" class="mt-2 ml-5 text-blue-500">Previous</button>
                      <button @click="nextImage" class="mt-2 mr-5 text-blue-500">Next</button>
                    </div>
                  </div>

                  <div class="sm:col-span-8 lg:col-span-7">
                    <div class="w-auto flex place-items-center justify-between pr-10">
                      <div>
                        <BadgeCard :id="product.name" :stock="product.stock"
                          :isDiscount="product.discount > 0 ? true : false"
                          :discount="product.discount > 0 ? product.discount : 0" :isNew="product.new" />
                      </div>
                      <FavoriteIcon :productId="product.id" />
                    </div>
                    <p class="text-sm text-gray-900 mt-2">
                      {{ props.product.category?.name || t('category') }}
                    </p>
                    <h2 class="text-2xl font-bold text-gray-900 sm:pr-12">
                      {{ props.product.name || t('productName') }}
                    </h2>

                    <section aria-labelledby="information-heading">
                      <div class="py-4">
                        <h4 class="sr-only">Reviews</h4>
                        <div class="flex items-center">
                          <div class="flex items-center">
                            <StarIcon v-for="rating in 5" :key="rating" :class="{
                              'text-yellow-500': (props.product.averageRating || 0) >= rating,
                              'text-gray-200': (props.product.averageRating || 0) < rating,
                              'h-5 w-5 flex-shrink-0': true
                            }" aria-hidden="true" />
                          </div>
                          <div class="ml-3 text-sm font-medium text-indigo-600 hover:text-indigo-500">
                            {{ props.product.totalReviews || 0 }} reviews
                          </div>
                        </div>
                      </div>
                      <p v-if="props.product.discount > 0" class="line-through text-gray-500 text-sm">
                        {{ props.product.price.toFixed(2) }}€
                      </p>
                      <h3 class="text-2xl font-semibold"
                        :class="props.product.discount > 0 ? 'text-red-600' : 'text-gray-900'">
                        {{ discountedPrice }}€
                      </h3>
                      <div class="py-4">
                        <h4 class="text-lg text-gray-900 font-semibold">{{ t('description') }}</h4>
                        <p class="text-sm text-gray-900">
                          {{ props.product.description || 'Description not available.' }}
                        </p>
                      </div>
                    </section>
                    <section aria-labelledby="options-heading">
                      <h3 id="options-heading" class="sr-only">Product Options</h3>
                      <div class="mt-4">
                        <label for="quantity" class="block text-sm font-semibold text-gray-900">Qty.</label>
                        <div class="flex mt-1">
                          <button @click="decrementQuantity"
                            class="px-2 py-1 border rounded-l-md bg-gray-200 hover:bg-gray-300">
                            -
                          </button>
                          <input id="quantity" type="number" min="1" v-model="quantity"
                            class="w-16 border text-center" />
                          <button @click="incrementQuantity"
                            class="px-2 py-1 border rounded-r-md bg-gray-200 hover:bg-gray-300">
                            +
                          </button>
                        </div>
                        <p v-if="maxStockReached" class="text-sm text-red-600 mt-1">
                          Maximum stock reached!
                        </p>
                      </div>
                    </section>
                    <button @click="addToCart"
                      class="mt-4 w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700">
                      {{ t('addToCart') }}
                    </button>
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

<style scoped>
.image-container {
  position: relative;
  display: inline-block;
}

.zoom-lens {
  position: absolute;
  border: 2px solid #000;
  width: 100px;
  height: 100px;
  visibility: hidden;
  cursor: none;
}

.zoom-result {
  border: 1px solid #d4d4d4;
  width: 250px;
  height: 250px;
  position: absolute;
  top: 0;
  right: -270px;
  overflow: hidden;
  visibility: hidden;
}

.zoom-result img {
  position: absolute;
  width: 200%;
  height: auto;
}
</style>