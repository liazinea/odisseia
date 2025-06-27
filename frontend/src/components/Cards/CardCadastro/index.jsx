import React, { useState, useEffect } from "react";
import styles from "./index.module.scss";
import InputForm from "../../Inputs/InputForm";
import InputLivro from "../../Inputs/InputLivro";
import SelectCriavel from "../../Inputs/SelectCriavel";
import SelectSimples from "../../Inputs/Select";
import InputCapa from "../../Inputs/InputCapa";
import BotaoForm from "../../Botao/BotaoForm";
import InputTextArea from "../../Inputs/InputTextArea";
import { useForm } from "react-hook-form";
import useGeneros from "../../../hooks/useGeneros";
import useAutores from "../../../hooks/useAutores";
import api from "../../../services/api";
import { useAuth } from "../../../context/AuthContext";
import ModalMensagem from "../../Modal/ModalMensagem";

const CardCadastro = () => {
  const [generos, setGeneros] = useState([]);
  const [autores, setAutores] = useState([]);
  const [modalMensagemAberto, setModalMensagemAberto] = useState(false);
  const [message, setMessage] = useState(null);
  const { token } = useAuth();
  console.log(autores);

  const [errorsApi, setErrorsApi] = useState();
  const {
    control,
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    const carregarGeneros = async () => {
      const dados = await api.get("/generos/nomes", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setGeneros(dados.data);
    };

    carregarGeneros();
  }, []);

  useEffect(() => {
    const carregarAutores = async () => {
      const dados = await api.get("/autores/nomes", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setAutores(dados.data);
    };

    carregarAutores();
  }, []);

  const onSubmit = async (data) => {
    console.log("Dados brutos:", data);

    const formData = new FormData();
    formData.append("liv_isbn", data.liv_isbn);
    formData.append("liv_numRegistro", data.liv_numRegistro);
    formData.append("liv_edicao", data.liv_edicao);
    formData.append("liv_nome", data.liv_nome);
    formData.append("liv_qtdPaginas", data.liv_qtdPaginas);
    formData.append("liv_dataPubli", data.liv_dataPubli);
    formData.append("liv_editora", data.liv_editora);
    formData.append(`liv_classIndicativa`, data.liv_classIndicativa);
    formData.append(`liv_localizacao`, data.liv_localizacao);
    formData.append("liv_sinopse", data.liv_sinopse);
    formData.append("liv_capa", data.liv_capa[0]);
    if (Array.isArray(data.liv_autores)) {
      for (let i = 0; i < data.liv_autores.length; i++) {
        formData.append(`liv_autores[${i}]`, data.liv_autores[i]);
      }
    }
    if (Array.isArray(data.liv_generos)) {
      for (let i = 0; i < data.liv_generos.length; i++) {
        formData.append(`liv_generos[${i}]`, data.liv_generos[i]);
      }
    }

    for (let [key, value] of formData.entries()) {
      console.log(`${key}: ${value}`);
    }

    try {
      const response = await api.post("/livros", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });

      console.log("Resposta da API:", response.data);
      setMessage(response.data.message)
      setModalMensagemAberto(true);
      closeEditModal();

    } catch (error) {
      if (error.response) {
        console.error("Erro na resposta da API:", error.response.data);
        console.error("Status:", error.response.status);
      } else if (error.request) {
        console.error("Erro na requisição, sem resposta:", error.request);
      } else {
        console.error("Erro ao configurar a requisição:", error.message);
      }
    }
  };

  return (
    <div className={styles.form}>
      <div className={styles.fundo}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className={styles.dupla}>
            <div className={styles.input}>
              {" "}
              {/* Input Título */}
              <InputLivro
                type="text"
                nomeCampo="liv_nome"
                placeholder="Título"
                required={true}
                register={register}
                errors={errors}
              />
            </div>
            <div className={styles.input}>
              {" "}
              {/* Input ISBN */}
              <InputLivro
                type="text"
                nomeCampo="liv_isbn"
                placeholder="ISBN"
                required={true}
                register={register}
                errors={errors}
              />
            </div>
            <div className={styles.inputCanto}>
              {/* Input quantidade de páginas */}
              <InputLivro
                type="number"
                nomeCampo="liv_qtdPaginas"
                placeholder="Nº de páginas"
                required={true}
                register={register}
                errors={errors}
              />
            </div>
          </div>
          <div className={styles.alinhaCapa}>
            <div className={styles.blockDuplas}>
              <div className={styles.dupla}>
                <div className={styles.input}>
                  {/* Input N Registro */}
                  <InputLivro
                    type="number"
                    nomeCampo="liv_numRegistro"
                    placeholder="Número de Registro"
                    required={true}
                    register={register}
                    errors={errors}
                  />
                </div>
                <div className={styles.input}>
                  {/* Input Edição */}
                  <InputLivro
                    type="number"
                    nomeCampo="liv_edicao"
                    placeholder="N° de Edição"
                    required={true}
                    register={register}
                    errors={errors}
                  />
                </div>
              </div>
              <div className={styles.dupla}>
                <div className={styles.input}>
                  {/* Select editora */}
                  <InputLivro
                    type="text"
                    nomeCampo="liv_editora"
                    placeholder="Editora"
                    required={true}
                    register={register}
                    errors={errors}
                  />
                </div>
                <div className={styles.input}>
                  {/* Input data publi */}
                  <InputLivro
                    type="date"
                    nomeCampo="liv_dataPubli"
                    placeholder="Data de publicação"
                    required={true}
                    register={register}
                    errors={errors}
                  />
                </div>
              </div>
              <div className={styles.dupla}>
                <div className={styles.input}>
                  {/* Input estante */}
                  <SelectCriavel
                    nomeCampo="liv_localizacao"
                    placeholder="Estante/Prateleira"
                    values={generos}
                    control={control}
                    rules={{ required: "Campo obrigatório" }}
                    error={errors?.liv_localizacao}
                    isMulti={false}
                  />
                </div>
                <div className={styles.input}>
                  {/* Input Autor */}
                  <SelectCriavel
                    nomeCampo="liv_autores"
                    placeholder="Autores"
                    values={autores}
                    control={control}
                    rules={{ required: "Campo obrigatório" }}
                    error={errors?.liv_autores}
                    isMulti={true}
                  />
                </div>
              </div>
              <div className={styles.dupla}>
                <div className={styles.input}>
                  {/* Input Genero */}
                  <SelectCriavel
                    nomeCampo="liv_generos"
                    placeholder="Gêneros"
                    values={generos}
                    control={control}
                    rules={{ required: "Campo obrigatório" }}
                    error={errors?.liv_generos}
                    isMulti={true}
                  />
                </div>
                <div className={styles.input}>
                  {/* Input Classificação */}
                  <SelectSimples
                    nomeCampo="liv_classIndicativa"
                    placeholder="Classificação indicativa"
                    values={["Livre", "+10", "+12", "+14", "+16", "+18"]}
                    control={control}
                    rules={{ required: "Campo obrigatório" }}
                    error={errors?.liv_classIndicativa}
                    isMulti={false}
                  />
                </div>
              </div>
              <InputTextArea
                nomeCampo={"liv_sinopse"}
                placeholder={"Sinopse"}
                required={true}
                register={register}
                errors={errors}
                errorsApi={errorsApi}
              />
            </div>
            <div className={styles.capaBtn}>
              <div className={styles.capa}>
                <InputCapa
                  required={true}
                  campo={"liv_capa"}
                  titulo={"Capa"}
                  register={register}
                  errors={errors}
                  errorsApi={errorsApi}
                />

                <div className={styles.btn}>
                  <BotaoForm
                    type="button"
                    nomeBotao="cadastrar"
                    texto="Cadastrar"
                    onClick={handleSubmit(onSubmit)} // ← Isso é essencial para o loading funcionar!
                  />

                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
      <ModalMensagem
        mensagemModal={message}
        modalAberto={modalMensagemAberto}
        closeModal={() => setModalMensagemAberto(false)}
      />
    </div>
  );
};

export default CardCadastro;
