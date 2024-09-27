import './assets/main.css'
import 'tailwindcss/tailwind.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createI18n } from 'vue-i18n'

import App from './App.vue'
import router from './router'

const i18n = createI18n({
    locale: 'en',
    messages: {
        en: {
            message: {
                hello: 'hello world'
            }
        },
        sp: {
            message: {
                hello: 'hola mundo'
            }
        }
    }
})

const app = createApp(App)

app.use(createPinia(), i18n)
app.use(router)

app.mount('#app')
