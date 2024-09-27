<script setup>
import { useAuthStore } from '@/stores/auth';
import { ref } from 'vue';

const TIME_DISMISSED = import.meta.env.VITE_TIME_DISMISSED
const auth = useAuthStore()

const currentPassword = ref('');
const newPassword = ref('');
const confirmationPassword = ref('');

const textAlert = ref("")

async function setNewPassword() {
    const response = await auth.setNewPassword(currentPassword.value, newPassword.value, confirmationPassword.value, auth.user.access_token);

    if (response.message != "Request failed with status code 403")
        textAlert.value = 'Password successfully changed.';
    else
        textAlert.value = 'Error changed password';

    currentPassword.value = '';
    newPassword.value = '';
    confirmationPassword.value = '';

    setTimeout(() => {
        textAlert.value = '';
    }, TIME_DISMISSED);
}

</script>

<template>
    <form class="w-full max-w-2xl px-4 py-8 mx-auto" @submit.prevent="setNewPassword">
        <div class="space-y-12">
            <div class="border-b border-gray-900/10 pb-12">
                <h2 class="text-base font-semibold leading-7 text-gray-900">Change Password</h2>

                <div v-if="textAlert != ''"
                    :class="textAlert == 'Password successfully changed.' ? 'bg-green-500' : 'bg-red-500'"
                    class="mt-4 font-regular relative block w-full rounded-lg p-4 text-base leading-5 text-white opacity-100"
                    data-dismissible="alert">
                    <div class="mr-12">{{ textAlert }}</div>
                </div>

                <div class="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                    <div class="col-span-full">
                        <label for="currentPassword" class="block text-sm font-medium leading-6 text-gray-900">Current
                            Password</label>
                        <div class="mt-2">
                            <input required v-model="currentPassword" type="password" name="currentPassword"
                                id="currentPassword" autocomplete="currentPassword" placeholder="Password"
                                class="block w-full rounded-md border-0 py-1.5 pl-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                        </div>
                    </div>
                    <div class="col-span-full">
                        <label for="newPassword" class="block text-sm font-medium leading-6 text-gray-900">New
                            Password</label>
                        <div class="mt-2">
                            <input required v-model="newPassword" type="password" name="newPassword" id="newPassword"
                                autocomplete="newPassword" placeholder="New Password"
                                class="block w-full rounded-md border-0 py-1.5 pl-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                        </div>
                    </div>
                    <div class="col-span-full">
                        <label for="confirmationPassword"
                            class="block text-sm font-medium leading-6 text-gray-900">Confirmation Password</label>
                        <div class="mt-2">
                            <input required v-model="confirmationPassword" type="password" name="confirmationPassword"
                                oninput="this.setCustomValidity(this.value !== document.getElementById('newPassword').value ? 'Passwords do not match.' : '')"
                                id="confirmationPassword" autocomplete="confirmationPassword"
                                placeholder="Confirmation Password"
                                class="block w-full rounded-md border-0 py-1.5 pl-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="mt-6 flex items-center justify-end gap-x-6">
            <button type="submit"
                class="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Change</button>
        </div>
    </form>
</template>
