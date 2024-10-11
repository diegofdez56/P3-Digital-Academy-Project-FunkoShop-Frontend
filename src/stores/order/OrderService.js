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
};
