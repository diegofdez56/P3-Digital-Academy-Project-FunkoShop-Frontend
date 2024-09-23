<script setup>
const products = [
  {
    id: 1,
    name: 'Product Title',
    href: '#',
    category: 'Category',
    price: '90.00€',
    quantity: 1,
    imageSrc: '/src/assets/img/CardImage/Groot.png',
    imageAlt: 'Product Image Description'
  },
  {
    id: 2,
    name: 'Product Title',
    href: '#',
    category: 'Category',
    price: '32.00€',
    quantity: 1,
    imageSrc: '/src/assets/img/CardImage/Groot.png',
    imageAlt: 'Product Image Description'
  }
]
</script>

<template>
  <div class="grid grid-cols-1 md:grid-cols-2 gap-8 p-6 lg:p-24">
    <!-- Left: Checkout Form -->
    <div class="space-y-6">
      <h2 class="text-2xl font-semibold">Billing Details</h2>

      <!-- Form Fields -->
      <div class="grid grid-cols-2 gap-4">
        <div>
          <input
            type="text"
            id="first-name"
            class="mt-1 block w-full rounded-md py-2.5 px-4 border-gray-300 border focus:ring-2 focus:ring-inset focus:outline-blueFunko-400/60 focus:ring-blueFunko-300/60 placeholder: text-sm font-light"
            placeholder="First name*"
          />
        </div>
        <div>
          <input
            type="text"
            id="last-name"
            class="mt-1 block w-full rounded-md py-2.5 px-4 border-gray-300 border focus:ring-2 focus:ring-inset focus:outline-blueFunko-400/60 focus:ring-blueFunko-300/60 placeholder: text-sm font-light"
            placeholder="Last name*"
          />
        </div>

        <div>
          <input
            type="text"
            id="address"
            class="mt-1 block w-full rounded-md py-2.5 px-4 border-gray-300 border focus:ring-2 focus:ring-inset focus:outline-blueFunko-400/60 focus:ring-blueFunko-300/60 placeholder: text-sm font-light"
            placeholder="Address*"
          />
        </div>

        <div>
          <input
            type="text"
            id="address2"
            class="mt-1 block w-full rounded-md py-2.5 px-4 border-gray-300 border focus:ring-2 focus:ring-inset focus:outline-blueFunko-400/60 focus:ring-blueFunko-300/60 placeholder: text-sm font-light"
            placeholder="Address line 2"
          />
        </div>
        <div>
          <input
            type="text"
            id="country"
            class="mt-1 block w-full rounded-md py-2.5 px-4 border-gray-300 border focus:ring-2 focus:ring-inset focus:outline-blueFunko-400/60 focus:ring-blueFunko-300/60 placeholder: text-sm font-light"
            placeholder="Country*"
          />
        </div>
        <div>
          <input
            type="text"
            id="city"
            class="mt-1 block w-full rounded-md py-2.5 px-4 border-gray-300 border focus:ring-2 focus:ring-inset focus:outline-blueFunko-400/60 focus:ring-blueFunko-300/60 placeholder: text-sm font-light"
            placeholder="City / Town*"
          />
        </div>

        <div>
          <input
            type="text"
            id="postcode"
            class="mt-1 block w-full rounded-md py-2.5 px-4 border-gray-300 border focus:ring-2 focus:ring-inset focus:outline-blueFunko-400/60 focus:ring-blueFunko-300/60 placeholder: text-sm font-light"
            placeholder="Postcode / ZIP*"
          />
        </div>
        <div>
          <input
            type="text"
            id="phone"
            class="mt-1 block w-full rounded-md py-2.5 px-4 border-gray-300 border focus:ring-2 focus:ring-inset focus:outline-blueFunko-400/60 focus:ring-blueFunko-300/60 placeholder: text-sm font-light"
            placeholder="Phone*"
          />
        </div>
      </div>

      <div>
        <textarea
          type="text"
          id="additional-info"
          class="mt-1 block w-full rounded-md py-2.5 h-52 px-4 border-gray-300 border focus:ring-2 focus:ring-inset focus:outline-blueFunko-400/60 focus:ring-blueFunko-300/60 placeholder: text-sm font-light text-start"
          placeholder="Additional information"
        ></textarea>
      </div>

      <!-- Checkboxes -->
      <div class="flex items-center">
        <input
          type="checkbox"
          id="create-account"
          class="h-4 w-4 text-blue-600 accent-blueFunko-700 border-gray-300 rounded"
        />
        <label for="create-account" class="ml-2 block text-sm font-light text-gray-900"
          >Create Account</label
        >
      </div>
      <div class="flex items-center">
        <input
          type="checkbox"
          id="different-address"
          class="h-4 w-4 text-blue-600 accent-blueFunko-700 border-gray-300 rounded"
        />
        <label for="different-address" class="ml-2 block font-light text-sm text-gray-900"
          >Ship to a different address?</label
        >
      </div>
    </div>

    <!-- Right: Order Summary -->
    <div>
      <h2 class="text-2xl font-semibold">Your Order</h2>
      <div class="justify-between bg-slate-950 text-white flex px-8 py-4 rounded-t-xl mt-7">
        <p class="text-lg font-semibold">Product</p>
        <p class="text-lg font-semibold">Subtotal</p>
      </div>
      <!-- Products -->
      <div class="border-t border border-gray-300">
        <div
          v-for="product in products"
          :key="product.id"
          class="flex items-center justify-between border-gray-300 border-b pr-8 py-4"
        >
          <div class="flex items-center">
            <img
              :src="product.imageSrc"
              :alt="product.imageAlt"
              class="h-24 w-24 rounded-md object-cover"
            />
            <div class="ml-4">
              <h4 class="text-base font-medium">{{ product.name }}</h4>
              <p class="text-sm text-gray-500">Qty: {{ product.quantity }}</p>
            </div>
          </div>
          <p class="text-base font-medium">{{ product.price }}</p>
        </div>
      </div>
      <div class="border border-gray-300">
        <!-- Subtotal -->
        <div class="flex justify-between border-gray-300 px-8 py-3">
          <p class="font-regular text-md">Subtotal</p>
          <p class="font-medium text-md">29.00€</p>
        </div>
        <div class="flex justify-between border-gray-300 px-8 py-3">
          <p class="font-regular text-md">Shipping cost (+)</p>
          <p class="font-medium text-md">29.00€</p>
        </div>
        <div class="flex justify-between border-gray-300 px-8 py-3">
          <p class="font-regular text-md">Discount (-)</p>
          <p class="font-medium text-md text-red-600">-09.00€</p>
        </div>
      </div>
      <div class="rounded-b-xl flex justify-between border border-gray-300 px-8 py-6">
        <p class="font-regular text-md">Total Payable</p>
        <p class="font-medium text-md text-green-700">20.00€</p>
      </div>
      <!-- Payment Options -->
      <div class="mt-10">
        <div class="justify-between bg-slate-950 text-white flex px-8 py-4 rounded-t-xl">
          <h3 class="text-lg font-medium">Payment</h3>
        </div>
        <div class="border-gray-300 border py-10 px-14 rounded-b-xl">
          <div class="flex items-center">
            <input
              type="radio"
              id="cod"
              name="payment-method"
              class="h-4 w-4 text-blue-600 accent-blueFunko-700 border-gray-300"
            />
            <label for="cod" class="ml-2 block text-md font-light text-gray-900"
              >Cash on Delivery</label
            >
          </div>
          <div class="flex items-center py-4">
            <input
              type="radio"
              id="online"
              name="payment-method"
              class="h-4 w-4 text-blue-600 accent-blueFunko-700 border-gray-300"
            />
            <label for="online" class="ml-2 block text-md font-light text-gray-900"
              >Online Gateway</label
            >
          </div>
          <p class="text-xs px-1 text-ultralight text-gray-700">Paypal / Visa / MasterCard</p>
        </div>
      </div>

      <!-- Place Order Button -->
      <div class="mt-10">
        <button
          class="w-full bg-blueFunko-700 text-white text-semibold text-lg py-3 px-4 rounded-md hover:bg-blueFunko-800"
        >
          Place an order
        </button>
      </div>
    </div>
  </div>
</template>
