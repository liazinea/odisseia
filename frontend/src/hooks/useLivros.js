import { useEffect, useState } from "react"
import { api } from "../config/api"

function useLivros(){
    const [livros, setLivros] = useState([])
    useEffect(() =>{
        const buscaLivros = async () => {
            const response = await api.get(`/livros`)
            setLivros(response.data.livros.data)
        }
        buscaLivros()
    },[])

    return {livros}
}
export default useLivros