import { useEffect, useState } from "react"
import { api } from "../config/api"

function useLivro(id){
    const [livro, setLivro] = useState([])
    useEffect(() =>{
        const buscaLivro = async () => {
            const response = await api.get(`/livros/${id}`)
            setLivro(response.data.livro.data)
        }
        buscaLivro()
    },[])

    return {livro}
}
export default useLivro