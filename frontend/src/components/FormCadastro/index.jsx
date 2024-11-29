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

const FormCadastro = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const onSubmit = data => console.log(data);

  return (

    <form onSubmit={handleSubmit(onSubmit)}>
       {Object.keys(errors).length > 0 && (
              <div className={styles.erroGlobal}>
                <p>reencha todos os capos do formulário</p>
              </div>
            )}
      <div className={styles.fundo}>
        <div className={styles.dupla}>
          <div className={styles.esquerdo}>
            <InputTexto campo={'liv_nome'} register={register} titulo={"Título"} placeholder={"Digite o nome do livro"}
            />
          </div>
          <div className={styles.direito}>
            <InputTexto campo={'liv_isbn'} register={register} titulo={"ISBN"} placeholder={"Digite o ISBN do livro"}
            />
          </div>
        </div>

        <div className={styles.dupla}>
          <div className={styles.esquerdo}>
            <InputTexto campo={'liv_numRegistro'} register={register} titulo={"Número de Registro"} placeholder={"Digite o número de registro do livro"}
            />
          </div>
          <div className={styles.direito}>
            <InputNumero campo={'liv_edicao'} register={register} titulo={"Edição"} placeholder={"Digite a edição do livro"}
            />
          </div>
        </div>

        <div className={styles.dupla}>
          <div className={styles.esquerdo}>
            <InputNumero campo={'liv_qtdPaginas'} register={register} titulo={"Quantidade de páginas"} placeholder={"Digite o número de páginas do livro"}
            />
          </div>
          <div className={styles.direito}>
            <InputDate register={register} campo={'liv_dataPubli'} titulo={"Data de Publicação"} placeholder={"Digite a data de publicação do livro"}
            />
          </div>
        </div>

        <div className={styles.dupla}>
          <div className={styles.esquerdo}>
            <InputTexto  campo={'liv_editora'} register={register} titulo={"Editora"} placeholder={"Digite a editora do livro"}
            />
          </div>
          <div className={styles.direito}>
            <InputTexto campo={'liv_autores'} register={register} titulo={"Autor"} placeholder={"Digite o Autor do livro"}
            />
          </div>
        </div>

        <div className={styles.dupla}>
          <div className={styles.esquerdo}>
            <SelectEstante campo={'liv_localizacao'} register={register} titulo={"Prateleira/Estante"}
            />
          </div>
          <div className={styles.direito}>
            <SelectGenero campo={'liv_generos'} register={register} titulo={"Gênero"}
            />
          </div>
        </div>

        <div className={styles.ultimaDupla}>

          <div className={styles.classSinopse}>
            <div className={styles.classificacao}>
              <Classificacao campo={'liv_classIndicativa'} register={register} titulo={"Classificação Indicativa"} placeholder={"Digite a classificação indicativa do livro"}
              />
            </div>
            <div className={styles.classificacao}>
              <InputSinopse campo={'liv_sinopse'} register={register} titulo={"Sinopse"} placeholder={"Digite a sinopse do livro"}
              />
            </div>
          </div>

          <div className={styles.centraliza}>
            <div className={styles.capa}>
              <InputCapa campo={'liv_capa'} register={register} titulo={"Capa"}
              />
              <BotaoCadastrar className={styles.btn} />
            </div>
          </div>
        </div>

      </div>
    </form>
  );
};
export default FormCadastro;
