import { useAuth } from "../context/AuthContext"
import { api } from "../config/api"

function useUsuario(id) {
    const { token } = useAuth()

    const buscaUsuario = async () => {
        try {
            const response = await api.get(`/usuarios/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            console.log(response)
            return response
        } catch (error) {
            console.error("Erro ao buscar usuários:", error)
            return []
        }
    }

    return { buscaUsuario }
}

export default useUsuario
