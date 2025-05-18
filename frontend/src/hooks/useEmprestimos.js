import { useAuth } from "../context/AuthContext"
import { api } from "../config/api"

function useEmprestimos() {
    const { token } = useAuth()

    const buscaEmprestimos = async () => {
        try {
            const response = await api.get(`/emprestimos`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            return response.data.emprestimos
        } catch (error) {
            console.error("Erro ao buscar livros:", error)
            return []
        }
    }

    return { buscaEmprestimos }
}

export default useEmprestimos
