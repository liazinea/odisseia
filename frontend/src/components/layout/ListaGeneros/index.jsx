import React, { useState, useEffect } from "react";
import styles from "./index.module.scss";
import { IoPencil, IoTrash } from "react-icons/io5";
import Input from "../../Inputs/Input";
import { useForm } from "react-hook-form";
import api from "../../../services/api";
import { useAuth } from "../../../context/AuthContext";
import ModalConfirmarSenha from "../../Modal/ModalConfirmarSenha";

const ListaGeneros = ({
  genero,
  setMessage,
  buscaGeneros,
  setGeneros,
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
      gen_nome: "",
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

  // Atualiza a lista de gêneros quando a senha é validada ou edição é feita
  useEffect(() => {
    const carregarGeneros = async () => {
      const dados = await buscaGeneros();
      setGeneros(dados);
    };
    carregarGeneros();
  }, [passwordMessage, isEditModalOpen]);

  // Confirma exclusão do gênero
  const handleConfirmDelete = async (data) => {
    const response = await api.get(`/check-senha?password=${data.password}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.data.status) {
      const responseDelete = await api.patch(`/generos/${genero.id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      closePasswordModal();
      setMessage("Gênero excluído com sucesso");
      setModalMensagemAberto(true);
    } else {
      setPasswordMessage("Senha incorreta");
    }
  };

  // Atualiza o gênero
  const onSubmit = async (data) => {
    try {
      const response = await api.put(`/generos/${genero.id}`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setMessage(response.data.message);
      closeEditModal();
      setModalMensagemAberto(true);
    } catch (error) {
      console.error(
        "Erro ao atualizar gênero:",
        error.response?.data || error.message
      );
      // setError(error.response.data.message); // Só use se tiver setError definido
    }
  };

  return (
    <div className={styles.row}>
      <div className={styles.nome}>{genero.nome}</div>
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
        <div className={styles.modal}>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className={styles.modalEdicao}
          >
            <h3 className={styles.titulo}>Editar Gênero</h3>
            <div>
              <label htmlFor="nomeAtual">Nome atual</label>
              <Input type="text" defaultValue={genero.nome} disabled={true} />
            </div>
            <div>
              <label htmlFor="nomeNovo">Novo nome</label>
              <Input
                type="text"
                defaultValue={genero.nome}
                disabled={false}
                {...register("gen_nome", {
                  required: "O novo nome do gênero é obrigatório",
                })}
              />
              {errors.gen_nome && (
                <p style={{ color: "red" }}>{errors.gen_nome.message}</p>
              )}
            </div>
            <div className={styles.botoes}>
              <button type="submit" className={styles.saveButton}>
                Salvar
              </button>
              <button onClick={closeEditModal} className={styles.closeButton}>
                Cancelar
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Modal de Exclusão */}
      {isDeleteModalOpen && (
        <div className={styles.modal}>
          <div className={styles.modalExcluir}>
            <h3 className={styles.titulo}>Excluir Gênero</h3>
            <p className={styles.mensagem}>
              Tem certeza de que deseja excluir permanentemente o gênero
              <span className={styles.nome}> "{genero.nome}"</span>?
            </p>
            <div className={styles.botoes}>
              <button
                onClick={openPasswordModal}
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

export default ListaGeneros;