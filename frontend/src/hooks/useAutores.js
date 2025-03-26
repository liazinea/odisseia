import { useEffect, useState } from "react"
import { api } from "../config/api"

function useAutores(param){
    const [autores, setAutores] = useState([])
    useEffect(() =>{
        if(param){
            const buscaAutores = async () => {
                const response = await api.get(`/autores?autor=${param}`)
                setAutores(response.data.autores.data)
            }
            buscaAutores()
        }else{
            const buscaAutores = async () => {
                const response = await api.get(`/autores`)
                setAutores(response.data.autores.data)
            }
            buscaAutores()
        }
    },[])

    return {autores}
}
export default useAutores