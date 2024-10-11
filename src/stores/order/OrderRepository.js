import axios from 'axios'

export default class OrderRepository {
  constructor() {
    this.baseUrl = import.meta.env.VITE_API_ENDPOINT + '/orders'
  }

  async addOrder(accessToken, order) {
    try {
      let headersList = {
        Accept: '*/*',
        Authorization: 'Bearer ' + accessToken,
        'Content-Type': 'application/json'
      }

      let reqOptions = {
        url: this.baseUrl,
        method: 'POST',
        headers: headersList,
        data: order
      }

      const response = await axios.request(reqOptions)
      return response.data
    } catch (error) {
      return error.toJSON()
    }
  }

}
