import { useState, useEffect } from "react";
import HeaderPagina from "../../components/layout/HeaderPagina";
import styles from "./index.module.scss";
import Button from "../../components/Botao/Botao";
import Input from "../../components/Inputs/Input";
import useAutores from "../../hooks/useAutores";
import BarraPesquisa from "../../components/layout/HeaderHome/BarraPesquisa";
import ListaAutores from "../../components/layout/ListaAutores";
import { useForm } from "react-hook-form";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { api } from "../../config/api";
import ModalMensagem from "../../components/Modal/ModalMensagem";

const Autores = () => {
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

  const [autores, setAutores] = useState([]);
  const { buscaAutores } = useAutores();
  const [autoresBuscados, setAutoresBuscados] = useState([]);

  const buscaAutor = async () => {
    const response = await api.get(`/autores`);
    setAutoresBuscados(response.data.autores.data);
  };

  useEffect(() => {
    const carregarAutores = async () => {
      const dados = await buscaAutores();
      setAutores(dados);
    };
    carregarAutores();
  }, []);

  useEffect(() => {
    const carregarAutores = async () => {
      const dados = await buscaAutores();
      setAutores(dados);
    };
    carregarAutores();
  }, [message]);

  useEffect(() => {
    const carregarAutores = async () => {
      const dados = await buscaAutores();
      setAutores(dados);
    };
    carregarAutores();
  }, [registerMessage]);

  const onSubmit = async (data) => {
    try {
      const response = await api.post("/autores", data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setRegisterMessage(response.data.message);
      setMessage(response.data.message)
      setModalMensagemAberto(true);
    } catch (error) {
      console.error(
        "Erro:",
        error.response?.data || error.message
      );
      setRegisterMessage(error.response?.data?.message || "Erro ao cadastrar autor.");
    }
  };
  return (
    <>
      <HeaderPagina titulo="Autores" />
      <div className={styles["barra-pesquisa"]}>
        <BarraPesquisa
          placeholder="Pesquise por autor"
          onChange={handleInputChange}
          buscaAutores={buscaAutores}
          setAutores={setAutores}
        />
      </div>
      <div className={styles["container-geral"]}>
        <div className={styles["container-exibir"]}>
          <div className={styles["titulo"]}>
            <h2>Autores cadastrados</h2>
          </div>
          <div className={styles["tabela"]}>
            <div className={styles.head}>
              <div className={styles.nome}>Nome</div>
              <div className={styles.opcoes}>Opções</div>
            </div>
            <div className={styles.conteudo}>
              {autores.map((autores) => (
                <div className={styles["linha"]} key={autores.id}>
                  <ListaAutores
                    autor={autores}
                    buscaAutor={buscaAutor}
                    setMessage={setMessage}
                    buscaAutores={buscaAutores}
                    setAutores={setAutores}
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
            <h2>Cadastrar autor</h2>
          </div>
          <div className={styles["input"]}>
            <label htmlFor="nome">Nome:</label>
            <Input
              type="text"
              nomeCampo="nome"
              placeholder="Digite o nome do autor"
              {...register("aut_nome", {
                required: "O nome do autor é obrigatório",
              })}
            />
            {<p className={styles["erro"]}>{errors.aut_nome && errors.aut_nome.message}</p>}
          </div>
          <div className={styles["botao"]}>
            <Button
              type="submit"
              nomeBotao="cadastrar"
              texto="Adicionar Autor"
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

export default Autores;
