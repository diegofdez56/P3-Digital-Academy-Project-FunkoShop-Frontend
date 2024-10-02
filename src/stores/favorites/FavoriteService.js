import FavoriteRepository from './FavoriteRepository'

export default class FavoriteService {
  #repo
  #favorite

  constructor(favorite) {
    this.#repo = new FavoriteRepository()
    this.#favorite = favorite
  }

  async addFavorite() {
    const response = await this.#repo.addFavorite(this.#favorite)
    return response
  }

  async getFavorites(accessToken) {
    const response = await this.#repo.getFavorites(accessToken)
    return response
  }

  async deleteFavorite(favoriteId, accessToken) {
    const response = await this.#repo.deleteFavorite(favoriteId, accessToken)
    return response
  }
}
