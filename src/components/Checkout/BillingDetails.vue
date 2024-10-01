<script setup>
import { ref } from 'vue';
import { useAuthStore } from '@/stores/auth';
import { ProfileStore } from '@/stores/Profile/ProfileStore';

const store = ProfileStore();
const auth = useAuthStore();

const firstName = ref('');
const lastName = ref('');
const street = ref('');
const city = ref('');
const region = ref('');
const postalCode = ref('');
const country = ref('');
const phoneNumber = ref('');

async function getProfile() {
  const response = await store.getProfile(auth.user.access_token);

  if (response.phoneNumber) {
    const splitPhoneNumber = response.phoneNumber.split('-');
    phoneNumber.value = splitPhoneNumber[1];
  }
  
  firstName.value = response.firstName;
  lastName.value = response.lastName;
  street.value = response.street;
  city.value = response.city;
  region.value = response.region;
  postalCode.value = response.postalCode;
  country.value = response.country;
}

getProfile();
</script>
<template>
    <div class="grid grid-cols-2 gap-4">
      <div>
        <input
          type="text"
          id="first-name"
          v-model="firstName"
          class="mt-1 block w-full rounded-md py-2.5 px-4 border-gray-300 border focus:ring-2 focus:ring-inset focus:outline-blueFunko-400/60 focus:ring-blueFunko-300/60 placeholder:text-sm font-light"
          placeholder="First name*"
        />
      </div>
      <div>
        <input
          type="text"
          id="last-name"
          v-model="lastName"
          class="mt-1 block w-full rounded-md py-2.5 px-4 border-gray-300 border focus:ring-2 focus:ring-inset focus:outline-blueFunko-400/60 focus:ring-blueFunko-300/60 placeholder:text-sm font-light"
          placeholder="Last name*"
        />
      </div>
  
      <div>
        <input
          type="text"
          id="street"
          v-model="street"
          class="mt-1 block w-full rounded-md py-2.5 px-4 border-gray-300 border focus:ring-2 focus:ring-inset focus:outline-blueFunko-400/60 focus:ring-blueFunko-300/60 placeholder:text-sm font-light"
          placeholder="Address*"
        />
      </div>
  
      <div>
        <input
          type="text"
          id="city"
          v-model="city"
          class="mt-1 block w-full rounded-md py-2.5 px-4 border-gray-300 border focus:ring-2 focus:ring-inset focus:outline-blueFunko-400/60 focus:ring-blueFunko-300/60 placeholder:text-sm font-light"
          placeholder="City / Town*"
        />
      </div>
  
      <div>
        <input
          type="text"
          id="postcode"
          v-model="postalCode"
          class="mt-1 block w-full rounded-md py-2.5 px-4 border-gray-300 border focus:ring-2 focus:ring-inset focus:outline-blueFunko-400/60 focus:ring-blueFunko-300/60 placeholder:text-sm font-light"
          placeholder="Postcode / ZIP*"
        />
      </div>
      <div>
        <input
          type="text"
          id="phone"
          v-model="phoneNumber"
          class="mt-1 block w-full rounded-md py-2.5 px-4 border-gray-300 border focus:ring-2 focus:ring-inset focus:outline-blueFunko-400/60 focus:ring-blueFunko-300/60 placeholder:text-sm font-light"
          placeholder="Phone*"
        />
      </div>
      <div>
        <input
          type="text"
          id="country"
          v-model="country"
          class="mt-1 block w-full rounded-md py-2.5 px-4 border-gray-300 border focus:ring-2 focus:ring-inset focus:outline-blueFunko-400/60 focus:ring-blueFunko-300/60 placeholder:text-sm font-light"
          placeholder="Country*"
        />
      </div>
    </div>
  
    <div>
      <textarea
        id="additional-info"
        class="mt-1 block w-full rounded-md py-2.5 h-52 px-4 border-gray-300 border focus:ring-2 focus:ring-inset focus:outline-blueFunko-400/60 focus:ring-blueFunko-300/60 placeholder:text-sm font-light text-start"
        placeholder="Additional information"
      ></textarea>
    </div>
  </template>
  
  