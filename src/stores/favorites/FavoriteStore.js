import { defineStore } from 'pinia'
import { ref } from 'vue'
import Favorite from './Favorite'
import FavoriteService from './FavoriteService'

export const FavoriteStore = defineStore('favorites', () => {

  const currentPage = ref(0);
  const pageSize = ref(8);
  const totalPages = ref(0);

  function addFavorite(favoriteId, productId, userId, accessToken) {
    const favorite = new Favorite(favoriteId, productId, userId, accessToken)
    const service = new FavoriteService(favorite)
    return service.addFavorite()
  }

  function getFavorites(accessToken, page = 0, size = 8) {
    const params = { page, size };
    const service = new FavoriteService()
    return service.getFavorites(accessToken, params)
  }

  function deleteFavorite(favoriteId, accessToken) {
    const service = new FavoriteService()
    return service.deleteFavorite(favoriteId, accessToken)
  }

  return { currentPage, pageSize, totalPages, addFavorite, getFavorites, deleteFavorite }
})
