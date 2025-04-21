import BotaoForm from "../../Botao/BotaoForm";
import InputCapa from "../../Inputs/InputCapa";
import InputLivro from "../../Inputs/InputLivro";
import InputTextArea from "../../Inputs/InputTextArea";
import SelectLivro from "../../Inputs/SelectLivro";
import styles from "./index.module.scss";
import { useForm } from "react-hook-form";
import api from "../../../services/api";
import { useAuth } from "../../../context/AuthContext";
import { useState, useEffect } from "react";

const FormModal = ({ modalEditarAberto = false, livro = {}, closeModal, errorsApi }) => {
  const {
    register,
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append('_method', 'PUT');

    formData.append("liv_isbn", data.liv_isbn);
    formData.append("liv_numRegistro", data.liv_numRegistro);
    formData.append("liv_edicao", data.liv_edicao);
    formData.append("liv_nome", data.liv_nome);
    formData.append("liv_qtdPaginas", data.liv_qtdPaginas);
    formData.append("liv_dataPubli", data.liv_dataPubli);
    formData.append("liv_editora", data.liv_editora);
    if (Array.isArray(data.liv_classIndicativa)) {
      for (let i = 0; i < data.liv_classIndicativa.length; i++) {
        formData.append(`liv_classIndicativa`, data.liv_classIndicativa[i]);
      }
    }
    if (Array.isArray(data.liv_localizacao)) {
      for (let i = 0; i < data.liv_localizacao.length; i++) {
        formData.append(`liv_localizacao`, data.liv_localizacao[i]);
      }
    }
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
          Authorization: `Bearer ${token}`
        }
      });

      console.log('Resposta da API:', response.data);
    } catch (error) {
      if (error.response) {

        console.error('Erro na resposta da API:', error.response.data);
        console.error('Status:', error.response.status);
      } else if (error.request) {

        console.error('Erro na requisição, sem resposta:', error.request);
      } else {

        console.error('Erro ao configurar a requisição:', error.message);
      }
    }

  };

  
      const [generos, setGeneros] = useState([]);
      const [autores, setAutores] = useState([])
      const {token} = useAuth()
      console.log(token)
  
      useEffect(() => {
        const carregarGeneros = async () => {
          const dados = await api.get('/generos/nomes', {
            headers: {
              Authorization: `Bearer ${token}`
            }
          })
    
          setGeneros(dados.data)
        };
    
        carregarGeneros();
      }, []);
    
      useEffect(() => {
        const carregarAutores = async () => {
          const dados = await api.get('/autores/nomes', {
            headers: {
              Authorization: `Bearer ${token}`
            }
          })
    
          setAutores(dados.data)
        };
    
        carregarAutores();
      }, []);

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
                filledStatus={livro.nome}
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
                filledStatus={livro.isbn}
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
                    filledStatus={livro.numRegistro}
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
              <SelectLivro
                    nomeCampo="liv_localizacao"
                    placeholder="Localização/Estante"
                    values={generos}
                    control={control}
                    rules={{ required: "Campo obrigatório" }}
                    error={errors?.liv_localizacao}
                    isMulti={true}
                  />
            </div>
            <div className={styles.input}>
              {/* Input Autor */}
              <SelectLivro
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
              <SelectLivro
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
              <SelectLivro
                    nomeCampo="liv_classIndicativa"
                    placeholder="Classificação indicativa"
                    values={["Estante A", "Estante B", "Estante C"]}
                    control={control}
                    rules={{ required: "Campo obrigatório" }}
                    error={errors?.liv_classIndicativa}
                    isMulti={true}
                  />
            </div>
          </div>
          <div className={styles.alinhaCapa}>
            <div className={styles.ultimoInput}>
              <div className={styles.input}>
              
              </div>
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
              />
                <InputLivro
                  type="number"
                  nomeCampo="liv_qtdPaginas"
                  placeholder="Número de páginas"
                  required={true}
                  register={register}
                  errors={errors}
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
                    nomeBotao={"cadastrar"}
                    texto={"Cadastrar"}
                  />
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
export default FormModal;
