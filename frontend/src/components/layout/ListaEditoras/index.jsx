import React, { useState, useEffect } from "react";
import styles from "./index.module.scss";
import { IoPencil, IoTrash } from "react-icons/io5";
import Input from "../../Inputs/Input";
import { useForm } from "react-hook-form";
import api from "../../../services/api";
import { useAuth } from "../../../context/AuthContext";
import ModalConfirmarSenha from "../../Modal/ModalConfirmarSenha";
import ModalEdicao from "../../Modal/ModalEdicao";
import ModalExcluir from "../../Modal/ModalExcluir";



const ListaEditoras = ({
  editora,
  setMessage,
  buscaEditoras,
  setEditoras,
  setModalMensagemAberto,
}) => {
  const { token } = useAuth();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [password, setPassword] = useState("");
  const [passwordMessage, setPasswordMessage] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      edi_nome: "",
      password: "",
    },
  });

  const handleEditClick = () => setIsEditModalOpen(true);
  const handleDeleteClick = () => setIsDeleteModalOpen(true);
  const closeEditModal = () => setIsEditModalOpen(false);
  const closeDeleteModal = () => setIsDeleteModalOpen(false);

  const openPasswordModal = () => {
    setIsDeleteModalOpen(false);
    setIsPasswordModalOpen(true);
    setPasswordMessage(null);
  };

  // Limpa o campo de senha ao fechar o modal
  const closePasswordModal = () => {
    setIsPasswordModalOpen(false);
    setPassword("");
    reset({ password: "" });
  };

  useEffect(() => {
    const carregarEditoras = async () => {
      const dados = await buscaEditoras();
      setEditoras(dados);
    };
    carregarEditoras();
  }, [passwordMessage, isEditModalOpen]);

  const handleConfirmDelete = async (data) => {
  const response = await api.get(`/check-senha?password=${data.password}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (response.data.status) {
    await api.patch(`/editoras/${editora.id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    // Atualize a lista aqui!
    const dados = await buscaEditoras();
    setEditoras(dados);

    closePasswordModal();
    setMessage("Editora excluída com sucesso");
    setModalMensagemAberto(true);
  } else {
    setPasswordMessage("Senha incorreta");
  }
};


  const onSubmit = async (data) => {
    try {
      const response = await api.put(`/editoras/${editora.id}`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setMessage(response.data.message);
      closeEditModal();
      setModalMensagemAberto(true);
    } catch (error) {
      console.error(
        "Erro ao atualizar editora:",
        error.response?.data || error.message
      );
      // setError(error.response.data.message); // Só use se tiver setError definido
    }
  };

  return (
    <div className={styles.row}>
      <div className={styles.nome}>{editora.nome}</div>
      <div className={styles.opcoes}>
        <div className={styles.editar} onClick={handleEditClick}>
          <IoPencil />
        </div>
        <div className={styles.excluir} onClick={handleDeleteClick}>
          <IoTrash />
        </div>
      </div>

      {/* Modal de Edição */}
      {isEditModalOpen && (
      <ModalEdicao
        isOpen={isEditModalOpen}
        onClose={closeEditModal}
        onSubmit={onSubmit}
        handleSubmit={handleSubmit}
        register={register}
        errors={errors}
        titulo="Editar Editora"
        labelAtual="Nome atual"
        valorAtual={editora.nome}
        labelNovo="Novo nome"
        nomeCampoNovo="edi_nome"
        valorNovo={editora.nome}
        registerOptions={{
          required: "O novo nome da editora é obrigatório",
        }}
      />
    )}

      {/* Modal de Exclusão */}
      {isDeleteModalOpen && (
        <ModalExcluir
          isOpen={isDeleteModalOpen}
          onClose={closeDeleteModal}
          onConfirm={openPasswordModal}
          titulo="Excluir Editora"
          mensagem="Tem certeza de que deseja excluir permanentemente a editora"
          nome={editora.nome}
          confirmLabel="Excluir"
          cancelLabel="Cancelar"
        />
      )}

      {/* Modal de Confirmação de Senha */}
      {isPasswordModalOpen && (
        <ModalConfirmarSenha
          isOpen={isPasswordModalOpen}
          onClose={closePasswordModal}
          onSubmit={handleConfirmDelete}
          handleSubmit={handleSubmit}
          register={register}
          errors={errors}
          password={password}
          setPassword={setPassword}
          passwordMessage={passwordMessage}
          mensagem="Por favor, digite sua senha:"
          titulo="Confirmar Exclusão"
        />
      )}
    </div>
  );
};

export default ListaEditoras;
