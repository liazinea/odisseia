import styles from './index.module.scss'
import React, { useState, useEffect } from 'react'
import CreatableSelect from 'react-select/creatable'
import { api } from '../../../config/api'
import { Controller } from 'react-hook-form'

const SelectAutores = ({ titulo, campo, control, autores }) => {
    const [opcoesAutores, setOpcoesAutores] = useState([])
    useEffect(() => {
        if (autores && autores.length > 0) {
            const opcoes = autores.map((autor) => ({
                value: autor.nome,
                label: autor.nome,
            }));
            setOpcoesAutores(opcoes)
        }
    }, [autores])

    const atualizaAutores = async (inputValue) => {
        try {
            const response = await api.get(`/autores?autor=${inputValue}`);
            const novasOpcoes = response.data.autores.map((autor) => ({
                value: autor.aut_nome,
                label: autor.aut_nome,
            }));
            setOpcoesAutores((prev) => [...prev, ...novasOpcoes])
        } catch (error) {
            console.error('Erro ao buscar autores:', error)
        }
    };

    return (
        <div>
            <label className={styles.label} htmlFor={campo}>
                {titulo}
            </label>
            <Controller
                name={campo}
                control={control}
                rules={{ required: true }}
                render={({ field: { onChange, value } }) => (
                    <CreatableSelect
                        id={campo}
                        isMulti
                        options={opcoesAutores}
                        placeholder="Selecione ou adicione autores"
                        classNamePrefix="react-select"
                        onChange={(selected) => {
                            onChange(selected ? selected.map((option) => option.value) : [])
                        }}
                        onCreateOption={(inputValue) => {
                            const novoAutor = { value: inputValue, label: inputValue };
                            setOpcoesAutores((prev) => [...prev, novoAutor])
                            onChange([...(value || []), novoAutor.value])
                        }}
                        onInputChange={(inputValue) => {
                            if (inputValue) {
                                atualizaAutores(inputValue);
                            }
                        }}
                        value={
                            value
                                ? value.map((valor) => ({
                                      value: valor,
                                      label: valor,
                                  }))
                                : []
                        }
                    />
                )}
            />
        </div>
    )
}

export default SelectAutores;
