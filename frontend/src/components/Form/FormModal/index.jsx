import BotaoForm from "../../Botao/BotaoForm";
import InputCapa from "../../Inputs/InputCapa";
import InputLivro from "../../Inputs/InputLivro";
import InputTextArea from "../../Inputs/InputTextArea";
import SelectCriavel from "../../Inputs/SelectCriavel";
import styles from "./index.module.scss";
import { useForm } from "react-hook-form";
import api from "../../../services/api";
import { useAuth } from "../../../context/AuthContext";
import { useState, useEffect } from "react";
import ModalMensagem from "../../Modal/ModalMensagem";

const FormModal = ({
  modalEditarAberto = false,
  livro = {},
  closeModal,
  errorsApi
}) => {
  const {
    register,
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm();

  const [modalMensagemAberto, setModalMensagemAberto] = useState(false);
  const [message, setMessage] = useState(null);
  useEffect(() => {
    if (!modalMensagemAberto && message) {
      closeModal(); // Fechar o FormModal quando a ModalMensagem for fechada
    }
  }, [modalMensagemAberto]);

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append("_method", "PUT");

    formData.append("liv_isbn", data.liv_isbn);
    formData.append("liv_numRegistro", data.liv_numRegistro);
    formData.append("liv_edicao", data.liv_edicao);
    formData.append("liv_nome", data.liv_nome);
    formData.append("liv_qtdPaginas", data.liv_qtdPaginas);
    formData.append("liv_dataPubli", data.liv_dataPubli);
    formData.append("liv_editora", data.liv_editora);
    formData.append("liv_classIndicativa", data.liv_classIndicativa);
    formData.append("liv_localizacao", data.liv_localizacao);
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
      for (let [key, value] of formData.entries()) {
        console.log(`${key}: ${value}`);
      }
      const response = await api.post(`/livros/${livro.id}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setMessage(response.data.message);
      setModalMensagemAberto(true);
      console.log("Resposta da API:", response.data);
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

  const [generos, setGeneros] = useState([]);
  const [autores, setAutores] = useState([]);
  const { token } = useAuth();

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

  useEffect(() => {
    preencheModal();
  }, [autores, generos, livro]);

  function preencheModal() {
    setValue("liv_nome", livro.nome);
    setValue("liv_isbn", livro.isbn);
    setValue("liv_numRegistro", livro.numRegistro);
    setValue("liv_edicao", livro.edicao);
    setValue("liv_qtdPaginas", livro.qtdPaginas);
    setValue("liv_dataPubli", livro.dataPubli);
    setValue("liv_editora", livro.editora?.nome);
    setValue(
      "liv_generos",
      livro.generos?.map((g) => g.nome)
    );
    setValue(
      "liv_autores",
      livro.autores?.map((a) => a.nome)
    );
    setValue("liv_localizacao", livro.localizacao);
    setValue("liv_classIndicativa", livro.classificacaoIndicativa);
    setValue("liv_sinopse", livro.sinopse);
    setValue("liv_capa", livro.capa);
    console.log(livro);
  }

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
                filledStatus={true}
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
                filledStatus={true}
              />
            </div>
          </div>
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
                filledStatus={true}
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
                filledStatus={true}
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
                filledStatus={true}
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
                filledStatus={true}
              />
            </div>
          </div>
          <div className={styles.dupla}>
            <div className={styles.input}>
              {/* Input estante */}
              <SelectCriavel
                nomeCampo="liv_localizacao"
                placeholder="Localização/Estante"
                values={generos}
                control={control}
                rules={{ required: "Campo obrigatório" }}
                error={errors?.liv_localizacao}
                isMulti={false}
                filledStatus={true}
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
                filledStatus={true}
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
                filledStatus={true}
              />
            </div>
            <div className={styles.input}>
              {/* Input Classificação */}
              <SelectCriavel
                nomeCampo="liv_classIndicativa"
                placeholder="Classificação indicativa"
                values={["Livre", "+10", "+12", "+14", "+16", "+18"]}
                control={control}
                rules={{ required: "Campo obrigatório" }}
                error={errors?.liv_classIndicativa}
                isMulti={false}
                filledStatus={true}
              />
            </div>
          </div>
          <div className={styles.alinhaCapa}>
            <div className={styles.ultimoInput}>
              <div className={styles.input}></div>
              <InputLivro
                type="number"
                nomeCampo="liv_qtdPaginas"
                placeholder="Número de páginas"
                required={true}
                register={register}
                errors={errors}
                filledStatus={true}
              />
              <div className={styles.input}>
                {" "}
                {/* Select Status */}
                <InputTextArea
                  nomeCampo={"liv_sinopse"}
                  placeholder={"Sinopse"}
                  required={true}
                  register={register}
                  errors={errors}
                  errorsApi={errorsApi}
                  filledStatus={true}
                />
              </div>
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
                    type={"submit"}
                    nomeBotao={"atualizar"}
                    texto={"Atualizar"}
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
export default FormModal;