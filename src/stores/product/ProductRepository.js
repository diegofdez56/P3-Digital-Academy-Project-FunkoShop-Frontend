import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_ENDPOINT + '/products';

export default {
  async fetchAllProducts(page = 0, sizeValue = 8, sortBy = 'name', sortOrder = 'asc', category = null) {
    const params = { page, size: sizeValue, sort: `${sortBy},${sortOrder}` };
    let url = BASE_URL;

    if (category && category.id !== null) {
      url = `${BASE_URL}/category/${category.id}`;
    }

    const response = await axios.get(url, { params });
    return response.data;
  },

  async fetchProductById(id) {
    const response = await axios.get(`${BASE_URL}/${id}`);
    return response.data;
  },

  async searchProductsByKeyword(keyword, page = 0, sizeValue = 8, sortBy = 'categoryId,name', sortOrder = 'asc') {
    const response = await axios.get(`${BASE_URL}/keyword/${keyword}`, {
      params: { page, size: sizeValue, sort: `${sortBy},${sortOrder}` },
    });
    return response.data;
  },

  async fetchDiscountedProducts() {
    const response = await axios.get(`${BASE_URL}/discounted`);
    return response.data;
  },

  async fetchNewProducts() {
    const response = await axios.get(`${BASE_URL}/new`);
    return response.data;
  },

  async updateProduct(id, productData) {
    const response = await axios.put(`${BASE_URL}/${id}`, productData);
    return response.data;
  },

  async deleteProduct(id) {
    await axios.delete(`${BASE_URL}/${id}`);
  },
};
