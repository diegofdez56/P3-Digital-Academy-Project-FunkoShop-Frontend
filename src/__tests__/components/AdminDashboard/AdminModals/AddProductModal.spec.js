import { mount } from '@vue/test-utils'
import { describe, it, expect, beforeEach, vi } from 'vitest'
import AddProductModal from '@/components/AdminDashboard/AdminModals/AddProductModal.vue'
import ProductForm from '@/components/AdminDashboard/ProductForm.vue'

vi.mock('@/stores/productStore', () => ({
  useProductStore: vi.fn(() => ({
    addProduct: vi.fn().mockResolvedValueOnce(),
    products: []
  }))
}))


vi.mock('@/stores/category/categoryStore', () => ({
  CategoryStore: vi.fn(() => ({
    getCategories: vi.fn().mockResolvedValue([{ id: 1, name: 'Category1' }]),
    error: null,
    isLoading: false,
    categories: []
  }))
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
  
  it('emits "close" event when close button is clicked', async () => {
    await wrapper.find('button').trigger('click')
    expect(wrapper.emitted().close).toBeTruthy()
  })

  it('emits "close" event when form cancel is triggered', async () => {
    await wrapper.findComponent(ProductForm).vm.$emit('cancel')
    expect(wrapper.emitted().close).toBeTruthy()
  })
})
