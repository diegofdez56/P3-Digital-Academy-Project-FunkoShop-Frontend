<script setup>
import ReviewIcon from './ReviewIcon.vue'
import FavoriteIcon from './FavoriteIcon.vue'
import BadgeCard from './BadgeCard.vue'
</script>
<template>
  <div
    class="relative flex flex-col my-6 bg-white shadow-sm border border-slate-200 rounded-lg w-64"
  >
    <div class="flex justify-between pt-3 px-3">
      <BadgeCard />
      <FavoriteIcon />
    </div>
    <div class="relative p-2 h-60 overflow-hidden rounded-xl bg-clip-border">
      <img
        src="/src/assets/img/CardImage/Groot.png"
        alt="card-image"
        class="h-full w-full object-cover rounded-md"
      />
    </div>
    <div>
      <ReviewIcon />
    </div>
    <div class="p-3">
      <p class="text-slate-600 leading-normal font-light text-xs">CATEGORY</p>
      <div class="mb-2 flex items-center justify-between">
        <p class="text-slate-800 text-md font-semibold">PRODUCT TITLE</p>
      </div>
      <div class="flex justify-between items-center">
        <p class="text-black text-sm font-semibold">$95.00</p>
        <button
          class="rounded-md bg-gray-200 py-1 px-2 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-gray-300 focus:shadow-none active:bg-gray-300 hover:bg-gray-300 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
          type="button"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.8"
            stroke="black"
            class="size-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
            />
          </svg>
        </button>
      </div>
    </div>
  </div>
</template>
