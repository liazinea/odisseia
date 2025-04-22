import { useState, useEffect } from "react";
import HeaderPagina from "../../components/layout/HeaderPagina";
import styles from "./index.module.scss";
import Button from "../../components/Botao/Botao";
import Input from "../../components/Inputs/Input";
import useGeneros from "../../hooks/useGeneros";
import BarraPesquisa from "../../components/layout/HeaderHome/BarraPesquisa";
import ListaGeneros from "../../components/layout/ListaGeneros";
import { useForm } from "react-hook-form";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { api } from "../../config/api";
import ModalMensagem from "../../components/Modal/ModalMensagem";

const Generos = () => {
  const { token } = useAuth();
  const { userType } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!token || userType != 1) {
      navigate("/");
    }
  }, [token]);
  const [modalMensagemAberto, setModalMensagemAberto] = useState(false);
  const [inputValue, setInputValue] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const [registerMessage, setRegisterMessage] = useState(null);
  const [message, setMessage] = useState(null);

  const handleInputChange = (value) => {
    setInputValue(value);
  };

  const handleButtonClick = () => {
    console.log("Valor do input:", inputValue);
  };

  const [generos, setGeneros] = useState([]);
  const { buscaGeneros } = useGeneros();
  const [generosBuscados, setGenerosBuscados] = useState([]);

  const buscaGenero = async () => {
    const response = await api.get(`/generos`);
    setGenerosBuscados(response.data.generos.data);
  };

  useEffect(() => {
    const carregarGeneros = async () => {
      const dados = await buscaGeneros();
      setGeneros(dados);
    };
    carregarGeneros();
  }, []);

  useEffect(() => {
    const carregarGeneros = async () => {
      const dados = await buscaGeneros();
      setGeneros(dados);
    };
    carregarGeneros();
  }, [message]);

  useEffect(() => {
    const carregarGeneros = async () => {
      const dados = await buscaGeneros();
      setGeneros(dados);
    };
    carregarGeneros();
  }, [registerMessage]);

  const onSubmit = async (data) => {
    try {
      const response = await api.post("/generos", data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setRegisterMessage(response.data.message);
      console.log(response);
      setMessage(response.data.message)
      setModalMensagemAberto(true);
      closeEditModal();
    } catch (error) {
      console.error(
        "Erro ao fazer login:",
        error.response?.data || error.message
      );
      setError(error.response.data.message);
    }
  };
  return (
    <>
      <HeaderPagina titulo="Gêneros de Livros" />
      <div className={styles["barra-pesquisa"]}>
        <BarraPesquisa
          placeholder="Pesquise por gênero"
          onChange={handleInputChange}
          buscaGeneros={buscaGeneros}
          setGeneros={setGeneros}
        />
      </div>
      <div className={styles["container-geral"]}>
        <div className={styles["container-exibir"]}>
          <div className={styles["titulo"]}>
            <h2>Gêneros cadastrados</h2>
          </div>
          <div className={styles["tabela"]}>
            <div className={styles.head}>
              <div className={styles.nome}>Nome</div>
              <div className={styles.opcoes}>Opções</div>
            </div>
            <div className={styles.conteudo}>
              {generos.map((genero) => (
                <div className={styles["linha"]} key={genero.id}>
                  <ListaGeneros
                    genero={genero}
                    buscaGenero={buscaGenero}
                    setMessage={setMessage}
                    buscaGeneros={buscaGeneros}
                    setGeneros={setGeneros}
                    setModalMensagemAberto={setModalMensagemAberto}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className={styles["container-cadastro"]}
        >
          <div className={styles["titulo"]}>
            <h2>Cadastrar gênero</h2>
          </div>
          <div className={styles["input"]}>
            <label htmlFor="nome">Nome:</label>
            <Input
              type="text"
              nomeCampo="nome"
              placeholder="Digite o nome do gênero"
              {...register("gen_nome", {
                required: "O nome do gênero é obrigatório",
              })}
            />
            {<p className={styles["erro"]}>{errors.gen_nome && errors.gen_nome.message}</p>}
          </div>
          <div className={styles["botao"]}>
            <Button
              type="submit"
              nomeBotao="cadastrar"
              texto="Adicionar Gênero"
              onClick={handleButtonClick}
            />
          </div>
        </form>

        <ModalMensagem
          mensagemModal={message}
          modalAberto={modalMensagemAberto}
          closeModal={() => setModalMensagemAberto(false)}
        />
      </div>
    </>
  );
};

export default Generos;
