import React, { useState } from "react";
import { useForm } from "react-hook-form";

import styles from "./index.module.scss";
import Input from "../../Inputs/Input";
import api from "../../../services/api";
import { useAuth } from "../../../context/AuthContext";
import { IoPencil, IoTrash, IoCheckmarkCircleSharp } from "react-icons/io5";
import ModalConfirmarSenha from "../../Modal/ModalConfirmarSenha";
import ModalExcluir from "../../Modal/ModalExcluir";
import { MdBlock } from "react-icons/md";

const ListaUsuarios = ({
  usuario,
  setMessage,
  buscaUsuarios,
  setUsuarios,
  setModalMensagemAberto,
}) => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isPunishmentModalOpen, setIsPunishmentModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isActivateModalOpen, setIsActivateModalOpen] = useState(false);
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [password, setPassword] = useState("");
  const [passwordMessage, setPasswordMessage] = useState(null);
  const { token } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [editedData, setEditedData] = useState({
    nome: usuario.usu_nome,
    email: usuario.email,
    dataNascimento: usuario.usu_dataNasc,
    rg: usuario.usu_ra,
  });

  const handleEditClick = () => {
    setEditedData({
      nome: usuario.usu_nome,
      email: usuario.email,
      dataNascimento: usuario.usu_dataNasc,
      rg: usuario.usu_ra,
    });
    setIsEditModalOpen(true);
  };

  const handleDeleteClick = () => {
    setIsDeleteModalOpen(true);
  };

  const handlePunishmentClick = () => {
    setIsPunishmentModalOpen(true);
  };

  const closeEditModal = () => {
    setIsEditModalOpen(false);
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setPasswordMessage("");
  };
  const closePunishmentModal = () => {
    setIsPunishmentModalOpen(false);
  };

  const openPasswordModal = () => {
    setIsDeleteModalOpen(false);
    setIsPasswordModalOpen(true);
    setPasswordMessage(null);
  };

  const closePasswordModal = () => {
    setIsPasswordModalOpen(false);
    setPassword("");
  };

  const openActivateModal = () => {
    setIsActivateModalOpen(true);
  };

  const closeActivateModal = () => {
    setIsActivateModalOpen(false);
  };

  const handleConfirmDelete = async (data) => {
    const response = await api.get(`/check-senha?password=${data.password}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.data.status) {
      const responseDelete = await api.patch(
        `/usuarios/${usuario.usu_id}/desativar`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setMessage("Usuário excluído com sucesso");
      setModalMensagemAberto(true);
      const dados = await buscaUsuarios();
      setUsuarios(dados);
      closePasswordModal();
    } else {
      setPasswordMessage("Senha incorreta");
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.put(
        `/usuarios/${usuario.usu_id}`,
        {
          usu_nome: editedData.nome,
          email: editedData.email,
          usu_dataNasc: editedData.dataNascimento,
          usu_ra: editedData.rg,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const dados = await buscaUsuarios();
      setUsuarios(dados);
      closeEditModal();
      setMessage("Usuário atualizado com sucesso");
      setModalMensagemAberto(true);
    } catch (error) {
      console.error(
        "Erro ao atualizar usuário:",
        error.response?.data || error.message
      );
    }
  };

  const handleActivateClick = async () => {
    try {
      await api.patch(
        `/usuarios/${usuario.usu_id}/reativar`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const dados = await buscaUsuarios();
      setUsuarios(dados);
      closeActivateModal();
      setMessage("Usuário reativado com sucesso");
      setModalMensagemAberto(true);
    } catch (error) {
      console.error(
        "Erro ao reativar usuário:",
        error.response?.data || error.message
      );
    }
  };

  return (
    <div className={styles.row}>
      <div className={styles.nome}>{usuario.usu_nome}</div>
      <div className={styles.opcoes}>
        {usuario.usu_status == "0" ? (
          <div
            className={styles.botaoAtivar}
            onClick={(e) => {
              e.stopPropagation();
              openActivateModal();
            }}
          >
            <IoCheckmarkCircleSharp />
            Ativar
          </div>
        ) : (
          <>
            <div
              className={styles.editar}
              onClick={(e) => {
                e.stopPropagation();
                handleEditClick();
              }}
            >
              <IoPencil />
            </div>
            <div
              className={styles.punir}
              onClick={(e) => {
                e.stopPropagation();
                handlePunishmentClick();
              }}
            >
              <MdBlock />
            </div>
            <div
              className={styles.excluir}
              onClick={(e) => {
                e.stopPropagation();
                handleDeleteClick();
              }}
            >
              <IoTrash />
            </div>
          </>
        )}
      </div>

      {isEditModalOpen && (
        <div className={styles.modal}>
          <form onSubmit={onSubmit} className={styles.modalEdicao}>
            <h3 className={styles.titulo}>Editar usuário</h3>
            <div>
              <label htmlFor="nome">Nome</label>
              <Input
                type="text"
                name="nome"
                value={editedData.nome}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label htmlFor="email">E-mail</label>
              <Input
                type="text"
                name="email"
                value={editedData.email}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label htmlFor="dataNascimento">Data de nascimento</label>
              <Input
                type="text"
                name="dataNascimento"
                value={editedData.dataNascimento}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label htmlFor="rg">RA</label>
              <Input
                type="text"
                name="rg"
                value={editedData.rg}
                onChange={handleInputChange}
              />
            </div>
            <div className={styles.botoes}>
              <button type="submit" className={styles.saveButton}>
                Salvar
              </button>
              <button
                onClick={closeEditModal}
                type="button"
                className={styles.closeButton}
              >
                Cancelar
              </button>
            </div>
          </form>
        </div>
      )}

      {isDeleteModalOpen && (
        <ModalExcluir
          isOpen={isDeleteModalOpen}
          onClose={closeDeleteModal}
          onConfirm={openPasswordModal}
          titulo="Excluir Usuário"
          mensagem="Tem certeza de que deseja excluir permanentemente o usuário"
          nome={usuario.usu_nome}
          confirmLabel="Excluir"
          cancelLabel="Cancelar"
        />
      )}

      {isPunishmentModalOpen && (
        <ModalExcluir
          isOpen={isPunishmentModalOpen}
          onClose={closePunishmentModal}
          onConfirm={openPasswordModal}
          titulo="Punir Usuário"
          mensagem="Tem certeza de que deseja punir o usuário"
          nome={usuario.usu_nome}
          confirmLabel="Punir"
          cancelLabel="Cancelar"
        />
      )}

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

      {isActivateModalOpen && (
        <ModalExcluir
          isOpen={isActivateModalOpen}
          onClose={closeActivateModal}
          onConfirm={handleActivateClick}
          titulo="Ativar Usuário"
          mensagem="Tem certeza de que deseja ativar o usuário"
          nome={usuario.usu_nome}
          confirmLabel="Ativar"
          cancelLabel="Cancelar"
        />
      )}
    </div>
  );
};

export default ListaUsuarios;
