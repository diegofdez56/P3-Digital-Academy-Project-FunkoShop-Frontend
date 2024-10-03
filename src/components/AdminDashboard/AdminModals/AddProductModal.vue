<script setup>
import { ref } from 'vue'
import { useProductStore } from '@/stores/productStore'
import { storeToRefs } from 'pinia'
import { CategoryStore } from '@/stores/category/CategoryStore'
import BaseButton from '@/components/BaseComponents/BaseButton.vue'
import useProductValidation from '@/composables/useProductValidation'

defineProps({
  show: Boolean
})

const emit = defineEmits(['close', 'added'])

const productStore = useProductStore()
const listCategoryStore = CategoryStore()
const listCategories = ref([])

const { isLoading: isLoadingCategories, error: categoryError } = storeToRefs(listCategoryStore)

async function getCategories() {
  const response = await listCategoryStore.getCategories()
  listCategories.value = response
}

getCategories()

const form = ref({
  name: '',
  description: '',
  price: 0.0,
  stock: 0,
  category: null,
  discount: null
})

const { errors, validateProductForm } = useProductValidation()

const handleSubmit = async () => {
  if (!validateProductForm(form.value)) {
    return
  }
  if (form.value.discount === null || form.value.discount === '') {
    form.value.discount = 0
  }
  try {
    await productStore.addProduct(form.value)
    emit('added')
    closeModal()
  } catch (err) {
    console.error('Failed to add product:', err)
  }
}

const closeModal = () => {
  emit('close')
}
</script>

<template>
  <div
    v-if="show"
    class="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-50 overflow-y-auto"
  >
    <div
      class="bg-white w-full max-w-2xl mx-auto p-6 md:p-10 rounded-lg shadow-lg flex flex-col gap-5 my-8"
    >
      <div class="flex justify-between items-center pb-4 border-b border-slate-200">
        <h3 class="text-2xl font-semibold text-slate-950">Add New Product</h3>
        <button
          @click="closeModal"
          class="w-10 h-10 bg-slate-100 rounded-full hover:bg-blueFunko-100 text-blueFunko-600 text-2xl"
        >
          &times;
        </button>
      </div>

      <form @submit.prevent="handleSubmit" class="flex flex-col gap-5">
        <div>
          <label class="block text-sm font-medium text-slate-700">Product Name</label>
          <input
            v-model="form.name"
            class="mt-1 block w-full px-4 py-2 border-2 border-slate-200 rounded-md focus:outline-none focus:border-blueFunko-600"
            required
          />
          <span v-if="errors.name" class="text-red-500 text-sm">{{ errors.name }}</span>
        </div>

        <div>
          <label class="block text-sm font-medium text-slate-700">Description</label>
          <textarea
            v-model="form.description"
            maxlength="255"
            class="mt-1 block w-full px-4 py-2 border-2 border-slate-200 rounded-md focus:outline-none focus:border-blueFunko-600"
            required
          ></textarea>
          <div class="text-sm text-slate-500 mt-1">
            <span>{{ 255 - form.description.length }} characters remaining</span>
          </div>
          <span v-if="errors.description" class="text-red-500 text-sm">{{
            errors.description
          }}</span>
        </div>

        <div>
          <label class="block text-sm font-medium text-slate-700">Price</label>
          <input
            v-model="form.price"
            type="number"
            min="0.01"
            step="0.01"
            class="mt-1 block w-full px-4 py-2 border-2 border-slate-200 rounded-md focus:outline-none focus:border-blueFunko-600"
            required
          />
          <span v-if="errors.price" class="text-red-500 text-sm">{{ errors.price }}</span>
        </div>

        <div>
          <label class="block text-sm font-medium text-slate-700">Stock</label>
          <input
            v-model="form.stock"
            type="number"
            min="0"
            class="mt-1 block w-full px-4 py-2 border-2 border-slate-200 rounded-md focus:outline-none focus:border-blueFunko-600"
            required
          />
          <span v-if="errors.stock" class="text-red-500 text-sm">{{ errors.stock }}</span>
        </div>

        <div>
          <label class="block text-sm font-medium text-slate-700">Category</label>
          <select
            v-model="form.category"
            class="mt-1 block w-full px-4 py-2 border-2 border-slate-200 rounded-md focus:outline-none focus:border-blueFunko-600"
          >
            <option :value="null" disabled>Select a category</option>
            <option v-for="category in listCategories" :key="category.id" :value="category">
              {{ category.name }}
            </option>
          </select>
          <span v-if="errors.category" class="text-red-500 text-sm">{{ errors.category }}</span>
          <div v-if="isLoadingCategories" class="text-blueFunko-500 text-sm mt-2">
            Loading categories...
          </div>
          <div v-if="categoryError" class="text-red-500 text-sm mt-2">
            {{ categoryError }}
          </div>
        </div>

        <div>
          <label class="block text-sm font-medium text-slate-700">Discount (%)</label>
          <input
            v-model="form.discount"
            type="number"
            min="0"
            max="100"
            step="1"
            placeholder="Enter 0 if product has no discount"
            class="mt-1 block w-full px-4 py-2 border-2 border-slate-200 rounded-md focus:outline-none focus:border-blueFunko-600"
            required
          />
          <span v-if="errors.discount" class="text-red-500 text-sm">{{ errors.discount }}</span>
        </div>

        <div class="mt-4 flex justify-end space-x-2">
          <BaseButton @click="closeModal" type="button" variant="secondary">Cancel</BaseButton>
          <BaseButton type="submit" variant="primary">Add Product</BaseButton>
        </div>
      </form>
    </div>
  </div>
</template>
