import { useAuth } from "../context/AuthContext"
import { api } from "../config/api"

function useUsuarios() {
    const { token } = useAuth()

    const buscaUsuarios = async () => {
        try {
            const response = await api.get(`/usuarios`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            return response.data.usuarios.data
        } catch (error) {
            console.error("Erro ao buscar usuários:", error)
            return []
        }
    }

    return { buscaUsuarios }
}

export default useUsuarios
