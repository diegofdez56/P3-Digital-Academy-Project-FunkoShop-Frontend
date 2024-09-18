<script setup>
import { ref } from 'vue'
import {
    Dialog,
    DialogPanel,
    Popover,
    PopoverButton,
    PopoverGroup,
    PopoverPanel,
    Tab,
    TabGroup,
    TabList,
    TabPanel,
    TabPanels,
    TransitionChild,
    TransitionRoot,
} from '@headlessui/vue'
import { Bars3Icon, ShoppingBagIcon, XMarkIcon } from '@heroicons/vue/24/outline'
import LanguageSelector from './LanguageSelector.vue';

const navigation = {
    categories: [
        {
            id: 'women',
            name: 'Women',
            featured: [
                {
                    name: 'New Arrivals',
                    href: '#',
                    imageSrc: 'https://tailwindui.com/img/ecommerce-images/mega-menu-category-01.jpg',
                    imageAlt: 'Models sitting back to back, wearing Basic Tee in black and bone.',
                },
                {
                    name: 'Basic Tees',
                    href: '#',
                    imageSrc: 'https://tailwindui.com/img/ecommerce-images/mega-menu-category-02.jpg',
                    imageAlt: 'Close up of Basic Tee fall bundle with off-white, ochre, olive, and black tees.',
                },
            ],
            sections: [
                {
                    id: 'clothing',
                    name: 'Clothing',
                    items: [
                        { name: 'Tops', href: '#' },
                        { name: 'Dresses', href: '#' },
                        { name: 'Pants', href: '#' },
                        { name: 'Denim', href: '#' },
                        { name: 'Sweaters', href: '#' },
                        { name: 'T-Shirts', href: '#' },
                        { name: 'Jackets', href: '#' },
                        { name: 'Activewear', href: '#' },
                        { name: 'Browse All', href: '#' },
                    ],
                },
                {
                    id: 'accessories',
                    name: 'Accessories',
                    items: [
                        { name: 'Watches', href: '#' },
                        { name: 'Wallets', href: '#' },
                        { name: 'Bags', href: '#' },
                        { name: 'Sunglasses', href: '#' },
                        { name: 'Hats', href: '#' },
                        { name: 'Belts', href: '#' },
                    ],
                },
                {
                    id: 'brands',
                    name: 'Brands',
                    items: [
                        { name: 'Full Nelson', href: '#' },
                        { name: 'My Way', href: '#' },
                        { name: 'Re-Arranged', href: '#' },
                        { name: 'Counterfeit', href: '#' },
                        { name: 'Significant Other', href: '#' },
                    ],
                },
            ],
        },
        {
            id: 'men',
            name: 'Men',
            featured: [
                {
                    name: 'New Arrivals',
                    href: '#',
                    imageSrc: 'https://tailwindui.com/img/ecommerce-images/product-page-04-detail-product-shot-01.jpg',
                    imageAlt: 'Drawstring top with elastic loop closure and textured interior padding.',
                },
                {
                    name: 'Artwork Tees',
                    href: '#',
                    imageSrc: 'https://tailwindui.com/img/ecommerce-images/category-page-02-image-card-06.jpg',
                    imageAlt:
                        'Three shirts in gray, white, and blue arranged on table with same line drawing of hands and shapes overlapping on front of shirt.',
                },
            ],
            sections: [
                {
                    id: 'clothing',
                    name: 'Clothing',
                    items: [
                        { name: 'Tops', href: '#' },
                        { name: 'Pants', href: '#' },
                        { name: 'Sweaters', href: '#' },
                        { name: 'T-Shirts', href: '#' },
                        { name: 'Jackets', href: '#' },
                        { name: 'Activewear', href: '#' },
                        { name: 'Browse All', href: '#' },
                    ],
                },
                {
                    id: 'accessories',
                    name: 'Accessories',
                    items: [
                        { name: 'Watches', href: '#' },
                        { name: 'Wallets', href: '#' },
                        { name: 'Bags', href: '#' },
                        { name: 'Sunglasses', href: '#' },
                        { name: 'Hats', href: '#' },
                        { name: 'Belts', href: '#' },
                    ],
                },
                {
                    id: 'brands',
                    name: 'Brands',
                    items: [
                        { name: 'Re-Arranged', href: '#' },
                        { name: 'Counterfeit', href: '#' },
                        { name: 'Full Nelson', href: '#' },
                        { name: 'My Way', href: '#' },
                    ],
                },
            ],
        },
    ],
    pages: [
        { name: 'Company', href: '#' },
        { name: 'Stores', href: '#' },
    ],
}

const open = ref(false)
</script>
<template>
    <div class="bg-white">
        <TransitionRoot as="template" :show="open">
            <Dialog class="relative z-40 lg:hidden" @close="open = false">
                <TransitionChild as="template" enter="transition-opacity ease-linear duration-300"
                    enter-from="opacity-0" enter-to="opacity-100" leave="transition-opacity ease-linear duration-300"
                    leave-from="opacity-100" leave-to="opacity-0">
                    <div class="fixed inset-0 bg-black bg-opacity-25" />
                </TransitionChild>

                <div class="fixed inset-0 z-40 flex">
                    <TransitionChild as="template" enter="transition ease-in-out duration-300 transform"
                        enter-from="-translate-x-full" enter-to="translate-x-0"
                        leave="transition ease-in-out duration-300 transform" leave-from="translate-x-0"
                        leave-to="-translate-x-full">
                        <DialogPanel
                            class="relative flex w-full max-w-xs flex-col overflow-y-auto bg-slate-950 pb-12 shadow-xl">
                            <div class="flex px-4 pb-2 pt-5">
                                <button type="button"
                                    class="relative -m-2 inline-flex items-center justify-center rounded-md p-2 text-white"
                                    @click="open = false">
                                    <span class="absolute -inset-0.5" />
                                    <span class="sr-only">Close menu</span>
                                    <XMarkIcon class="h-6 w-6" aria-hidden="true" />
                                </button>
                            </div>

                            <TabGroup as="div" class="mt-2">
                                <div class="border-b border-gray-200">
                                    <TabList class="-mb-px flex space-x-8 px-4">
                                        <Tab as="template" v-for="category in navigation.categories"
                                            :key="category.name" v-slot="{ selected }">
                                            <button
                                                :class="[selected ? 'border-blueFunko-200 text-blueFunko-300' : 'border-transparent text-white', 'flex-1 whitespace-nowrap border-b-2 px-1 py-4 text-base font-medium']">{{
                                                    category.name }}</button>
                                        </Tab>
                                    </TabList>
                                </div>
                                <TabPanels as="template">
                                    <TabPanel v-for="category in navigation.categories" :key="category.name"
                                        class="space-y-10 px-4 pb-8 pt-10">
                                        <div class="grid grid-cols-2 gap-x-4">
                                            <div v-for="item in category.featured" :key="item.name"
                                                class="group relative text-sm">
                                                <div
                                                    class="aspect-h-1 aspect-w-1 overflow-hidden rounded-lg bg-gray-100 group-hover:opacity-75">
                                                    <img :src="item.imageSrc" :alt="item.imageAlt"
                                                        class="object-cover object-center" />
                                                </div>
                                                <a :href="item.href" class="mt-6 block font-medium text-white">
                                                    <span class="absolute inset-0 z-10" aria-hidden="true" />
                                                    {{ item.name }}
                                                </a>
                                                <p aria-hidden="true" class="mt-1">Shop now</p>
                                            </div>
                                        </div>
                                        <div v-for="section in category.sections" :key="section.name">
                                            <p :id="`${category.id}-${section.id}-heading-mobile`"
                                                class="font-medium text-white">{{ section.name }}</p>
                                            <ul role="list"
                                                :aria-labelledby="`${category.id}-${section.id}-heading-mobile`"
                                                class="mt-6 flex flex-col space-y-6">
                                                <li v-for="item in section.items" :key="item.name" class="flow-root">
                                                    <a :href="item.href" class="-m-2 block p-2 text-white">{{
                                                        item.name }}</a>
                                                </li>
                                            </ul>
                                        </div>
                                    </TabPanel>
                                </TabPanels>
                            </TabGroup>

                            <div class="space-y-6 border-t border-white px-4 py-6">
                                <div v-for="page in navigation.pages" :key="page.name" class="flow-root">
                                    <a :href="page.href" class="-m-2 block p-2 font-medium text-white">{{ page.name
                                        }}</a>
                                </div>
                            </div>

                            <div class="space-y-6 border-t border-gray-200 px-4 py-6">
                                <div class="flow-root">
                                    <a href="#" class="-m-2 block p-2 font-medium text-white">Sign in</a>
                                </div>
                                <div class="flow-root">
                                    <a href="#" class="-m-2 block p-2 font-medium text-white">Create account</a>
                                </div>
                            </div>
                        </DialogPanel>
                    </TransitionChild>
                </div>
            </Dialog>
        </TransitionRoot>

        <header class="relative bg-slate-950">

            <nav aria-label="Top" class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div class="border-b border-gray-200">
                    <div class="flex h-16 items-center">
                        <button type="button" class="relative rounded-md bg-white p-1 text-black lg:hidden"
                            @click="open = true">
                            <span class="absolute -inset-0.5" />
                            <span class="sr-only">Open menu</span>
                            <Bars3Icon class="h-6 w-6" aria-hidden="true" />
                        </button>

                        <div class="ml-4 flex lg:ml-0">
                            <a href="#">
                                <span class="sr-only">Your Company</span>
                                <img class="h-10 w-auto" src="../assets/img/logos/WhiteLogo.svg" alt="" />
                            </a>
                        </div>

                        <PopoverGroup class="hidden lg:ml-8 lg:block lg:self-stretch">
                            <div class="flex h-full space-x-8">
                                <Popover v-for="category in navigation.categories" :key="category.name" class="flex"
                                    v-slot="{ open }">
                                    <div class="relative flex">
                                        <PopoverButton
                                            :class="[open ? 'border-blueFunko-300 text-blueFunko-300' : 'border-transparent text-white hover:text-blueFunko-300', 'relative z-10 -mb-px flex items-center border-b-2 pt-px text-sm font-medium transition-colors duration-200 ease-out']">
                                            {{ category.name }}</PopoverButton>
                                    </div>

                                    <transition enter-active-class="transition ease-out duration-200"
                                        enter-from-class="opacity-0" enter-to-class="opacity-100"
                                        leave-active-class="transition ease-in duration-150"
                                        leave-from-class="opacity-100" leave-to-class="opacity-0">
                                        <PopoverPanel class="absolute inset-x-0 top-full text-sm text-white">
                                            <div class="absolute inset-0 top-1/2 bg-white shadow" aria-hidden="true" />

                                            <div class="relative bg-slate-950">
                                                <div class="mx-auto max-w-7xl px-8">
                                                    <div class="grid grid-cols-2 gap-x-8 gap-y-10 py-16">
                                                        <div class="col-start-2 grid grid-cols-2 gap-x-8">
                                                            <div v-for="item in category.featured" :key="item.name"
                                                                class="group relative text-base sm:text-sm">
                                                                <div
                                                                    class="aspect-h-1 aspect-w-1 overflow-hidden rounded-lg bg-gray-100 group-hover:opacity-75">
                                                                    <img :src="item.imageSrc" :alt="item.imageAlt"
                                                                        class="object-cover object-center" />
                                                                </div>
                                                                <a :href="item.href"
                                                                    class="mt-6 block font-medium text-white">
                                                                    <span class="absolute inset-0 z-10"
                                                                        aria-hidden="true" />
                                                                    {{ item.name }}
                                                                </a>
                                                                <p aria-hidden="true" class="mt-1">Shop now</p>
                                                            </div>
                                                        </div>
                                                        <div
                                                            class="row-start-1 grid grid-cols-3 gap-x-8 gap-y-10 text-sm">
                                                            <div v-for="section in category.sections"
                                                                :key="section.name">
                                                                <p :id="`${section.name}-heading`"
                                                                    class="font-medium text-blueFunko-300">{{ section.name }}
                                                                </p>
                                                                <ul role="list"
                                                                    :aria-labelledby="`${section.name}-heading`"
                                                                    class="mt-6 space-y-6 sm:mt-4 sm:space-y-4">
                                                                    <li v-for="item in section.items" :key="item.name"
                                                                        class="flex">
                                                                        <a :href="item.href"
                                                                            class="hover:text-blueFunko-200">{{ item.name
                                                                            }}</a>
                                                                    </li>
                                                                </ul>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </PopoverPanel>
                                    </transition>
                                </Popover>

                                <a v-for="page in navigation.pages" :key="page.name" :href="page.href"
                                    class="flex items-center text-sm font-medium text-white hover:text-blueFunko-300">{{
                                        page.name }}</a>
                            </div>
                        </PopoverGroup>

                        <div class="ml-auto flex items-center">
                            <LanguageSelector />

                            <div class="flex lg:ml-6 p-1">
                                <a href="#" class="p-1 inline-flex gap-x-2 items-center">
                                    <span class="sr-only">Profile</span>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
                                        class="size-8 bg-white rounded-md p-1">
                                        <path fill-rule="evenodd"
                                            d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z"
                                            clip-rule="evenodd" />
                                    </svg>
                                    <p class="text-white text-xs font-semibold">
                                        SIGN IN
                                    </p>
                                </a>
                            </div>

                            <div class="ml-4 flow-root lg:ml-6 bg-white p-1 rounded-md">
                                <a href="#" class="group -m-2 flex items-center p-2">
                                    <ShoppingBagIcon class="h-6 w-6 flex-shrink-0 text-black" aria-hidden="true" />
                                    <span class="sr-only">items in cart, view bag</span>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
        </header>
    </div>
</template>