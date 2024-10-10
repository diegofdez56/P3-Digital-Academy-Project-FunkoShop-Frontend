import { mount, flushPromises } from '@vue/test-utils'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import AddProductModal from '@/components/AdminDashboard/AdminModals/AddProductModal.vue'
import ProductForm from '@/components/AdminDashboard/ProductForm.vue'

const addProductMock = vi.fn().mockResolvedValueOnce()
const mockProductStore = {
  addProduct: addProductMock
}

const getCategoriesMock = vi.fn().mockResolvedValue([{ id: 1, name: 'Category1' }])

const mockCategoryStore = {
  getCategories: getCategoriesMock,
  error: null,
  isLoading: false,
  categories: []
}

vi.mock('@/stores/productStore', () => ({
  useProductStore: () => mockProductStore
}))

vi.mock('@/stores/category/categoryStore', () => ({
  CategoryStore: () => mockCategoryStore
}))

describe('AddProductModal.vue', () => {
  let wrapper

  beforeEach(() => {
    wrapper = mount(AddProductModal, {
      props: {
        show: true
      },
      global: {
        components: { ProductForm }
      }
    })
  })

  it('renders modal when show prop is true', () => {
    expect(wrapper.find('.bg-white').exists()).toBe(true)
    expect(wrapper.find('h3').text()).toBe('Add New Product')
  })

  it('fetches categories on mount', async () => {
    await flushPromises()

    expect(mockCategoryStore.getCategories).toHaveBeenCalled()

    expect(wrapper.vm.listCategories.length).toBe(1)
    expect(wrapper.vm.listCategories[0].name).toBe('Category1')
  })

  it('emits "close" event when close button is clicked', async () => {
    await wrapper.find('button').trigger('click')
    expect(wrapper.emitted().close).toBeTruthy()
  })

  it('emits "close" event when form cancel is triggered', async () => {
    await wrapper.findComponent(ProductForm).vm.$emit('cancel')
    expect(wrapper.emitted().close).toBeTruthy()
  })

  it('handles form submission and calls addProduct', async () => {
    const formData = {
      name: 'New Product',
      description: 'New Description',
      price: 20.0,
      stock: 10,
      category: 1,
      discount: 5
    }

    await wrapper.findComponent(ProductForm).vm.$emit('submit', formData)

    await flushPromises()

    expect(addProductMock).toHaveBeenCalledWith(formData)

    expect(wrapper.emitted().added).toBeTruthy()
  })
})
