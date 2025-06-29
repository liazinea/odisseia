import { useAuth } from "../context/AuthContext"
import { api } from "../config/api"

function useEmprestimos() {
    const { token, user } = useAuth()

    const buscaEmprestimos = async () => {
        try {
            const response = await api.get(`/emprestimos`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            return response.data.emprestimos
        } catch (error) {
            console.error("Erro ao buscar empréstimos:", error)
            return []
        }
    }

    const buscaEmprestimosPorUsuario = async (usuarioId = user?.usu_id) => {
        if (!usuarioId) return []

        try {
            const response = await api.get(`/emprestimos/usuario/${usuarioId}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            return response.data.emprestimos
        } catch (error) {
            console.error("Erro ao buscar empréstimos do usuário:", error)
            return []
        }
    }

    return {
        buscaEmprestimos,
        buscaEmprestimosPorUsuario,
    }
}

export default useEmprestimos
