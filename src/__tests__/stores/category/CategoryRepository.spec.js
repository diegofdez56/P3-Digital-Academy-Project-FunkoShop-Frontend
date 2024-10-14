import { describe, it, expect, vi, beforeEach } from 'vitest'
import axios from 'axios'
import CategoryRepository from '@/stores/category/CategoryRepository'

vi.mock('axios')

describe('CategoryRepository', () => {
  let categoryRepo

  beforeEach(() => {
    categoryRepo = new CategoryRepository()
  })

  describe('getCategories', () => {
    it('should make a GET request and return categories data', async () => {
      const mockCategories = [
        { category_id: 1, name: 'Animation', highlights: false, image_hash: 'http://localhost:5173/src/assets/img/Carrousel/animation.jpg' },
        { category_id: 2, name: 'Anime & Manga', highlights: true, image_hash: 'http://localhost:5173/src/assets/img/Carrousel/anime.jpg' },
        { category_id: 3, name: 'Marvel', highlights: true, image_hash: 'http://localhost:5173/src/assets/img/Carrousel/marvel.jpg' },
        { category_id: 4, name: 'DC Comics', highlights: false, image_hash: 'http://localhost:5173/src/assets/img/Carrousel/dc-comics.jpg' }
      ]
      axios.request.mockResolvedValueOnce({ data: mockCategories })

      const result = await categoryRepo.getCategories()

      expect(result).toEqual(mockCategories)
      expect(axios.request).toHaveBeenCalledWith({
        url: import.meta.env.VITE_API_ENDPOINT + '/categories',
        method: 'GET',
        headers: {
          "Accept": "*/*",
          "Content-Type": "application/json"
        }
      })
    })

    it('should return error details if request fails', async () => {
      const mockError = new Error('Request failed')
      mockError.toJSON = () => ({ message: 'Request failed', code: '500' })
      axios.request.mockRejectedValueOnce(mockError)

      const result = await categoryRepo.getCategories()

      expect(result).toEqual({ message: 'Request failed', code: '500' })
      expect(axios.request).toHaveBeenCalled()
    })
  })

  describe('setCategory', () => {
    const mockCategory = {
      id: 2,
      name: 'Anime & Manga',
      imageHash: 'http://localhost:5173/src/assets/img/Carrousel/anime.jpg',
      highlights: true
    }
    const mockAccessToken = 'test-token'

    it('should make a PUT request and update the category', async () => {
      const mockResponse = { id: 2, name: 'Anime & Manga Updated' }
      axios.request.mockResolvedValueOnce({ data: mockResponse })

      const result = await categoryRepo.setCategory(mockCategory, mockAccessToken)

      expect(result).toEqual(mockResponse)
      expect(axios.request).toHaveBeenCalledWith({
        url: import.meta.env.VITE_API_ENDPOINT + '/categories',
        method: 'PUT',
        headers: {
          "Accept": "*/*",
          "Authorization": "Bearer test-token",
          "Content-Type": "application/json"
        },
        data: {
          id: 2,
          name: 'Anime & Manga',
          imageHash: 'http://localhost:5173/src/assets/img/Carrousel/anime.jpg',
          highlights: true
        }
      })
    })

    it('should return error details if request fails', async () => {
      const mockError = {
        response: { data: { message: 'Unauthorized' }, status: 401 },
        toJSON: () => ({ message: 'Request failed' })
      }
      axios.request.mockRejectedValueOnce(mockError)

      const result = await categoryRepo.setCategory(mockCategory, mockAccessToken)

      expect(result).toEqual({
        message: "Error while updating category",
        details: { message: 'Unauthorized' }
      })
      expect(axios.request).toHaveBeenCalled()
    })
  })
})