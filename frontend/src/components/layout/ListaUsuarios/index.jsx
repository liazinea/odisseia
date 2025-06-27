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
import { FaC, FaCheck } from "react-icons/fa6";

const ListaUsuarios = ({
  usuario,
  setMessage,
  buscaUsuarios,
  setUsuarios,
  setModalMensagemAberto,
}) => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isPunishmentModalOpen, setIsPunishmentModalOpen] = useState(false);
  const [isUnbanModalOpen, setIsUnbanModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isActivateModalOpen, setIsActivateModalOpen] = useState(false);
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [password, setPassword] = useState("");
  const [passwordMessage, setPasswordMessage] = useState(null);
  const [loadingEdit, setLoadingEdit] = useState(false);
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
  const handleUnbanClick = () => {
    setIsUnbanModalOpen(true);
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
  const closeUnbanModal = () => {
    setIsUnbanModalOpen(false);
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

  const handleConfirmPunishment = async (data) => {
    const response = await api.get(`/check-senha?password=${data.password}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.data.status) {
      const responseBan = await api.patch(
        `/usuarios/${usuario.usu_id}/punicao`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log(response)
      setModalMensagemAberto(true);
      setMessage(responseBan.data.message);
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
    setLoadingEdit(true);
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
    console.error("Erro ao atualizar usuário:", error);

    // Tenta pegar a resposta da API
    const responseData = error.response?.data;

    if (responseData) {
      if (responseData.errors) {
        const validationMessages = Object.values(responseData.errors)
          .flat()
          .join("\n");
        setMessage(validationMessages);
      }
      else if (responseData.message) {
        setMessage(responseData.message);
      } else {
        setMessage("Erro desconhecido ao atualizar usuário.");
      }
    } else if (error.message) {
      setMessage(`Erro: ${error.message}`);
    } else {
      setMessage("Erro desconhecido ao atualizar usuário.");
    }

    setModalMensagemAberto(true);
  } finally {
    setLoadingEdit(false);
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
        ) : usuario.usu_status == "1" ? (
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
                handleUnbanClick();
              }}
            >
              <FaCheck />
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
            {/* Campos de input */}
            <div>
              <label htmlFor="nome">Nome</label>
              <Input
                type="text"
                name="nome"
                value={editedData.nome}
                onChange={handleInputChange}
                disabled={loadingEdit}
              />
            </div>
            <div>
              <label htmlFor="email">E-mail</label>
              <Input
                type="text"
                name="email"
                value={editedData.email}
                onChange={handleInputChange}
                disabled={loadingEdit}
              />
            </div>
            <div>
              <label htmlFor="dataNascimento">Data de nascimento</label>
              <Input
                type="date"
                name="dataNascimento"
                value={editedData.dataNascimento}
                onChange={handleInputChange}
                disabled={loadingEdit}
              />
            </div>
            <div>
              <label htmlFor="rg">RA</label>
              <Input
                type="text"
                name="rg"
                value={editedData.rg}
                onChange={handleInputChange}
                disabled={loadingEdit}
              />
            </div>

            {/* Indicador de loading */}
            {loadingEdit && (
              <p style={{ color: "#333", marginTop: "10px" }}>Carregando...</p>
            )}

            <div className={styles.botoes}>
              <button type="submit" className={styles.saveButton} disabled={loadingEdit}>
                Salvar
              </button>
              <button
                onClick={closeEditModal}
                type="button"
                className={styles.closeButton}
                disabled={loadingEdit}
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

      {isUnbanModalOpen && (
        <ModalExcluir
          isOpen={isUnbanModalOpen}
          onClose={closeUnbanModal}
          onConfirm={openPasswordModal}
          titulo="Tirar Punição de Usuário"
          mensagem="Tem certeza de que deseja liberar o usuário"
          nome={usuario.usu_nome}
          confirmLabel="Liberar"
          cancelLabel="Cancelar"
        />
      )}

      {isPasswordModalOpen && (
        <ModalConfirmarSenha
          isOpen={isPasswordModalOpen}
          onClose={closePasswordModal}
          onSubmit={isPunishmentModalOpen ? handleConfirmPunishment : isUnbanModalOpen ? handleConfirmPunishment : handleConfirmDelete}
          handleSubmit={handleSubmit}
          register={register}
          errors={errors}
          password={password}
          setPassword={setPassword}
          passwordMessage={passwordMessage}
          mensagem="Por favor, digite sua senha:"
          titulo={isPunishmentModalOpen ? "Confirmar Punição" : isUnbanModalOpen ? "Confirmar Liberação" : "Confirmar Exclusão"}
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
