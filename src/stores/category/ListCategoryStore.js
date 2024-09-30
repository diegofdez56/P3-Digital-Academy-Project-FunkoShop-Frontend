import { defineStore } from "pinia";
import { ref } from "vue";
import CategoryService from "./CategoryService";


export const CategoryStore = defineStore('profile', () => {

    const category = ref()

    function getCategories() {
        const service = new CategoryService()
        return service.getCategories()
    }

    return { category, getCategories };
});