import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import BotaoAdmHome from "../../Botao/BotaoAdmHome";
import styles from "./index.module.scss";
import { useNavigate } from "react-router-dom";
import SelectSimples from "../../Inputs/Select";
import useUsuarios from "../../../hooks/useUsuarios";
import useLivros from "../../../hooks/useLivros";
import ModalEmprestimoLivro from "../../Modal/ModalEmprestimoLivro";

const SessaoAdmHome = () => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { control, handleSubmit, setValue, reset, formState: { errors } } = useForm();
  const [alunos, setAlunos] = useState([]);
  const [livros, setLivros] = useState([]);
  const { buscaUsuarios } = useUsuarios();
  const { buscaLivros } = useLivros();

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleInputChange = (name, value) => {
    setValue(name, value);
  };

  const onSubmit = (data) => {
    console.log("Novo Empréstimo:", data);
    reset();
    closeModal();
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const alunosData = await buscaUsuarios();
        const livrosData = await buscaLivros();
        setAlunos(
          alunosData
        );
        setLivros(
         livrosData
        );
      } catch (error) {
        console.error("Erro ao buscar dados:", error);
        setAlunos([]);
        setLivros([]);
      }
    };

    fetchData();
  }, []);

  return (
    <div className={styles.container}>
      <BotaoAdmHome
        type="button"
        nomeBotao="realizar-emprestimo"
        icon="/plus-icon.svg"
        texto="Realizar empréstimo"
        onClick={openModal}
      />
      <BotaoAdmHome 
        type="button" 
        nomeBotao="consultar-emprestimos" 
        icon="/registros-icon.svg" 
        texto="Consultar empréstimos" />
      <BotaoAdmHome
        type="button"
        nomeBotao="livros"
        icon="/livro-icon.svg"
        texto="Livros"
        onClick={() => navigate("/opcoes-livro")}
      />
      <BotaoAdmHome
        type="button"
        nomeBotao="usuarios"
        icon="/users-icon.svg"
        texto="Usuários"
        onClick={() => navigate("/usuarios")}
      />
      <BotaoAdmHome 
        type="button" 
        nomeBotao="autores" 
        icon="/autores-icon.svg" 
        texto="Autores"
        onClick={() => navigate("/autores")}

      />
      <BotaoAdmHome
        type="button"
        nomeBotao="generos"
        icon="/generos-icon.svg"
        texto="Gêneros"
        onClick={() => navigate("/generos")}
      />
      <BotaoAdmHome 
        type="button" 
        nomeBotao="editoras" 
        icon="/editoras-icon.svg" 
        texto="editoras" 
      />
      <ModalEmprestimoLivro
        isOpen={isModalOpen}
        onClose={closeModal}
        onSubmit={onSubmit}
        handleSubmit={handleSubmit}
        control={control}
        errors={errors}
        alunos={alunos}
        livros={livros}
        handleInputChange={handleInputChange}
      />
    </div>
  );
};

export default SessaoAdmHome;
