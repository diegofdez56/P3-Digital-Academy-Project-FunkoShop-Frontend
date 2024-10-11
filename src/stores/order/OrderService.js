import OrderRepository from "./OrderRepository"

export default class OrderService {
  #repo

  constructor() {
    this.#repo = new OrderRepository()
  }

  async addOrder(accessToken, order) {
    const response = await this.#repo.addOrder(accessToken, order)
    return response
  }

  async fetchAllOrdersByUser(accessToken, params) {
    const response = await this.#repo.fetchAllOrdersByUser(accessToken, params)
    return response
  }

  async fetchAllOrdersByAdmin(accessToken, params) {
    const response = await this.#repo.fetchAllOrdersByAdmin(accessToken, params)
    return response
  }
};
