<script setup>
import { ref } from 'vue'
import { useAuthStore } from '@/stores/auth.js'

const password = ref('')
const passwordAgain = ref('')
const email = ref('')
const textAlert = ref("")

const store = useAuthStore()


async function register() {
  if (password.value !== '' && email.value !== '') {
    if (password.value === passwordAgain.value) {
      try {
        const response = await store.register(email.value, password.value);

        if (response.id) {
          store.user.id = response['id']
          store.user.email = email.value
          store.user.role = response['role']
          store.user.isAuthenticated = true
          store.user.access_token = response['access_token']
          store.user.refresh_token = response['refresh_token']

          localStorage.setItem('id', response['id'])
          localStorage.setItem('email', email.value)
          localStorage.setItem('role', response['role'])
          localStorage.setItem('isAuthenticated', "true")
          localStorage.setItem('access_token', response['access_token'])
          localStorage.setItem('refresh_token', response['refresh_token'])

          textAlert.value = '';
          password.value = '';
          passwordAgain.value = '';
          email.value = '';
        } else {
          textAlert.value = 'The email already exists!';
        }
      } catch (error) {
        textAlert.value = 'Error trying to register, please try again.';
      }
    } else {
      textAlert.value = 'Passwords do not match!';
    }
  } else {
    textAlert.value = 'Email, or password cannot be null!';
  }
}
</script>
<template>
  <div class="flex h-screen justify-center items-center backdrop-blur-sm bg-white/30">
    <div
      class="relative flex h-auto max-w-md flex-1 flex-col justify-center px-6 py-12 lg:px-8 bg-white border-2 rounded-xl border-gray-300/30 shadow-md">
      <div class="sm:mx-auto sm:w-full sm:max-w-sm">
        <img class="mx-auto h-15 w-auto" src="../assets/img/logos/BlueLogo.svg" alt="Your Company" />
      </div>

      <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form class="space-y-6" @submit.prevent="register">
          <div>
            <div class="mt-2">
              <input v-model="email" id="email" name="email" type="email" autocomplete="email" placeholder="Email"
                class="block w-full rounded-md border-0 py-2 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:outline-blueFunko-500 focus:ring-blueFunko-300 sm:text-sm sm:leading-6" />
            </div>
          </div>

          <div>
            <div class="mt-2">
              <input v-model="password" id="password" name="password" type="password" autocomplete="current-password"
                placeholder="Password"
                class="block w-full rounded-md border-0 py-2 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:outline-blueFunko-500 focus:ring-blueFunko-300 sm:text-sm sm:leading-6" />
            </div>
          </div>

          <div>
            <div class="mt-2">
              <input v-model="passwordAgain" id="confirmPassword" name="confirmPassword" type="password"
                autocomplete="current-password" placeholder="Confirm Password"
                class="block w-full rounded-md border-0 py-2 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:outline-blueFunko-500 focus:ring-blueFunko-300 sm:text-sm sm:leading-6" />
            </div>
          </div>

          <div v-if="textAlert != ''"
            class="mt-4 font-regular relative block w-full rounded-lg bg-pink-500 p-4 text-base leading-5 text-white opacity-100"
            data-dismissible="alert">
            <div class="mr-12">{{ textAlert }}</div>
          </div>

          <div>
            <button type="submit"
              class="flex w-full justify-center rounded-md bg-blueFunko-700 px-3 py-2 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-blueFunko-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blueFunko-800 easy-in-out duration-150 hover:scale-105 hover:delay-150">
              Sign up
            </button>
          </div>
        </form>
        <p class="text-sm text-center mt-10 text-gray-400">——— Or Connect With ———</p>

        <div class="flex justify-center w-full items-center mb-5">
          <button class="border-2 border-black/30 rounded-lg mt-6 py-2 px-12 hover:bg-gray-50">
            <img src="../assets/img/logos/GoogleLogo.svg" alt="" />
          </button>
        </div>

        <p class="absolute bottom-0 right-0 left-0 mb-5 text-center text-sm text-gray-500">
          Already a member?
          {{ ' ' }}
          <a href="#" class="font-semibold text-blueFunko-700 hover:text-blueFunko-600">Sign up</a>
        </p>
      </div>
      <img src="../assets/img/details/PointShape.svg" alt="" class="w-10 absolute bottom-1 left-1" />
      <img src="../assets/img/details/PointShape.svg" alt="" class="w-10 absolute top-1 right-1" />
    </div>
  </div>
</template>

<style>
body {
  background-color: #f7f8fa;
}
</style>
