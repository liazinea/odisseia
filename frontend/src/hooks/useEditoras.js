import { useAuth } from "../context/AuthContext"
import { api } from "../config/api"

function useEditoras() {
    const { token } = useAuth()

    const buscaEditoras = async (param) => {
        try {
            const url = param ? `/editoras?editora=${param}` : `/editoras`
            const response = await api.get(url, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            return response.data.editoras.data
        } catch (error) {
            console.error("Erro ao buscar editoras:", error)
            return []
        }
    }

    return { buscaEditoras }
}

export default useEditoras
