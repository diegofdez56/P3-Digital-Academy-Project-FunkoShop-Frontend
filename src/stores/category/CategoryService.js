import CategoryRepository from "./CategoryRepository"

export default class CategoryService {

    #repo

    constructor() {
        this.#repo = new CategoryRepository()
    }

    async getCategories() {
        const response = await this.#repo.getCategories()
        return response
    }

}