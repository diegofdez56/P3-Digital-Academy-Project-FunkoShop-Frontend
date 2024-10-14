import { describe, it, expect, beforeEach } from 'vitest'
import useProductValidation from '@/composables/useProductValidation'

describe('useProductValidation', () => {
  let validateProductForm
  let errors

  beforeEach(() => {
    const { validateProductForm: validate, errors: errorObj } = useProductValidation()
    validateProductForm = validate
    errors = errorObj
  })

  it('should return true for valid form data', () => {
    const validForm = {
      name: 'Product 1',
      description: 'This is a valid product description',
      price: 10,
      stock: 5,
      category: 'Category 1'
    }

    const result = validateProductForm(validForm)

    expect(result).toBe(true)
    expect(errors.value).toEqual({})
  })

  it('should return false if name is missing', () => {
    const invalidForm = {
      name: '',
      description: 'This is a valid product description',
      price: 10,
      stock: 5,
      category: 'Category 1'
    }

    const result = validateProductForm(invalidForm)

    expect(result).toBe(false)
    expect(errors.value.name).toBe('Product name is required.')
  })

  it('should return false if description exceeds 255 characters', () => {
    const longDescription = 'A'.repeat(256)
    const invalidForm = {
      name: 'Product 1',
      description: longDescription,
      price: 10,
      stock: 5,
      category: 'Category 1'
    }

    const result = validateProductForm(invalidForm)

    expect(result).toBe(false)
    expect(errors.value.description).toBe('Description cannot exceed 255 characters.')
  })

  it('should return false if price is less than or equal to 0', () => {
    const invalidForm = {
      name: 'Product 1',
      description: 'This is a valid product description',
      price: 0,
      stock: 5,
      category: 'Category 1'
    }

    const result = validateProductForm(invalidForm)

    expect(result).toBe(false)
    expect(errors.value.price).toBe('Price must be greater than 0.')
  })

  it('should return false if stock is negative', () => {
    const invalidForm = {
      name: 'Product 1',
      description: 'This is a valid product description',
      price: 10,
      stock: -1,
      category: 'Category 1'
    }

    const result = validateProductForm(invalidForm)

    expect(result).toBe(false)
    expect(errors.value.stock).toBe('Stock must be 0 or greater.')
  })

  it('should return false if category is missing', () => {
    const invalidForm = {
      name: 'Product 1',
      description: 'This is a valid product description',
      price: 10,
      stock: 5,
      category: ''
    }

    const result = validateProductForm(invalidForm)

    expect(result).toBe(false)
    expect(errors.value.category).toBe('Category is required.')
  })
})
