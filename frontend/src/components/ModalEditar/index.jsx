import React, { useEffect, useState } from "react";
import styles from "./index.module.scss"; // Estilos do modal
import InputNumero from "../FormCadastro/InputNumero"; // Corrigido o caminho
import InputTexto from "../FormCadastro/InputTexto"; // Corrigido o caminho
import InputDate from "../FormCadastro/InputDate"; // Corrigido o caminho
import SelectEstante from "../FormCadastro/SelectEstante"; // Corrigido o caminho
import SelectGenero from "../FormCadastro/SelectGenero"; // Corrigido o caminho
import Classificacao from "../FormCadastro/SelectClassificacao"; // Corrigido o caminho
import InputCapa from "../FormCadastro/InputCapa"; // Corrigido o caminho
import InputSinopse from "../FormCadastro/InputSinopse"; // Corrigido o caminho
import SelectAutores from "../FormCadastro/SelectAutores"; // Corrigido o caminho
import { useForm } from "react-hook-form";
import useAutores from "../../hooks/useAutores";
import useGeneros from "../../hooks/useGeneros";
import BotaoCadastrar from "../FormCadastro/BotaoCadastrar";
import { api } from "../../config/api";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ModalEditar = ({ showModal, onClose, livro }) => {
  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm();
  const { autores } = useAutores();
  const { generos } = useGeneros();

  const sucesso = () => toast("Livro editado com sucesso!");
  const erro = () => toast("Erro ao editar livro!");

  const onSubmit = async (data) => {
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        value.forEach((item, index) => {
          formData.append(`${key}[${index}]`, item);
        });
      } else if (key === "liv_capa" && value instanceof FileList) {
        formData.append(key, value[0]);
      } else {
        formData.append(key, value);
      }
    });

    try {
      await api.put(`/livros/${livro.id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      sucesso();
      onClose(); // Fechar o modal após sucesso
    } catch (error) {
      erro();
      console.error("Erro ao editar livro:", error.response.data);
    }
  };

  return (
    <div className={`${styles.modal} ${showModal ? styles.exibir : ""}`}>
      <div className={styles.conteudoModal}>
        <div className={styles.header}>
          <h2>Editar Livro</h2>
          <button className={styles.close} onClick={onClose}>
            X
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <ToastContainer />
          <div className={styles.body}>
            <div className={styles.dupla}>
              <div className={styles.esquerdo}>
                <InputTexto
                  campo="liv_nome"
                  register={register}
                  titulo="Título"
                  placeholder="Digite o nome do livro"
                />
              </div>
              <div className={styles.direito}>
                <InputTexto
                  campo="liv_isbn"
                  register={register}
                  titulo="ISBN"
                  placeholder="Digite o ISBN do livro"
                />
              </div>
            </div>
            <div className={styles.dupla}>
              <div className={styles.esquerdo}>
                <InputTexto
                  campo="liv_numRegistro"
                  register={register}
                  titulo="Número de Registro"
                  placeholder="Digite o número de registro do livro"
                />
              </div>
              <div className={styles.direito}>
                <InputNumero
                  campo="liv_edicao"
                  register={register}
                  titulo="Edição"
                  placeholder="Digite a edição do livro"
                />
              </div>
            </div>

            <div className={styles.dupla}>
              <div className={styles.esquerdo}>
                <InputNumero
                  campo="liv_qtdPaginas"
                  register={register}
                  titulo="Quantidade de páginas"
                  placeholder="Digite o número de páginas do livro"
                />
              </div>
              <div className={styles.direito}>
                <InputDate
                  register={register}
                  campo="liv_dataPubli"
                  titulo="Data de Publicação"
                  placeholder="Digite a data de publicação do livro"
                />
              </div>
            </div>

            <div className={styles.dupla}>
              <div className={styles.esquerdo}>
                <InputTexto
                  campo="liv_editora"
                  register={register}
                  titulo="Editora"
                  placeholder="Digite a editora do livro"
                />
              </div>
              <div className={styles.direito}>
                <SelectAutores
                  autores={autores}
                  control={control}
                  campo="liv_autores"
                  register={register}
                  titulo="Autor"
                  placeholder="Digite o Autor do livro"
                />
              </div>
            </div>

            <div className={styles.dupla}>
              <div className={styles.esquerdo}>
                <SelectEstante
                  estantes={generos}
                  campo="liv_localizacao"
                  register={register}
                  titulo="Prateleira/Estante"
                />
              </div>
              <div className={styles.direito}>
                <SelectGenero
                  generos={generos}
                  control={control}
                  campo="liv_generos"
                  register={register}
                  titulo="Gênero"
                />
              </div>
            </div>

            <div className={styles.ultimaDupla}>
              <div className={styles.classSinopse}>
                <div className={styles.classificacao}>
                  <Classificacao
                    campo="liv_classIndicativa"
                    register={register}
                    titulo="Classificação Indicativa"
                    placeholder="Digite a classificação indicativa do livro"
                  />
                </div>
                <div className={styles.classificacao}>
                  <InputSinopse
                    campo="liv_sinopse"
                    register={register}
                    titulo="Sinopse"
                    placeholder="Digite a sinopse do livro"
                  />
                </div>
              </div>

              <div className={styles.centraliza}>
                <div className={styles.capa}>
                  <InputCapa
                    campo="liv_capa"
                    register={register}
                    titulo="Capa"
                  />
                  <BotaoCadastrar className={styles.btn} />
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ModalEditar;
