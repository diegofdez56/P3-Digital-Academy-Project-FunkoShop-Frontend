<script setup></script>

<template>
  <div class="md:col-span-7 max-w-[640px] flex flex-col gap-5 md:gap-8">
    <div class="flex flex-col gap-2">
      <h2 class="text-blueFunko-50 text-2xl md:text-4xl font-semibold uppercase">
        Subscribe to Our Newsletter for Exclusive Offers!
      </h2>
      <div class="text-blueFunko-50/90 text-lg md:text-xl font-open-sans">
        Get notified about new releases, discounts, and more.
      </div>
    </div>

    <form class="flex flex-wrap lg:gap-0 gap-4">
      <input
        type="email"
        placeholder="Enter email address"
        class="w-full lg:max-w-[395px] px-6 py-4 rounded-full lg:rounded-r-[30px] focus:outline-none focus:bg-blueFunko-50 placeholder:text-slate-400 text-slate-950"
      />
      <button
        type="submit"
        class="px-6 py-4 bg-blueFunko-200 hover:bg-blueFunko-300 text-slate-900 font-semibold rounded-full lg:rounded-l-[30px]"
      >
        SUBSCRIBE
      </button>
    </form>
  </div>
</template>
