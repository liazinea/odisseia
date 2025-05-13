import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./index.module.scss";
import { IoPencil, IoTrash } from "react-icons/io5";
import ModalEditar from "../../Modal/ModalEditar";
import Input from "../../Inputs/Input";
import { api } from "../../../config/api";
import { useAuth } from "../../../context/AuthContext";
import { useForm } from "react-hook-form";

const CelulaTabelaLivros = ({ livro, setModalMensagemAberto, }) => {
  const [livroSelecionado, setLivroSelecionado] = useState(null);
  const [modalEditarAberto, setModalEditarAberto] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [password, setPassword] = useState("");
  const [passwordMessage, setPasswordMessage] = useState(null);

  const { token } = useAuth();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const showModal = (livroRelacionado) => {
    setLivroSelecionado(livroRelacionado);
    setModalEditarAberto(true);
  };

  const closeModal = () => {
    setModalEditarAberto(false);
    setLivroSelecionado(null);
  };

  const handleDeleteClick = () => {
    setLivroSelecionado(livro);
    setIsDeleteModalOpen(true);
  };

  const openPasswordModal = () => {
    setIsDeleteModalOpen(false);
    setIsPasswordModalOpen(true);
    setPasswordMessage(null);
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
  };

  const closePasswordModal = () => {
    setIsPasswordModalOpen(false);
    setPassword("");
  };

  const handleConfirmDelete = async (data) => {
    try {
      const response = await api.get(`/check-senha?password=${data.password}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.data.status) {
        await api.delete(`/livros/${livro.id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        onDelete(livro.id);
        closePasswordModal();
        setMessage("Livro excluído com sucesso");
      setModalMensagemAberto(true);
      } else {
        setPasswordMessage("Senha incorreta");
      }
    } catch (error) {
      console.error("Erro ao validar senha:", error);
    }
  };

  const formatarData = (dataString) => {
    const data = new Date(dataString);
    const dia = data.getDate().toString().padStart(2, "0");
    const mes = data
      .toLocaleString("pt-BR", { month: "short" })
      .replace(".", "");
    const ano = data.getFullYear();
    return `${dia}/${mes}/${ano}`;
  };

  return (
    <div className={styles.principal}>
      <div className={styles.body}>
        <div className={styles.data}>{formatarData(livro.created_at)}</div>
        <div className={styles.capa}>
          <img
            src={`http://127.0.0.1:8000/storage/${livro.capa}`}
            className={styles.imagem}
            alt="Capa do Livro"
          />
        </div>
        <div
          className={styles.titulo}
          onClick={() => navigate(`/livro/${livro.id}`)}
        >
          {livro.nome}
        </div>
        <div className={styles.num}>{livro.numRegistro}</div>
        <div className={styles.opcoes}>
          <div className={styles.editar} onClick={() => showModal(livro)}>
            <IoPencil />
          </div>
          <div className={styles.excluir} onClick={handleDeleteClick}>
            <IoTrash />
          </div>
        </div>
      </div>

      {/* Modal de Edição */}
      <ModalEditar
        closeModal={closeModal}
        modalEditarAberto={modalEditarAberto}
        showModal={showModal}
        livro={livro}
      />

      {/* Modal de Confirmação de Exclusão */}
      {isDeleteModalOpen && (
        <div className={styles.modal}>
          <div className={styles.modalExcluir}>
            <h3 className={styles.titulo}>Excluir Livro</h3>
            <p className={styles.mensagem}>
              Tem certeza de que deseja excluir o livro{" "}
              <strong>{livro.nome}</strong>?
            </p>
            <div className={styles.botoes}>
              <button
                onClick={openPasswordModal}
                className={styles.deleteButton}
              >
                Excluir
              </button>
              <button
                onClick={closeDeleteModal}
                className={styles.closeButton}
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal de Confirmação de Senha */}
      {isPasswordModalOpen && (
        <div className={styles.modal}>
          <form
            onSubmit={handleSubmit(handleConfirmDelete)}
            className={styles.modalSenha}
          >
            <h3 className={styles.titulo}>Confirmar Exclusão</h3>
            <p className={styles.mensagem}>Por favor, digite sua senha:</p>
              <p className={styles.error}>{passwordMessage && (passwordMessage)}</p>
            <div>
              <label htmlFor="senha">Senha</label>
              <Input
                type="password"
                placeholder="Digite sua senha"
                value={password}
                onChange={(value) => setPassword(value)}
                {...register("password", {
                  required: "A senha é obrigatória",
                })}
              />
                <p className={styles.error}>{errors.password && (errors.password.message)}</p>
            </div>
            <div className={styles.botoes}>
              <button type="submit" className={styles.saveButton}>
                Confirmar
              </button>
              <button
                onClick={closePasswordModal}
                className={styles.closeButton}
              >
                Cancelar
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default CelulaTabelaLivros;
