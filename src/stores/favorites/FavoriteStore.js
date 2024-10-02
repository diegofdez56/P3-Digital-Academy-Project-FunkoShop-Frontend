import { defineStore } from 'pinia'
import { ref } from 'vue'
import Favorite from './Favorite'
import FavoriteService from './FavoriteService'

export const FavoriteStore = defineStore('favorites', () => {
  const favorite = ref({
    favoriteId: '',
    productId: '',
    userId: '',
    accessToken: ''
  })

  function addFavorite(favoriteId, productId, userId, accessToken) {
    const favorite = new Favorite(favoriteId, productId, userId, accessToken)
    const service = new FavoriteService(favorite)
    return service.addFavorite()
  }

  function getFavorites(accessToken) {
    const service = new FavoriteService()
    return service.getFavorites(accessToken)
  }

  function deleteFavorite(favoriteId, accessToken) {
    const service = new FavoriteService()
    return service.deleteFavorite(favoriteId, accessToken)
  }

  return { favorite, addFavorite, getFavorites, deleteFavorite }
})
