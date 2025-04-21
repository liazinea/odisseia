import { useAuth } from "../context/AuthContext"
import { api } from "../config/api"

function useLivro(id) {
    const { token } = useAuth()

    const buscaLivro = async () => {
        try {
            const response = await api.get(`/livro/4`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            return response
        } catch (error) {
            console.error("Erro ao buscar livros:", error)
            return []
        }
    }

    return { buscaLivro }
}

export default useLivro
