import { setActivePinia, createPinia } from 'pinia'
import { describe, it, expect, beforeEach, vi } from 'vitest'
import { useProductStore } from '@/stores/productStore'
import axios from 'axios'

vi.mock('axios')

describe('productStore', () => {
  let productStore

  beforeEach(() => {
    Object.defineProperty(window, 'localStorage', {
      value: {
        getItem: vi.fn(() => 'fake-token'),
        setItem: vi.fn(),
        removeItem: vi.fn(),
        clear: vi.fn(),
      },
      writable: true,
    })

    setActivePinia(createPinia())
    productStore = useProductStore()
  })

  it('adds a product successfully with SQL-like data', async () => {
    const newProduct = {
      id: 5, 
      name: 'Iron Man', 
      image: 'ironman.jpg', 
      description: 'A collectible Iron Man figure from Marvel.', 
      price: 15.99, 
      stock: 30, 
      category_id: 3, 
      discount: 5, 
      created_at: '2024-05-01 10:00:00',
      isNew: false,
      imageHash: undefined
    }
  
    axios.post.mockResolvedValueOnce({ data: newProduct })
  
    await productStore.addProduct(newProduct)
  
    expect(productStore.products).toContainEqual(newProduct)
    expect(productStore.isLoading).toBe(false)
    expect(productStore.error).toBe(null)
  })
  
  
  it('fetches products successfully with SQL-like data', async () => {
    const sqlMockData = [
      { id: 1, name: 'Spider-Man', image: 'spiderman.jpg', description: 'A collectible Spider-Man figure from Marvel.', price: 12.99, stock: 50, category_id: 3, discount: 10, created_at: '2024-01-01 10:00:00', isNew: false, imageHash: undefined },
      { id: 2, name: 'Batman', image: 'batman.jpg', description: 'A collectible Batman figure from DC Comics.', price: 11.99, stock: 40, category_id: 4, discount: 20, created_at: '2024-02-01 11:30:00', isNew: false, imageHash: undefined },
      { id: 3, name: 'Goku Super Saiyan', image: 'goku.jpg', description: 'Goku in his Super Saiyan form from Dragon Ball Z.', price: 14.99, stock: 0, category_id: 2, discount: 0, created_at: '2024-03-01 12:00:00', isNew: false, imageHash: undefined },
      { id: 4, name: 'Sailor Moon', image: 'sailormoon.jpg', description: 'Sailor Moon figure from the classic anime series.', price: 13.99, stock: 20, category_id: 2, discount: 0, created_at: '2024-01-15 09:00:00', isNew: false, imageHash: undefined }
    ]
  
    axios.get.mockResolvedValueOnce({ data: { content: sqlMockData } })
  
    await productStore.fetchAllProducts()
  
    expect(productStore.products).toEqual(sqlMockData)
    expect(productStore.isLoading).toBe(false)
    expect(productStore.error).toBe(null)
  })
  
  it('handles error when fetching products', async () => {
    const errorResponse = { response: { status: 500, data: { message: 'Failed to fetch products' } } }
  
    axios.get.mockRejectedValueOnce(errorResponse)
  
    await productStore.fetchAllProducts()
  
    expect(productStore.error).toBe('Server Error: 500 - Failed to fetch products')
    expect(productStore.isLoading).toBe(false)
  })

  it('sets category and fetches products with SQL-like data', async () => {
    const category = { id: 2, name: 'Anime' }
    const sqlMockData = [
      { id: 3, name: 'Goku Super Saiyan', image: 'goku.jpg', description: 'Goku in his Super Saiyan form from Dragon Ball Z.', price: 14.99, stock: 0, category_id: 2, discount: 0, created_at: '2024-03-01 12:00:00', isNew: false, imageHash: undefined },
      { id: 4, name: 'Sailor Moon', image: 'sailormoon.jpg', description: 'Sailor Moon figure from the classic anime series.', price: 13.99, stock: 20, category_id: 2, discount: 0, created_at: '2024-01-15 09:00:00', isNew: false, imageHash: undefined }
    ]
  
    axios.get.mockResolvedValueOnce({ data: { content: sqlMockData } })
  
    await productStore.setCategory(category)
  
    expect(productStore.selectedCategory).toEqual(category)
    expect(productStore.products).toEqual(sqlMockData)
    expect(productStore.currentPage).toBe(0)
  })
  
  it('deletes a product successfully with SQL-like data', async () => {
    const sqlMockData = [
      { id: 1, name: 'Spider-Man', image: 'spiderman.jpg', description: 'A collectible Spider-Man figure from Marvel.', price: 12.99, stock: 50, category_id: 3, discount: 10, created_at: '2024-01-01 10:00:00', isNew: false, imageHash: undefined },
      { id: 2, name: 'Batman', image: 'batman.jpg', description: 'A collectible Batman figure from DC Comics.', price: 11.99, stock: 40, category_id: 4, discount: 20, created_at: '2024-02-01 11:30:00', isNew: false, imageHash: undefined }
    ]
  
    productStore.products = sqlMockData
  
    axios.delete.mockResolvedValueOnce()
  
    await productStore.deleteProduct(1)
  
    expect(productStore.products).toHaveLength(1)
    expect(productStore.products).not.toContainEqual(sqlMockData[0])
    expect(productStore.isLoading).toBe(false)
    expect(productStore.error).toBe(null)
  })
  
  it('handles error when deleting a product', async () => {
    const errorResponse = { response: { status: 500, data: { message: 'Failed to delete product' } } }
  
    axios.delete.mockRejectedValueOnce(errorResponse)
  
    await productStore.deleteProduct(1)
  
    expect(productStore.error).toBe('Server Error: 500 - Failed to delete product')
    expect(productStore.isLoading).toBe(false)
  })
  
  it('fetches discounted products successfully with SQL-like data', async () => {
    const discountedProductsData = [
      { id: 1, name: 'Spider-Man', image: 'spiderman.jpg', description: 'A collectible Spider-Man figure from Marvel.', price: 12.99, stock: 50, category_id: 3, discount: 10, created_at: '2024-01-01 10:00:00', isNew: false, imageHash: undefined }
    ]
  
    axios.get.mockResolvedValueOnce({ data: discountedProductsData })
  
    await productStore.fetchDiscountedProducts()
  
    expect(productStore.discountedProducts).toMatchObject(discountedProductsData)
    expect(productStore.isLoading).toBe(false)
    expect(productStore.error).toBe(null)
  })

})
