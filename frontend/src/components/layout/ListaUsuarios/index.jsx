import React, { useState } from "react";
import styles from "./index.module.scss";
import Input from "../../Inputs/Input";

const ListaUsuarios = ({ usuario }) => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [password, setPassword] = useState("");

  // Estado local para armazenar os valores editados
  const [editedData, setEditedData] = useState({
    nome: usuario.nome,
    email: usuario.email,
    dataNascimento: usuario.dataNascimento,
    rg: usuario.rg,
  });

  const handleEditClick = () => {
    setIsEditModalOpen(true);
  };

  const handleDeleteClick = () => {
    setIsDeleteModalOpen(true);
  };

  const closeEditModal = () => {
    setIsEditModalOpen(false);
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
  };

  const openPasswordModal = () => {
    setIsDeleteModalOpen(false);
    setIsPasswordModalOpen(true);
  };

  const closePasswordModal = () => {
    setIsPasswordModalOpen(false);
    setPassword("");
  };

  const handleConfirmDelete = () => {
    console.log("Senha digitada:", password);
    closePasswordModal();
  };

  // Função para capturar as alterações nos inputs
  const handleInputChange = (e) => {
    const { name, value } = e.target; // Access event target directly
    setEditedData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSaveChanges = () => {
    console.log("Dados editados:", editedData);
    closeEditModal();
  };

  return (
    <div className={styles.row}>
      <div className={styles.nome}>{usuario.usu_nome}</div>
      <div className={styles.opcoes}>
        <div className={styles.excluir} onClick={handleDeleteClick}>
          <img className={styles.icon} src="/excluir-icon.svg" alt="Excluir" />
        </div>
        <div className={styles.editar} onClick={handleEditClick}>
          <img className={styles.icon} src="/editar-icon.svg" alt="Editar" />
        </div>
      </div>
      {/* Modal de Edição */}
      {isEditModalOpen && (
        <div className={styles.modal}>
          <div className={styles.modalEdicao}>
            <h3 className={styles.titulo}>Editar usuário</h3>
            <div>
              <label htmlFor="nome">Nome</label>
              <Input
                type="text"
                name="nome"
                value={editedData.nome}
                onChange={(value) =>
                  setEditedData({ ...editedData, nome: value })
                } // Corrigido
                defaultValue={usuario.nome}
              />
            </div>
            <div>
              <label htmlFor="email">E-mail</label>
              <Input
                type="text"
                name="email"
                value={editedData.email}
                onChange={(value) =>
                  setEditedData({ ...editedData, email: value })
                } // Corrigido
                defaultValue={usuario.email}
              />
            </div>
            <div>
              <label htmlFor="dataNascimento">Data de nascimento</label>
              <Input
                type="text"
                name="dataNascimento"
                value={editedData.dataNascimento}
                onChange={(value) =>
                  setEditedData({ ...editedData, dataNascimento: value })
                } // Corrigido
                defaultValue={usuario.dataNascimento}
              />
            </div>
            <div>
              <label htmlFor="rg">RG</label>
              <Input
                type="text"
                name="rg"
                value={editedData.rg}
                onChange={(value) =>
                  setEditedData({ ...editedData, rg: value })
                } // Corrigido
                defaultValue={usuario.rg}
              />
            </div>

            <div className={styles.botoes}>
              <button onClick={handleSaveChanges} className={styles.saveButton}>
                Salvar
              </button>
              <button onClick={closeEditModal} className={styles.closeButton}>
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
      {/* Modal de Exclusão */}
      {isDeleteModalOpen && (
        <div className={styles.modal}>
          <div className={styles.modalExcluir}>
            <h3 className={styles.titulo}>Excluir Usuário</h3>
            <p className={styles.mensagem}>
              Tem certeza de que deseja excluir permanentemente o usuário
              <span className={styles.nome}> "{usuario.nome}"</span>?
            </p>

            <div className={styles.botoes}>
              <button
                onClick={() => {
                  console.log("Excluindo usuário...");
                  openPasswordModal();
                }}
                className={styles.deleteButton}
              >
                Excluir
              </button>
              <button onClick={closeDeleteModal} className={styles.closeButton}>
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
      {/* Modal de Confirmação de Senha */}
      {isPasswordModalOpen && (
        <div className={styles.modal}>
          <div className={styles.modalSenha}>
            <h3 className={styles.titulo}>Confirmar Exclusão</h3>
            <p className={styles.mensagem}>Por favor, digite sua senha:</p>
            <div>
              <label htmlFor="senha">Senha</label>
              <Input
                type="password"
                placeholder="Digite sua senha"
                value={password}
                onChange={(value) => setPassword(value)} // Certifique-se de que o evento está correto
              />
            </div>
            <div className={styles.botoes}>
              <button
                onClick={handleConfirmDelete}
                className={styles.saveButton}
              >
                Confirmar
              </button>
              <button
                onClick={closePasswordModal}
                className={styles.closeButton}
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}{" "}
    </div>
  );
};

export default ListaUsuarios;
