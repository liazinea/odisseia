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

    const buscaLivrosMaisEmprestados = async () => {
        try {
            const response = await api.get(`/livros/mais-emprestados`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            return response.data.livros;
        } catch (error) {
            console.error("Erro ao buscar livros mais emprestados:", error);
            return [];
        }
    };

    return { buscaLivros, buscaLivrosMaisEmprestados }
}

export default useLivros
