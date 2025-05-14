import React, { useState } from "react";
import { useForm } from "react-hook-form";
import BotaoAdmHome from "../../Botao/BotaoAdmHome";
import styles from "./index.module.scss";
import { useNavigate } from "react-router-dom";
import SelectSimples from "../../Inputs/Select";

const SessaoAdmHome = () => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { control, handleSubmit, setValue, reset } = useForm(); // Adicionado reset
  const [formData, setFormData] = useState({ aluno: "", livro: "" });

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleInputChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
    setValue(name, value); // Atualiza o valor no react-hook-form
  };

  const onSubmit = (data) => {
    console.log("Novo Empréstimo:", data);
    // Aqui você pode adicionar a lógica para enviar os dados para a API

    // Limpa os valores do formulário
    setFormData({ aluno: "", livro: "" });
    reset(); // Reseta os valores no react-hook-form

    closeModal();
  };

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
                values={["Fabio", "Marcela", "João", "Maria"]}
                control={control} // Passa o control do useForm
                onChange={(value) => handleInputChange("aluno", value)} // Atualiza o estado e o react-hook-form
              />
            </div>
            <div>
              <label htmlFor="livro">Livro Desejado</label>
              <SelectSimples
                nomeCampo="livro"
                placeholder="Selecione um livro"
                values={["Livro A", "Livro B", "Livro C", "Livro D"]}
                control={control} // Passa o control do useForm
                onChange={(value) => handleInputChange("livro", value)} // Atualiza o estado e o react-hook-form
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