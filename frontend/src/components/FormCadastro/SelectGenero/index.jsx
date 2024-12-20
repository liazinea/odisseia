import styles from './index.module.scss'
import React, { useState, useEffect } from 'react'
import CreatableSelect from 'react-select/creatable'
import { api } from '../../../config/api'
import { Controller } from 'react-hook-form'

const SelectGenero = ({ titulo, campo, register, control, generos, errors, errorsApi, defaultValues }) => {
  const [opcoesGeneros, setOpcoesGeneros] = useState([]);
  const [defaultGeneros, setDefaultGeneros] = useState([]);

  // Atualiza o estado defaultGeneros quando defaultValues mudar
  useEffect(() => {
    if (defaultValues && defaultValues.length > 0) {
      const generosValores = defaultValues.map((genero) => genero.nome);
      setDefaultGeneros(generosValores);
    }
  }, [defaultValues]); // O efeito roda quando defaultValues mudar

  useEffect(() => {
    if (generos && generos.length > 0) {
      const opcoes = generos.map((genero) => ({
        value: genero.nome,
        label: genero.nome,
      }));
      setOpcoesGeneros(opcoes);
    }
  }, [generos]);

  const atualizaGeneros = async (inputValue) => {
    try {
        const response = await api.get(`/generos?genero=${inputValue}`);
        const novasOpcoes = response.data.generos.map((genero) => ({
            value: genero.gen_nome,
            label: genero.gen_nome,
        }));
        setOpcoesGeneros((prev) => [...prev, ...novasOpcoes]);
    } catch (error) {
        console.error('Erro ao buscar generos:', error);
    }
  };

  return (
    <div>
      <div className={styles.principal}>
        <p className={styles.label} htmlFor={campo}>{titulo}</p>
        {errors?.[campo] && <span className={styles.erro}>{errors[campo].message}</span>}
        {typeof errorsApi === 'string' ? (
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
        name={campo}
        control={control}
        defaultValue={defaultGeneros} // Usando o estado defaultGeneros como valor padrão
        {...register(campo, { required: "*Este campo é obrigatório" })}
        render={({ field: { onChange, value } }) => (
          <CreatableSelect
            id={campo}
            isMulti
            options={opcoesGeneros}
            placeholder="Selecione generos"
            classNamePrefix="react-select"
            onChange={(selected) => {
              onChange(selected ? selected.map((option) => option.value) : []);
            }}
            onCreateOption={(inputValue) => {
              const novoGenero = { value: inputValue, label: inputValue };
              setOpcoesGeneros((prev) => [...prev, novoGenero]);
              onChange([...(value || []), novoGenero.value]);
            }}
            onInputChange={(inputValue) => {
              if (inputValue) {
                atualizaGeneros(inputValue);
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
  );
};

export default SelectGenero;
