<script setup>
import BaseTable from '@/components/AdminDashboard/AdminTables/BaseTable.vue';
import { useI18n } from 'vue-i18n';
import OrderDetailTableRow from './OrderDetailTableRow.vue';

const { t } = useI18n()

defineProps({
    items: {
        type: Array,
        required: true
    },
    totalItems: Number,
    totalPrice: Number,
    isAdmin: Boolean
})

const emit = defineEmits(['close'])

</script>

<template>
    <div class="flex">
        <div
            class="relative flex h-auto max-w-sm lg:max-w-[550px] xl:max-w-[650px] 2xl:max-w-[750px] flex-1 flex-col justify-center px-6 py-12 lg:px-8 bg-white border-2 rounded-xl border-gray-300/30 shadow-md">
            <div class="sm:mx-auto sm:w-full sm:max-w-sm">
                <p>{{ t('products') }}</p>
            </div>
            <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm lg:max-w-[550px] xl:max-w-[650px] 2xl:max-w-[750px]">
                <BaseTable :headers="['Name', 'Add Review', 'Image', 'Quantity', 'Price', 'Discount', 'Category']">
                    <OrderDetailTableRow v-for="item in items" :key="item.id" :item="item" :isAdmin="isAdmin" />
                    <tr class="bg-slate-50 hover:bg-gray-100 text-slate-900 border-t border-slate-300">
                        <td class="px-4 py-3 font-semibold">Total</td>
                        <td class="px-4 py-3"></td>
                        <td class="px-4 py-3">{{ totalItems }}</td>
                        <td class="px-4 py-3">{{ totalPrice }}</td>
                        <td class="px-4 py-3"></td>
                        <td class="px-4 py-3"></td>
                    </tr>
                </BaseTable>
                <div class="flex justify-center w-full items-center mt-2">
                    <button @click="emit('close')"
                        class="border-2 border-black/30 rounded-lg mt-6 py-2 px-12 hover:bg-gray-50">
                        Close
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>