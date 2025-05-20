import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./index.module.scss";
import { IoPencil, IoTrash } from "react-icons/io5";
import ModalExcluir from "../../Modal/ModalExcluir";
import ModalEditarLivro from "../../Modal/ModalEditarLivro";
import ModalConfirmarSenha from "../../Modal/ModalConfirmarSenha";
import { api } from '../../../config/api';
import { useAuth } from "../../../context/AuthContext";
import { useForm } from "react-hook-form";

const CelulaTabelaLivros = ({ livro, onDelete }) => {
  const [livroSelecionado, setLivroSelecionado] = useState(null);
  const [modalEditarAberto, setModalEditarAberto] = useState(false);
  const [modalExcluirAberto, setModalExcluirAberto] = useState(false);
  const [modalSenhaAberto, setModalSenhaAberto] = useState(false);
  const [password, setPassword] = useState("");
  const [passwordMessage, setPasswordMessage] = useState(null);
  const { token } = useAuth();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      password: "",
    },
  });

  const abreModalExcluir = (livroRelacionado) => {
    setLivroSelecionado(livroRelacionado);
    setModalExcluirAberto(true);
  };

  const showModalEditar = (livroRelacionado) => {
    setLivroSelecionado(livroRelacionado);
    setModalEditarAberto(true);
  };

  const fechaModalExcluir = () => {
    setModalExcluirAberto(false);
    setLivroSelecionado(null);
  };

  const closeModalEditar = () => {
    setModalEditarAberto(false);
    setLivroSelecionado(null);
  };

  // Abre modal de senha e fecha o de confirmação
  const openModalSenha = () => {
    setModalExcluirAberto(false);
    setModalSenhaAberto(true);
    setPasswordMessage(null);
  };

  // Fecha modal de senha e limpa campo
  const closeModalSenha = () => {
    setModalSenhaAberto(false);
    setPassword("");
    reset({ password: "" });
  };

  // Confirma senha e exclui livro
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
        closeModalSenha();
      } else {
        setPasswordMessage("Senha incorreta");
      }
    } catch (error) {
      setPasswordMessage("Erro ao validar senha");
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
        <div className={styles.capa} onClick={() => navigate(`/livro/${livro.id}`)}>
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
          <div className={styles.editar} onClick={() => showModalEditar(livro)}>
            <IoPencil />
          </div>
          <div className={styles.excluir} onClick={() => abreModalExcluir(livro)}>
            <IoTrash />
          </div>
        </div>
      </div>
      {/* Modal de confirmação de exclusão */}
      <ModalExcluir
        isOpen={modalExcluirAberto}
        onClose={fechaModalExcluir}
        onConfirm={openModalSenha}
        titulo="Excluir Livro"
        mensagem={`Tem certeza de que deseja excluir o livro`}
        nome={livro.nome}
        confirmLabel="Excluir"
        cancelLabel="Cancelar"
      />
      {/* Modal de confirmação de senha */}
      <ModalConfirmarSenha
        isOpen={modalSenhaAberto}
        onClose={closeModalSenha}
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
      <ModalEditarLivro
        closeModal={closeModalEditar}
        modalEditarAberto={modalEditarAberto}
        showModal={showModalEditar}
        livro={livro}
      />
    </div>
  );
};

export default CelulaTabelaLivros;