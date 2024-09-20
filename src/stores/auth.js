import { ref } from "vue";
import { defineStore } from "pinia";
import AuthService from "../core/apis/spring/auth/AuthService";
import Credentials from "@/core/models/Credentials";
import RegisterService from "@/core/apis/spring/auth/RegisterService";


export const useAuthStore = defineStore('auth', () => {

    const user = ref(
        {
            id: '',
            email: '',
            role: '',
            isAuthenticated: false,
            access_token: '',
            refresh_token: ''
        }
    )

    function login(username, password) {

        const credentials = new Credentials(username, password)
        const service = new AuthService(credentials)
        return service.login()

    }


    function register(email, password) {

        const credentialsRegister = { email, password };
        const service = new RegisterService(credentialsRegister);
        return service.register();

    }

    return { user, login, register };
});