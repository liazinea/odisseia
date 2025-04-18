import React, { useState } from "react";
import styles from "./index.module.scss";
import { MdOutlineEdit } from "react-icons/md";
import { IoMdTrash } from "react-icons/io";
import Input from "../../Inputs/Input";

const ListaGeneros = ({ genero }) => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [password, setPassword] = useState("");

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

  return (
    <div className={styles.row}>
      <div className={styles.nome}>{genero.nome}</div>
      <div className={styles.opcoes}>
        <div className={styles.excluir} onClick={handleDeleteClick}>
          <img className={styles.icon} src="/excluir-icon.svg"></img>
        </div>
        <div className={styles.editar} onClick={handleEditClick}>
          <img className={styles.icon} src="/editar-icon.svg"></img>
        </div>
      </div>

      {/* Modal de Edição */}
      {isEditModalOpen && (
        <div className={styles.modal}>
          <div className={styles.modalEdicao}>
            <h3 className={styles.titulo}>Editar Gênero</h3>
            <div>
              <label htmlFor="nomeAtual">Nome atual</label>
              <Input type="text" defaultValue={genero.gen_nome} disabled={true} />
            </div>
            <div>
              <label htmlFor="nomeNovo">Novo nome</label>
              <Input
                type="text"
                defaultValue={genero.nome}
                disabled={false}
                onChange={(value) => console.log("Novo nome:", value)}
              />
            </div>
            <div className={styles.botoes}>
              <button
                onClick={() => {
                  console.log("Salvando alterações...");
                  closeEditModal();
                }}
                className={styles.saveButton}
              >
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
            <h3 className={styles.titulo}>Excluir Gênero</h3>
            <p className={styles.mensagem}>
              Tem certeza de que deseja excluir permanentemente o gênero
              <span className={styles.nome}> "{genero.gen_nome}"</span>?
            </p>

            <div className={styles.botoes}>
              <button
                onClick={() => {
                  console.log("Excluindo gênero...");
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
                onChange={(value) => setPassword(value)}
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
      )}
    </div>
  );
};

export default ListaGeneros;
