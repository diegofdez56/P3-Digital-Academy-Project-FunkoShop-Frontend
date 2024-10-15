<script setup>
import { useAuthStore } from '@/stores/auth';
import { ProfileStore } from '@/stores/Profile/ProfileStore';
import { Dialog, DialogPanel, TransitionChild, TransitionRoot } from '@headlessui/vue'
import { ref } from 'vue';
import ChangePasswordForm from './ChangePasswordForm.vue';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

const openChangePassword = ref(false)

const TIME_DISMISSED = import.meta.env.VITE_TIME_DISMISSED
const store = ProfileStore()
const auth = useAuthStore()

const firstName = ref('');
const lastName = ref('');
const street = ref('');
const city = ref('');
const region = ref('');
const postalCode = ref('');
const country = ref('');

const address = ref(null);
const subscribed = ref(false);
const shipping = ref(false);

const countryCode = ref('+34');
const rigthNumber = ref('');

const textAlert = ref("")

async function setProfile() {
    const response = await store.setProfile(firstName.value, lastName.value, (countryCode.value + '-' + rigthNumber.value), street.value, city.value, region.value, postalCode.value, country.value, address.value, subscribed.value, shipping.value, auth.user.access_token);

    if (response.id == auth.user.id)
        textAlert.value = 'Profile updated successfully';
    else
        textAlert.value = 'Error updating profile';

    console.log(response.id);

    setTimeout(() => {
        textAlert.value = '';
    }, TIME_DISMISSED);
}

async function getProfile() {
    const response = await store.getProfile(auth.user.access_token);

    if (response.phoneNumber) {
        const splitPjoneNumber = response.phoneNumber.split('-');
        const countryCodeResponse = splitPjoneNumber[0];
        const rigthNumberResponse = splitPjoneNumber[1];
        rigthNumber.value = rigthNumberResponse;
        countryCode.value = countryCodeResponse;
    }
    firstName.value = response.firstName;
    lastName.value = response.lastName;
    street.value = response.street;
    city.value = response.city;
    region.value = response.region;
    postalCode.value = response.postalCode;
    if (response.country)
        country.value = response.country;
    else
        country.value = 'ES';
    address.value = response.address;
    subscribed.value = response.subscribed;
    shipping.value = response.shipping;
}

getProfile()

</script>

<template>
    <form class="w-full max-w-2xl px-4 py-8 mx-auto" @submit.prevent="setProfile">
        <div class="space-y-12">
            <div class="border-b border-gray-900/10 pb-12">
                <h2 class="text-base font-semibold leading-7 text-gray-900">{{ t('profile.personalInformation') }}</h2>
                <p class="mt-1 text-sm leading-6 text-gray-600">{{ t('profile.usePermanentAddress') }}</p>

                <div v-if="textAlert != ''"
                    :class="textAlert == 'Profile updated successfully' ? 'bg-green-500' : 'bg-red-500'"
                    class="mt-4 font-regular relative block w-full rounded-lg p-4 text-base leading-5 text-white opacity-100"
                    data-dismissible="alert">
                    <div class="mr-12">{{ textAlert }}</div>
                </div>

                <div class="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                    <div class="col-span-6 sm:col-span-3">
                        <label for="firstname" class="block text-sm font-medium leading-6 text-gray-900">{{
                            t('profile.firstName') }}</label>
                        <div class="mt-2">
                            <input v-model="firstName" type="text" name="firstname" id="firstname"
                                autocomplete="given-name"
                                class="block w-full rounded-md border-0 py-1.5 pl-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                        </div>
                    </div>

                    <div class="col-span-6 sm:col-span-3">
                        <label for="lastname" class="block text-sm font-medium leading-6 text-gray-900">{{
                            t('profile.lastName') }}</label>
                        <div class="mt-2">
                            <input v-model="lastName" type="text" name="lastname" id="lastname"
                                autocomplete="family-name"
                                class="block w-full rounded-md border-0 py-1.5 pl-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                        </div>
                    </div>

                    <div class="col-span-6 sm:col-span-4">
                        <label for="rigthnumber" class="block text-sm font-medium leading-6 text-gray-900">{{
                            t('profile.phoneNumber') }}</label>
                        <div class="mt-2">
                            <input v-model="rigthNumber" type="number" name="rigthnumber" id="rigthnumber"
                                autocomplete="family-name"
                                class="block w-full rounded-md border-0 py-1.5 pl-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                        </div>
                    </div>

                    <div class="col-span-6 sm:col-span-2">
                        <label for="country" class="block text-sm font-medium leading-6 text-gray-900">{{
                            t('profile.country') }}</label>
                        <div class="mt-2">
                            <select v-model="country" id="country"
                                class="block w-full rounded-md border-0 py-1.5 pl-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
                                <option value="AT">Austria</option>
                                <option value="BE">Belgium</option>
                                <option value="BG">Bulgaria</option>
                                <option value="HR">Croatia</option>
                                <option value="CY">Cyprus</option>
                                <option value="CZ">Czech Republic</option>
                                <option value="DK">Denmark</option>
                                <option value="EE">Estonia</option>
                                <option value="FI">Finland</option>
                                <option value="FR">France</option>
                                <option value="DE">Germany</option>
                                <option value="GR">Greece</option>
                                <option value="HU">Hungary</option>
                                <option value="IE">Ireland</option>
                                <option value="IT">Italy</option>
                                <option value="LV">Latvia</option>
                                <option value="LT">Lithuania</option>
                                <option value="LU">Luxembourg</option>
                                <option value="MT">Malta</option>
                                <option value="NL">Netherlands</option>
                                <option value="PL">Poland</option>
                                <option value="PT">Portugal</option>
                                <option value="RO">Romania</option>
                                <option value="SK">Slovakia</option>
                                <option value="SI">Slovenia</option>
                                <option value="ES">Spain</option>
                                <option value="SE">Sweden</option>
                            </select>
                        </div>
                    </div>

                    <div class="col-span-6 sm:col-span-4">
                        <label for="city" class="block text-sm font-medium leading-6 text-gray-900">{{ t('profile.city')
                            }}</label>
                        <div class="mt-2">
                            <input v-model="city" type="text" name="city" id="city" autocomplete="city"
                                class="block w-full rounded-md border-0 py-1.5 pl-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                        </div>
                    </div>

                    <div class="col-span-full">
                        <label for="street" class="block text-sm font-medium leading-6 text-gray-900">{{
                            t('profile.street') }}</label>
                        <div class="mt-2">
                            <input v-model="street" type="text" name="street" id="street" autocomplete="street"
                                class="block w-full rounded-md border-0 py-1.5 pl-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                        </div>
                    </div>

                    <div class="sm:col-span-2">
                        <label for="region" class="block text-sm font-medium leading-6 text-gray-900">{{
                            t('profile.region') }}</label>
                        <div class="mt-2">
                            <input v-model="region" type="text" name="region" id="region" autocomplete="region"
                                class="block w-full rounded-md border-0 py-1.5 pl-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                        </div>
                    </div>

                    <div class="sm:col-span-2">
                        <label for="postalcode" class="block text-sm font-medium leading-6 text-gray-900">{{
                            t('profile.postalCode') }}</label>
                        <div class="mt-2">
                            <input v-model="postalCode" type="text" name="postalcode" id="postalcode"
                                autocomplete="postalcode"
                                class="block w-full rounded-md border-0 py-1.5 pl-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="mt-6 flex items-center justify-end gap-x-6">
            <button type="submit" @click="openChangePassword = !openChangePassword"
                class="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">{{
                    t('profile.changePassword') }}</button>
            <TransitionRoot as="template" :show="openChangePassword">
                <Dialog class="relative z-10" @close="openChangePassword = !openChangePassword">
                    <TransitionChild as="template" enter="ease-out duration-300" enter-from="opacity-0"
                        enter-to="opacity-100" leave="ease-in duration-200" leave-from="opacity-100"
                        leave-to="opacity-0">
                        <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                    </TransitionChild>

                    <div class="fixed inset-0 z-10 w-screen overflow-y-auto">
                        <div class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                            <TransitionChild as="template" enter="ease-out duration-300"
                                enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                                enter-to="opacity-100 translate-y-0 sm:scale-100" leave="ease-in duration-200"
                                leave-from="opacity-100 translate-y-0 sm:scale-100"
                                leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95">
                                <DialogPanel
                                    class=" bg-white px-10 shadow-xl transition-all w-full max-w-md rounded-2xl">
                                    <ChangePasswordForm />
                                </DialogPanel>
                            </TransitionChild>
                        </div>
                    </div>
                </Dialog>
            </TransitionRoot>
            <button type="submit"
                class="rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">{{
                    t('profile.save') }}</button>
        </div>
    </form>
</template>
