import styles from "./index.module.scss";
import InputNumero from "./InputNumero";
import InputTexto from "./InputTexto";
import InputDate from "./InputDate";
import SelectEstante from "./SelectEstante";
import SelectGenero from "./SelectGenero";

import React, { useState } from "react";
import Classificacao from "./SelectClassificacao";
import InputCapa from "./InputCapa";
import InputSinopse from "./InputSinopse";
import BotaoCadastrar from "./BotaoCadastrar";

import { useForm } from 'react-hook-form';
import useAutores from "../../hooks/useAutores";
import SelectAutores from "./SelectAutores";
import useGeneros from "../../hooks/useGeneros";
import { api } from "../../config/api";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const FormCadastro = () => {
  const { register, handleSubmit,control, formState: { errors }, trigger } = useForm();
  const {autores} = useAutores()
  const {generos} = useGeneros()
  const sucesso = () => toast("Livro cadastrado com sucesso!");
  const erro = () => toast();
  const onSubmit = async (data) =>{

    const formData = new FormData()

    Object.entries(data).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        value.forEach((item, index) => {
          formData.append(`${key}[${index}]`, item);
        });
      } else if (key === "liv_capa" && value instanceof FileList ) {
        console.log('Arquivo selecionado:', value[0]);
        formData.append(key, value[0]);
      } else {
        formData.append(key, value);
      }
    })
    try {
      const response = await api.post('/livros', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      sucesso();
    } catch (error) {
      erro('Erro ao enviar dados');
      console.error('Erro ao enviar dados:', error.response.data)
    }
  }

  return (

    <form
  onSubmit={handleSubmit(async (data) => {
    const isValid = await trigger(); // Valida todos os campos manualmente
    if (!isValid) {
      erro("Preencha todos os campos");
      return; // Impede o envio se houver erros
    }
    onSubmit(data);
  })}
>
  <ToastContainer />
  <div className={styles.fundo}>
    <div className={styles.dupla}>
      <div className={styles.esquerdo}>
        <InputTexto
          campo={"liv_nome"}
          register={register}
          titulo={"Título"}
          placeholder={"Digite o nome do livro"}
          errors={errors}
        />
      </div>
      <div className={styles.direito}>
        <InputTexto
          campo={"liv_isbn"}
          register={register}
          titulo={"ISBN"}
          placeholder={"Digite o ISBN do livro"}
          errors={errors}
        />
      </div>
    </div>
    <div className={styles.dupla}>
      <div className={styles.esquerdo}>
        <InputTexto
          campo={"liv_numRegistro"}
          register={register}
          titulo={"Número de Registro"}
          placeholder={"Digite o número de registro do livro"}
          errors={errors}
        />
      </div>
      <div className={styles.direito}>
        <InputNumero
          campo={"liv_edicao"}
          register={register}
          titulo={"Edição"}
          placeholder={"Digite a edição do livro"}
          errors={errors}
        />
      </div>
    </div>

        <div className={styles.dupla}>
          <div className={styles.esquerdo}>
            <InputNumero campo={'liv_qtdPaginas'} register={register} errors={errors} titulo={"Quantidade de páginas"} placeholder={"Digite o número de páginas do livro"}
            />
          </div>
          <div className={styles.direito}>
            <InputDate register={register} errors={errors} campo={'liv_dataPubli'} titulo={"Data de Publicação"} placeholder={"Digite a data de publicação do livro"}
            />
          </div>
        </div>

        <div className={styles.dupla}>
          <div className={styles.esquerdo}>
            <InputTexto  campo={'liv_editora'} register={register} errors={errors} titulo={"Editora"} placeholder={"Digite a editora do livro"}
            />
          </div>
          <div className={styles.direito}>
            <SelectAutores
            autores={autores} control={control} errors={errors} campo={'liv_autores'} register={register} titulo={"Autor"} placeholder={"Digite o Autor do livro"}
            />
          </div>
        </div>

        <div className={styles.dupla}>
          <div className={styles.esquerdo}>
            <SelectEstante estantes={generos} errors={errors} campo={'liv_localizacao'} register={register} titulo={"Prateleira/Estante"}
            />
          </div>
          <div className={styles.direito}>
            <SelectGenero generos={generos} errors={errors} control={control} campo={'liv_generos'} register={register} titulo={"Gênero"}
            />
          </div>
        </div>

        <div className={styles.ultimaDupla}>

          <div className={styles.classSinopse}>
            <div className={styles.classificacao}>
              <Classificacao campo={'liv_classIndicativa'} errors={errors} register={register} titulo={"Classificação Indicativa"} placeholder={"Digite a classificação indicativa do livro"}
              />
            </div>
            <div className={styles.classificacao}>
              <InputSinopse campo={'liv_sinopse'} errors={errors} register={register} titulo={"Sinopse"} placeholder={"Digite a sinopse do livro"}
              />
            </div>
          </div>

          <div className={styles.centraliza}>
            <div className={styles.capa}>
              <InputCapa campo={'liv_capa'} register={register} titulo={"Capa"} errors={errors}
              />
              <BotaoCadastrar className={styles.btn} />
            </div>
          </div>
        </div>

      </div>
    </form>
  )
}
export default FormCadastro;
