<script setup>
import { ref, watch, nextTick } from 'vue'
import useProductValidation from '@/composables/useProductValidation'
import BaseButton from '@/components/BaseComponents/BaseButton.vue'

const props = defineProps({
  initialProductData: {
    type: Object,
    default: () => ({
      name: '',
      description: '',
      price: 0.0,
      stock: 0,
      category: null,
      discount: null,
      imageHash: null,
      imageHash2: null
    })
  },
  isLoadingCategories: Boolean,
  listCategories: Array,
  categoryError: String
})

const fileBase64String = ref(null)
const fileBase64String2 = ref(null)

const emit = defineEmits(['submit', 'cancel'])

const form = ref({ ...props.initialProductData })

watch(
  () => props.initialProductData,
  async (newVal) => {
    form.value = { ...newVal }

    form.value.imageHash = form.value.imageHash || null;
    form.value.imageHash2 = form.value.imageHash2 || null;
    await nextTick();
    console.log("Form data updated:", form.value);
  },
  { immediate: true }
)

const { errors, validateProductForm } = useProductValidation()

const handleSubmit = () => {
  if (!fileBase64String.value && !props.initialProductData.imageHash) {
    form.value.imageHash = null;
  } else if (!fileBase64String.value) {
    delete form.value.imageHash;
  }
  if (!fileBase64String2.value && !props.initialProductData.imageHash2) {
    form.value.imageHash2 = null;
  } else if (!fileBase64String2.value) {
    delete form.value.imageHash2;
  }

  if (!validateProductForm(form.value)) {
    return
  }
  emit('submit', form.value)
}
const handleCancel = () => {
  emit('cancel')
}

const onFileChange = (event) => {
  const file = event.target.files[0]
  if (file) {
    const reader = new FileReader()
    reader.onload = (e) => {
      fileBase64String.value = e.target.result
      form.value.imageHash = fileBase64String.value ? fileBase64String.value.split(',')[1] : null
    }
    reader.readAsDataURL(file)
  } else {
    form.value.imageHash = props.initialProductData.imageHash || null;
  }
}

const onFileChange2 = (event) => {
  const file = event.target.files[0]
  if (file) {
    const reader = new FileReader()
    reader.onload = (e) => {
      fileBase64String2.value = e.target.result
      form.value.imageHash2 = fileBase64String2.value ? fileBase64String2.value.split(',')[1] : null
    }
    reader.readAsDataURL(file)
  } else {
    form.value.imageHash2 = props.initialProductData.imageHash2 || null;
  }
}
</script>

<template>
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
      <span v-if="errors.description" class="text-red-500 text-sm">{{ errors.description }}</span>
    </div>

    <div class="grid grid-cols-2 gap-5"> 
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

    <div class="grid grid-cols-2 gap-5"> 
      <div>
        <label class="block text-sm font-medium text-slate-700">Product Image</label>
        <input
          ref="upload"
          type="file"
          name="file-upload"
          accept="image/jpeg, image/png, image/**"
          @change="onFileChange"
          class="mt-1 block w-full px-4 py-2 border-2 border-slate-200 rounded-md focus:outline-none focus:border-blueFunko-600"
        />
      </div>
  
      <div>
        <label class="block text-sm font-medium text-slate-700">Product Image 2</label>
        <input
          ref="upload"
          type="file"
          name="file-upload"
          accept="image/jpeg, image/png, image/**"
          @change="onFileChange2"
          class="mt-1 block w-full px-4 py-2 border-2 border-slate-200 rounded-md focus:outline-none focus:border-blueFunko-600"
        />
      </div>
    </div>

    <div class="mt-4 flex justify-end space-x-2">
      <BaseButton @click="handleCancel" type="button" variant="secondary">Cancel</BaseButton>
      <BaseButton type="submit" variant="primary">Save Changes</BaseButton>
    </div>
  </form>
</template>
