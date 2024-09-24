import PerfilRepository from "./PerfilRepository"

export default class PerfilService {

    #repo
    #perfil

    constructor(perfil) {
        this.#repo = new PerfilRepository()
        this.#perfil = perfil
    }

    async setProfile() {
        const response = await this.#repo.setProfile(this.#perfil)
        return response
    }

    async getProfile(accessToken) {
        const response = await this.#repo.getProfile(accessToken)
        return response
    }

}