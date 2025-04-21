import { useAuth } from "../context/AuthContext"
import { api } from "../config/api"

function useAutores() {
    const { token } = useAuth()

    const buscaAutores = async (param) => {
        try {
            const url = param ? `/autores?autor=${param}` : `/autores`
            const response = await api.get(url, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            return response.data.autores.data
        } catch (error) {
            console.error("Erro ao buscar autores:", error)
            return []
        }
    }

    return { buscaAutores }
}

export default useAutores
