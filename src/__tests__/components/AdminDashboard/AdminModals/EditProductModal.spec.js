import { mount, flushPromises } from '@vue/test-utils'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import EditProductModal from '@/components/AdminDashboard/AdminModals/EditProductModal.vue'
import ProductForm from '@/components/AdminDashboard/ProductForm.vue'

const updateProductMock = vi.fn().mockResolvedValueOnce()

const mockProductStore = {
  updateProduct: updateProductMock
}

vi.mock('@/stores/productStore', () => ({
  useProductStore: () => mockProductStore
}))

vi.mock('@/stores/category/categoryStore', () => ({
  CategoryStore: vi.fn(() => ({
    getCategories: vi.fn().mockResolvedValue([{ id: 1, name: 'Category1' }]),
    error: null,
    isLoading: false,
    categories: []
  }))
}))

describe('EditProductModal.vue', () => {
  let wrapper
  const productData = {
    id: 1,
    name: 'Test Product',
    description: 'Test Description',
    price: 100,
    stock: 20,
    category: 1,
    discount: 0
  }

  const onUpdateMock = vi.fn()

  beforeEach(() => {
    wrapper = mount(EditProductModal, {
      props: {
        show: true,
        productData,
        onUpdate: onUpdateMock
      },
      global: {
        components: { ProductForm }
      }
    })
  })

  it('renders modal when show prop is true', () => {
    expect(wrapper.find('.bg-white').exists()).toBe(true)
    expect(wrapper.find('h3').text()).toBe('Edit Product')
    expect(wrapper.findComponent(ProductForm).props('initialProductData')).toEqual(productData)
  })

  it('emits "close" event when close button is clicked', async () => {
    await wrapper.find('button').trigger('click')
    expect(wrapper.emitted().close).toBeTruthy()
  })

  it('emits "close" event when form cancel is triggered', async () => {
    await wrapper.findComponent(ProductForm).vm.$emit('cancel')
    expect(wrapper.emitted().close).toBeTruthy()
  })

  it('handles form submission and calls updateProduct', async () => {
    const formData = {
      name: 'Updated Product',
      description: 'Updated Description',
      price: 150,
      stock: 25,
      category: 1,
      discount: 5
    }

    await wrapper.findComponent(ProductForm).vm.$emit('submit', formData)

    await flushPromises()

    expect(updateProductMock).toHaveBeenCalledWith(productData.id, formData)

    expect(onUpdateMock).toHaveBeenCalled()
  })
})
