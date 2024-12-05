import styles from './index.module.scss'
import React, { useState, useEffect } from 'react'
import CreatableSelect from 'react-select/creatable'
import { api } from '../../../config/api'
import { Controller } from 'react-hook-form'

const SelectAutores = ({ register, titulo, campo, control, autores, errors, errorsApi }) => {
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
            <div className={styles.principal}>
                <p className={styles.label} htmlFor={campo}>{titulo}</p>
                {errors?.[campo] && <span className={styles.erro}>{errors[campo].message}</span>}
                {typeof errorsApi == 'string' ? (
                    <span className={styles.erro}>{errorsApi}</span>
                ) : (
                    errorsApi && Array.isArray(errorsApi) && errorsApi.map((erroApi) => (
                        <span className={styles.erro} key={erroApi}>
                            {erroApi}
                        </span>
                    ))
                )}
            </div>
            <Controller
                className={styles.select}
                name={campo}
                control={control}
                {...register(campo, { required: "*Este campo é obrigatório" })}
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
