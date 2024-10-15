import { defineStore } from "pinia";
import NewLettersService from "./NewLettersService";


export const NewLettersStore = defineStore('newLettersStore', () => {


    function setNewLetters(email) {
        try {
            const service = new NewLettersService()
            return service.setNewLetters(email)
        } catch (error) {
            console.error('Error al suscribirse:', error);
        }
    }

    async function unsubscribeNewsletter(code) {
        try {
            const service = new NewLettersService();
            return await service.unsubscribeNewsletter(code);
        } catch (error) {
            console.error('Error unsubscribing:', error);
        }
    }

    return { setNewLetters, unsubscribeNewsletter };
});