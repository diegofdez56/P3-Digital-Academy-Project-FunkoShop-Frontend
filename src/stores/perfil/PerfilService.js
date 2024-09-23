import PerfilRepository from "./PerfilRepository"

export default class PerfilService {

    #repo
    #perfil

    constructor(perfil) {
        this.#repo = new PerfilRepository()
        this.#perfil = perfil
    }

    async setPerfil() {
        const response = await this.#repo.setPerfil(this.#perfil)
        return response
    }

}