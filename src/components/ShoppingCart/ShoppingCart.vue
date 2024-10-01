<script setup>
import { ref, computed, watch } from 'vue';
import { Dialog, DialogPanel, DialogTitle, TransitionChild, TransitionRoot } from '@headlessui/vue';
import { XMarkIcon, ShoppingBagIcon } from '@heroicons/vue/24/outline';
import { useCartStore } from '@/stores/cart/cartStore';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/auth';
import LoginModal from '@/components/LoginModal.vue';

const open = ref(false);
const openLogin = ref(false);
const attemptedCheckout = ref(false);

const cartStore = useCartStore();
const authStore = useAuthStore();
const router = useRouter();

const cartProducts = computed(() => {
  return cartStore.products;
});

const totalPrice = computed(() => {
  return cartStore.totalPrice;
});

const removeFromCart = (id) => {
  if (!cartProducts.value) {
    return;
  }


  const productExists = cartProducts.value.find(product => product.id === id);
  if (productExists) {
    cartStore.removeProduct(id);
  }
};

const checkout = () => {
  if (authStore.user.isAuthenticated) {
    open.value = false;
    router.push('/checkout');
  } else {
    attemptedCheckout.value = true;
    open.value = false;
    openLogin.value = true;
  }
};

const handleLoginSuccess = () => {
  openLogin.value = false;
  
  if (attemptedCheckout.value) {
    attemptedCheckout.value = false;
    router.push('/checkout');
  }
};

watch(
  () => authStore.user.isAuthenticated,  
  (isAuthenticated) => {
    if (isAuthenticated && attemptedCheckout.value) {
      attemptedCheckout.value = false; 
      router.push('/checkout');         
    }
  }
);
</script>

<template>
  <button @click="open = true" class="px-1.5 py-1.5">
    <ShoppingBagIcon class="h-5 w-5 flex-shrink-0 text-black group-hover:text-gray-400" aria-hidden="true" />
  </button>
  <TransitionRoot as="template" :show="open">
    <Dialog class="relative z-10" @close="open = false">
      <TransitionChild as="template" enter="ease-in-out duration-500" enter-from="opacity-0" enter-to="opacity-100"
        leave="ease-in-out duration-500" leave-from="opacity-100" leave-to="opacity-0">
        <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
      </TransitionChild>

      <div class="fixed inset-0 overflow-hidden">
        <div class="absolute inset-0 overflow-hidden">
          <div class="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
            <TransitionChild as="template" enter="transform transition ease-in-out duration-500 sm:duration-700"
              enter-from="translate-x-full" enter-to="translate-x-0"
              leave="transform transition ease-in-out duration-500 sm:duration-700" leave-from="translate-x-0"
              leave-to="translate-x-full">
              <DialogPanel class="pointer-events-auto w-screen max-w-md">
                <div class="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                  <div class="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
                    <div class="flex items-start justify-between">
                      <DialogTitle class="text-lg font-medium text-gray-900">Shopping cart</DialogTitle>
                      <div class="ml-3 flex h-7 items-center">
                        <button type="button" class="relative -m-2 p-2 text-gray-400 hover:text-gray-500"
                          @click="open = false">
                          <span class="absolute -inset-0.5" />
                          <span class="sr-only">Close panel</span>
                          <XMarkIcon class="h-6 w-6" aria-hidden="true" />
                        </button>
                      </div>
                    </div>

                    <div class="mt-8">
                      <div class="flow-root">
                        <ul role="list" class="-my-6 divide-y divide-gray-200">

                          <li v-for="product in cartProducts" :key="product.id" class="flex py-6">
                            <div class="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                              <!-- <img
                                :src="product.imageSrc" 
                                :alt="product.imageAlt" 
                                class="h-full w-full object-cover object-center"
                              /> -->
                              <img src="../../assets/img/CardImage/Groot.png" alt="Groot"
                                class="h-full w-full object-cover object-center" />
                            </div>

                            <div class="ml-4 flex flex-1 flex-col">
                              <div>
                                <div class="flex justify-between text-base font-medium text-gray-900">
                                  <h3>
                                    <a :href="product.href">{{ product.name }}</a>
                                  </h3>
                                  <p v-if="product.discount && product.discount.active"
                                    class="text-red-600 font-semibold">
                                    {{ product.price.toFixed(2) }}€
                                  </p>
                                  <p v-if="product.discount && product.discount.active"
                                    class="text-gray-500 line-through">
                                    {{ product.originalPrice.toFixed(2) }}€
                                  </p>
                                  <p v-else>
                                    {{ product.price.toFixed(2) }}€
                                  </p>
                                </div>
                                <p class="mt-1 text-sm text-gray-500">{{ product.category }}</p>
                              </div>
                              <div class="flex flex-1 items-end justify-between text-sm">
                                <p class="text-gray-500">Qty {{ product.quantity }}</p>

                                <div class="flex">
                                  <button type="button" class="font-medium text-red-500 hover:text-red-600"
                                    @click="removeFromCart(product.id)">
                                    Remove
                                  </button>
                                </div>
                              </div>
                            </div>
                          </li>
                          <template v-if="!cartProducts.length">
                            <li class="flex py-6 text-center w-full text-gray-500">
                              No products in the cart
                            </li>
                          </template>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div class="border-t border-gray-200 px-4 py-6 sm:px-6">
                    <div class="flex justify-between text-base font-medium text-gray-900">
                      <p>Subtotal</p>
                      <p>{{ totalPrice }}€</p>
                    </div>
                    <p class="mt-0.5 text-sm text-gray-500">
                      Shipping and taxes calculated at checkout.
                    </p>
                    <div class="mt-6">
                      <button @click="checkout"
                        class="w-full bg-blueFunko-700 text-white py-3 rounded-md hover:bg-blueFunko-800 transition">
                        Go to Checkout
                      </button>
                    </div>
                    <div class="mt-6 flex justify-center text-center text-sm text-gray-500">
                      <p>
                        or{{ ' ' }}
                        <button type="button" class="font-medium text-blueFunko-500 hover:text-blueFunko-600"
                          @click="open = false">
                          Continue Shopping
                          <span aria-hidden="true"> &rarr;</span>
                        </button>
                      </p>
                    </div>
                  </div>
                </div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
  <div v-if="!authStore.user.isAuthenticated" class="relative">
    <TransitionRoot as="template" :show="openLogin">
      <Dialog class="relative z-10" @close="openLogin = false">
        <TransitionChild
          as="template"
          enter="ease-out duration-300"
          enter-from="opacity-0"
          enter-to="opacity-100"
          leave="ease-in duration-200"
          leave-from="opacity-100"
          leave-to="opacity-0"
        >
          <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </TransitionChild>

        <div class="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <TransitionChild
              as="template"
              enter="ease-out duration-300"
              enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enter-to="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leave-from="opacity-100 translate-y-0 sm:scale-100"
              leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <DialogPanel class="shadow-xl transition-all w-full max-w-md rounded-2xl">
                <LoginModal @close="openLogin = false" @login-success="handleLoginSuccess" />
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </TransitionRoot>
  </div>
</template>
