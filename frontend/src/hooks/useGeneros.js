import { useEffect, useState } from "react"
import { api } from "../config/api"

function useGeneros(param){
    const [generos, setGeneros] = useState([])
    useEffect(() =>{
        if(param){
            const buscaGeneros = async () => {
                const response = await api.get(`/generos?genero=${param}`)
                setGeneros(response.data.generos.data)
            }
            buscaGeneros()
        }else{
            const buscaGeneros = async () => {
                const response = await api.get(`/generos`)
                setGeneros(response.data.generos.data)
            }
            buscaGeneros()
        }
    },[])

    return {generos}
}

export default useGeneros