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



const ListaAutores = ({
  autor,
  setMessage,
  buscaAutores,
  setAutores,
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
      aut_nome: "",
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

  // Atualiza a lista de autores quando a senha é validada ou edição é feita
  useEffect(() => {
    const carregarAutores = async () => {
      const dados = await buscaAutores();
      setAutores(dados);
    };
    carregarAutores();
  }, [passwordMessage, isEditModalOpen]);

  // Confirma exclusão do autor
const handleConfirmDelete = async (data) => {
  const response = await api.get(`/check-senha?password=${data.password}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (response.data.status) {
    await api.patch(`/autores/${autor.id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    // Atualize a lista aqui!
    const dados = await buscaAutores();
    setAutores(dados);

    closePasswordModal();
    setMessage("Autor excluído com sucesso");
    setModalMensagemAberto(true);
  } else {
    setPasswordMessage("Senha incorreta");
  }
};

  // Atualiza o autor
  const onSubmit = async (data) => {
    try {
      const response = await api.put(`/autores/${autor.id}`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setMessage(response.data.message);
      closeEditModal();
      setModalMensagemAberto(true);
    } catch (error) {
      console.error(
        "Erro ao atualizar autor:",
        error.response?.data || error.message
      );
      // setError(error.response.data.message); // Só use se tiver setError definido
    }
  };

  return (
    <div className={styles.row}>
      <div className={styles.nome}>{autor.nome}</div>
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
        titulo="Editar Autor"
        labelAtual="Nome atual"
        valorAtual={autor.nome}
        labelNovo="Novo nome"
        nomeCampoNovo="aut_nome"
        valorNovo={autor.nome}
        registerOptions={{
          required: "O novo nome do autor é obrigatório",
        }}
      />
    )}

      {/* Modal de Exclusão */}
      {isDeleteModalOpen && (
        <ModalExcluir
          isOpen={isDeleteModalOpen}
          onClose={closeDeleteModal}
          onConfirm={openPasswordModal}
          titulo="Excluir Autor"
          mensagem="Tem certeza de que deseja excluir permanentemente o autor"
          nome={autor.nome}
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

export default ListaAutores;