import { defineStore } from 'pinia';
import { useI18n } from 'vue-i18n';

export const useLanguageStore = defineStore('language', {
    state: () => ({
        currentLanguage: 'en', 
    }),
    actions: {
        setLanguage(lang) {
            this.currentLanguage = lang;
            const { locale } = useI18n();
            locale.value = lang; 
        },
    },
});
