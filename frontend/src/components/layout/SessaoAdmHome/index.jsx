import React, { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import BotaoAdmHome from "../../Botao/BotaoAdmHome";
import styles from "./index.module.scss";
import { useNavigate } from "react-router-dom";
import SelectSimples from "../../Inputs/Select";
import useUsuarios from "../../../hooks/useUsuarios";
import useLivros from "../../../hooks/useLivros";

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
    setValue(name, value); // Atualiza o valor no react-hook-form
  };

  const onSubmit = (data) => {
    console.log("Novo Empréstimo:", data);
    // Falta a lógica para enviar os dados do novo empréstimo para o backend

    reset(); // Reseta os valores no react-hook-form
    closeModal();
  };

  // Busca os alunos e livros ao carregar o componente
  useEffect(() => {
    const fetchData = async () => {
      try {
        const alunosData = await buscaUsuarios();
        const livrosData = await buscaLivros();

        // Verifica se os dados retornados são válidos antes de mapeá-los
        setAlunos(
          Array.isArray(alunosData) && alunosData.length > 0
            ? alunosData.map((aluno) => aluno.usu_nome || "Nome não disponível")
            : []
        );
        setLivros(
          Array.isArray(livrosData) && livrosData.length > 0
            ? livrosData.map((livro) => livro.nome || "Título não disponível")
            : []
        );
      } catch (error) {
        console.error("Erro ao buscar dados:", error);
        setAlunos([]); // Garante que o estado seja um array vazio em caso de erro
        setLivros([]);
      }
    };

    fetchData();
  }, [buscaUsuarios, buscaLivros]);

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
        texto="Consultar empréstimos"
      />
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

      {/* Modal para cadastrar novo empréstimo */}
      {isModalOpen && (
        <div className={styles.modal}>
          <form onSubmit={handleSubmit(onSubmit)} className={styles.modalCadastro}>
            <h3 className={styles.titulo}>Cadastrar Novo Empréstimo</h3>
            <div>
              <label htmlFor="aluno">Nome do Aluno</label>
              <SelectSimples
                nomeCampo="aluno"
                placeholder="Selecione um aluno"
                values={alunos} 
                control={control}
                rules={{ required: "Selecione um aluno" }}
                error={errors.aluno} 
                onChange={(value) => handleInputChange("aluno", value)}
              />
            </div>
            <div>
              <label htmlFor="livro">Livro Desejado</label>
              <SelectSimples
                nomeCampo="livro"
                placeholder="Selecione um livro"
                values={livros} 
                control={control}
                rules={{ required: "Selecione um livro" }} 
                error={errors.livro} 
                onChange={(value) => handleInputChange("livro", value)}
              />
            </div>
            <div className={styles.botoes}>
              <button type="submit" className={styles.saveButton}>
                Cadastrar
              </button>
              <button type="button" onClick={closeModal} className={styles.closeButton}>
                Cancelar
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default SessaoAdmHome;