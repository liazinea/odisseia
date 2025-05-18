import { useAuth } from "../context/AuthContext"
import { api } from "../config/api"

function useLivrosEGeneros() {
    const { token } = useAuth()

    const buscaLivrosEGeneros = async () => {
        try {
            const response = await api.get(`/livros-por-genero`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            return response.data.livros
        } catch (error) {
            console.error("Erro ao buscar livros:", error)
            return []
        }
    }

    return { buscaLivrosEGeneros }
}

export default useLivrosEGeneros
