<script setup>
import { ref } from 'vue'
import ShoppingCart from '../ShoppingCart/ShoppingCart.vue'
import {
  Dialog,
  DialogPanel,
  PopoverGroup,
  TransitionChild,
  TransitionRoot
} from '@headlessui/vue'
import { Bars3Icon, XMarkIcon } from '@heroicons/vue/24/outline'
import LanguageSelector from './LanguageSelector.vue'
import ProfileMenu from './ProfileMenu.vue'

const navigation = {
  pages: [{ name: 'Products', href: '/products' }]
}

const open = ref(false)
</script>
<template>
  <div class="bg-white">
    <TransitionRoot as="template" :show="open">
      <Dialog class="relative z-40 lg:hidden" @close="open = false">
        <TransitionChild as="template" enter="transition-opacity ease-linear duration-300" enter-from="opacity-0"
          enter-to="opacity-100" leave="transition-opacity ease-linear duration-300" leave-from="opacity-100"
          leave-to="opacity-0">
          <div class="fixed inset-0 bg-black bg-opacity-25" />
        </TransitionChild>

        <div class="fixed inset-0 z-40 flex">
          <TransitionChild as="template" enter="transition ease-in-out duration-300 transform"
            enter-from="-translate-x-full" enter-to="translate-x-0"
            leave="transition ease-in-out duration-300 transform" leave-from="translate-x-0"
            leave-to="-translate-x-full">
            <DialogPanel class="relative flex w-full max-w-xs flex-col overflow-y-auto bg-slate-950 pb-12 shadow-xl">
              <div class="flex px-4 pb-2 pt-5">
                <button type="button"
                  class="relative -m-2 inline-flex items-center justify-center rounded-md p-2 text-white"
                  @click="open = false">
                  <span class="absolute -inset-0.5" />
                  <span class="sr-only">Close menu</span>
                  <XMarkIcon class="h-6 w-6" aria-hidden="true" />
                </button>
              </div>

              <div class="space-y-6 border-t border-white px-4 py-6">
                <div v-for="page in navigation.pages" :key="page.name" class="flow-root">
                  <a :href="page.href" class="-m-2 block p-2 font-medium text-white">{{
                    page.name
                  }}</a>
                </div>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </Dialog>
    </TransitionRoot>

    <header class="relative bg-slate-950">
      <nav aria-label="Top" class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div>
          <div class="flex h-16 items-center">
            <button type="button" class="relative rounded-md bg-white p-1 text-black lg:hidden" @click="open = true">
              <span class="absolute -inset-0.5" />
              <span class="sr-only">Open menu</span>
              <Bars3Icon class="h-6 w-6" aria-hidden="true" />
            </button>

            <div class="ml-4 flex lg:ml-0">
              <RouterLink to="/">
                <span class="sr-only">FunkoShop</span>
                <img class="h-10 w-auto" src="../../assets/img/logos/WhiteLogo.svg" alt="" />
              </RouterLink>
            </div>

            <PopoverGroup class="hidden lg:ml-8 lg:block lg:self-stretch">
              <div class="flex h-full space-x-8">
                <a v-for="page in navigation.pages" :key="page.name" :href="page.href"
                  class="flex items-center text-sm font-medium text-white hover:text-blueFunko-300">{{ page.name }}</a>

              </div>
            </PopoverGroup>

            <div class="ml-auto flex items-center">
              <LanguageSelector />

              <div class="ml-4 flow-root lg:ml-6 bg-white rounded-md">
                <ProfileMenu />
              </div>
              <div class="ml-4 flow-root lg:ml-6 bg-white rounded-md">
                <ShoppingCart></ShoppingCart>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </header>
  </div>
</template>