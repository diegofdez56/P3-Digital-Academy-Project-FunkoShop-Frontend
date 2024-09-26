export default class Product {
    constructor({
      id = null,
      name = '',
      description = '',
      price = 0.0,
      discount = null,
      image = '',
      category = {},
      isAvailable = true,
      stock = 0,
      isNew = false,
    }) {
      this.id = id;
      this.name = name;
      this.description = description;
      this.price = price;
      this.discount = discount;
      this.image = image;
      this.category = category;
      this.isAvailable = isAvailable;
      this.stock = stock;
      this.isNew = isNew;
    }
  }
  