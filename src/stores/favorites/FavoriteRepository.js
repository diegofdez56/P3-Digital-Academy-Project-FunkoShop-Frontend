import axios from 'axios'

export default class FavoriteRepository {
  constructor() {
    this.baseUrl = import.meta.env.VITE_API_ENDPOINT + '/favorites'
  }

  async getFavorites(accessToken, params = {}) {
    try {
      const headersList = {
        Accept: '*/*',
        Authorization: 'Bearer ' + accessToken,
        'Content-Type': 'application/json'
      }

      let reqOptions = {
        url: this.baseUrl,
        method: 'GET',
        headers: headersList,
        params: params
      }

      const response = await axios.request(reqOptions);
      return response.data;
    } catch (error) {
      return error.toJSON()
    }
  }

  async addFavorite(favorite, accessToken) {
    try {
      let headersList = {
        Accept: '*/*',
        Authorization: 'Bearer ' + accessToken,
        'Content-Type': 'application/json'
      }

      let bodyContent = JSON.stringify({
        productId: favorite.getProductId(),
        userId: favorite.getUserId()
      })

      let reqOptions = {
        url: this.baseUrl,
        method: 'POST',
        headers: headersList,
        data: bodyContent
      }

      const response = await axios.request(reqOptions)

      const data = await response.data

      return data
    } catch (error) {
      return error.toJSON()
    }
  }

  async removeFavorite(favorite, accesToken) {
    try {
      const headersList = {
        Accept: '*/*',
        Authorization: 'Bearer ' + accesToken,
        'Content-Type': 'application/json'
      }

      const reqOptions = {
        url: `${this.baseUrl}/${favorite.getFavoriteId()}`,
        method: 'DELETE',
        headers: headersList
      }

      const response = await axios.request(reqOptions)

      return response.data
    } catch (error) {
      console.error('Error removing favorite:', error)
      return error.response ? error.response.data : error.message
    }
  }
}
