import React, { useState } from "react";
import BotaoAdmHome from "../../Botao/BotaoAdmHome";
import styles from "./index.module.scss";
import { useNavigate } from "react-router-dom";
import Input from "../../Inputs/Input";

const SessaoAdmHome = () => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({ aluno: "", livro: "" });

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleInputChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Novo Empréstimo:", formData);
    // Aqui você pode adicionar a lógica para enviar os dados para a API
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
          <form onSubmit={handleSubmit} className={styles.modalCadastro}>
            <h3 className={styles.titulo}>Cadastrar Novo Empréstimo</h3>
            <div>
              <label htmlFor="aluno">Nome do Aluno</label>
              <Input
                type="text"
                nomeCampo="aluno"
                placeholder="Digite o nome do aluno"
                value={formData.aluno}
                onChange={(value) => handleInputChange("aluno", value)}
                required
              />
            </div>
            <div>
              <label htmlFor="livro">Livro Desejado</label>
              <Input
                type="text"
                nomeCampo="livro"
                placeholder="Digite o nome do livro"
                value={formData.livro}
                onChange={(value) => handleInputChange("livro", value)}
                required
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