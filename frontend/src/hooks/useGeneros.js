import { useEffect, useState } from "react"
import { api } from "../config/api"
import { useAuth } from "../context/AuthContext"

function useGeneros(param){
    const {token} = useAuth()
    const [generos, setGeneros] = useState([])
    useEffect(() =>{
        if(param){
            const buscaGeneros = async () => {
                const response = await api.get(`/generos?genero=${param}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                      }
                })
                setGeneros(response.data.generos.data)
            }
            buscaGeneros()
        }else{
            const buscaGeneros = async () => {
                const response = await api.get(`/generos`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
                setGeneros(response.data.generos.data)
            }
            buscaGeneros()
        }
    },[])

    return {generos}
}

export default useGeneros