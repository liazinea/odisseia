import { useAuth } from "../context/AuthContext"
import { api } from "../config/api"

function useLivros() {
    const { token } = useAuth()

    const buscaLivros = async () => {
        try {
            const response = await api.get(`/livros`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            return response.data.livros.data
        } catch (error) {
            console.error("Erro ao buscar livros:", error)
            return []
        }
    }

    return { buscaLivros }
}

export default useLivros
