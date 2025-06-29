import { useAuth } from "../context/AuthContext"
import { api } from "../config/api"

function useGeneros() {
    const { token } = useAuth()

    const buscaGeneros = async (param) => {
        try {
            const url = param ? `/generos?genero=${param}` : `/generos`
            const response = await api.get(url, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            return response.data.generos.data
        } catch (error) {
            console.error("Erro ao buscar gêneros:", error)
            return []
        }
    }

    const buscaGenerosComLivros = async () => {
        try {
            const response = await api.get(`/generos/com-livros`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            return response.data.generos
        } catch (error) {
            console.error("Erro ao buscar gêneros com livros:", error)
            return []
        }
    }

    return { buscaGeneros, buscaGenerosComLivros }
}

export default useGeneros
