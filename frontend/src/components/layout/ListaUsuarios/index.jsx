import React, { useState, useEffect, use } from "react";
import styles from "./index.module.scss";
import Input from "../../Inputs/Input";
import api from "../../../services/api";
import { useAuth } from "../../../context/AuthContext";
import { useForm } from "react-hook-form";
import { IoPencil, IoTrash } from "react-icons/io5";

const ListaUsuarios = ({ usuario, setMessage, buscaUsuarios, setUsuarios, setModalMensagemAberto }) => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [password, setPassword] = useState("");
  const [passwordMessage, setPasswordMessage] = useState(null)
  const { token } = useAuth()

  // Estado local para armazenar os valores editados
  const [editedData, setEditedData] = useState({
    nome: usuario.nome,
    email: usuario.email,
    dataNascimento: usuario.dataNascimento,
    rg: usuario.rg,
  });

  const { register, handleSubmit, formState: { errors } } = useForm();

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
    setPasswordMessage('')
  };

  const openPasswordModal = () => {
    setIsDeleteModalOpen(false);
    setIsPasswordModalOpen(true);
    setPasswordMessage(null)
  };

  const closePasswordModal = () => {
    setIsPasswordModalOpen(false);
    setPassword("");
  };

  const handleConfirmDelete = async (data) => {
    const response = await api.get(`/check-senha?password=${data.password}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    console.log(password)
    if (response.data.status) {
      console.log('olaa')
      const responseDelete = await api.patch(`/usuarios/${usuario.usu_id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })

      setMessage(responseDelete.data.message)
      setMessage("Usuário excluído com sucesso");
      setModalMensagemAberto(true);
      closePasswordModal();
      closePasswordModal();
    } else {
      setPasswordMessage('Senha incorreta')
    }
  }
  useEffect(() => {
    const carregarUsuarios = async () => {
      const dados = await buscaUsuarios();
      setUsuarios(dados);
    };
    carregarUsuarios();
  }, [passwordMessage]);

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

  const onSubmit = async (data) => {
    try {
      const response = await api.put(`/usuarios/${usuario.usu_id}`, data, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      setMessage(response.data.message)
      closeEditModal()
      setMessage("Usuário atualizado com sucesso");
      setModalMensagemAberto(true);
      console.log(response);
    } catch (error) {
      console.error('Erro ao fazer login:', error.response?.data || error.message);
      setError(error.response.data.message)
    }
  };

  console.log(usuario.email)
  return (
    <div className={styles.row}>
      <div className={styles.nome}>{usuario.usu_nome}</div>
      <div className={styles.opcoes}>
        <div className={styles.editar} onClick={handleEditClick}>
          <IoPencil/>
        </div>
        <div className={styles.excluir} onClick={handleDeleteClick}>
          <IoTrash/>
        </div>
      </div>
      {/* Modal de Edição */}
      {isEditModalOpen && (
        <div className={styles.modal}>
          <form onSubmit={handleSubmit(onSubmit)} className={styles.modalEdicao}>
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
                defaultValue={usuario.usu_nome}
                {...register('usu_nome', {
                  required: 'O novo nome do usuário é obrigatório'
                })}
              />
              {errors.usu_nome && (
                <p style={{ color: 'red' }}>{errors.usu_nome.message}</p>
              )}
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
                {...register('email', {
                  required: 'O email usuário é obrigatório'
                })}
              />
              {errors.email && (
                <p style={{ color: 'red' }}>{errors.email.message}</p>
              )}
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
                defaultValue={usuario.usu_dataNasc}
                {...register('usu_dataNasc', {
                  required: 'A data de nasimento é obrigatória'
                })}
              />
              {errors.usu_dataNasc && (
                <p style={{ color: 'red' }}>{errors.usu_dataNasc.message}</p>
              )}
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
                defaultValue={usuario.usu_ra}
                {...register('usu_ra', {
                  required: ' O RA do usuário é obrigatório'
                })}
              />
              {errors.usu_ra && (
                <p style={{ color: 'red' }}>{errors.usu_ra.message}</p>
              )}
            </div>


            <div className={styles.botoes}>
              <button type='submit 'className={styles.saveButton}>
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
            <h3 className={styles.titulo}>Excluir Usuário</h3>
            <p className={styles.mensagem}>
              Tem certeza de que deseja excluir permanentemente o usuário
              <span className={styles.nome}> "{usuario.usu_nome}"</span>?
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
          <form onSubmit={handleSubmit(handleConfirmDelete)} className={styles.modalSenha}>
            <h3 className={styles.titulo}>Confirmar Exclusão</h3>
            <p className={styles.mensagem}>Por favor, digite sua senha:</p>
            <div>
              <label htmlFor="senha">Senha</label>
              <Input
                type="password"
                placeholder="Digite sua senha"
                value={password}
                onChange={(e) => setPassword(e.target.value)} 
                {...register('password', {
                  required: 'A senha é obrigatória'
                })}
              
              />
                {errors.password && (
                  <p style={{ color: 'red' }}>{errors.password.message}</p>
                )}
            </div>
            <div className={styles.botoes}>
              <button
              type="submit"
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
          </form>
        </div>
      )}{" "}
    </div>
  );
};

export default ListaUsuarios;
