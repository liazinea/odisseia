import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./index.module.scss";
import { IoPencil, IoTrash } from "react-icons/io5";
import ModalExcluir from "../../Modal/ModalExcluir";
import ModalEditarLivro from "../../Modal/ModalEditarLivro";
import { api } from '../../../config/api';
import { useAuth } from "../../../context/AuthContext";

const CelulaTabelaLivros = ({ livro, onDelete }) => {
  const [livroSelecionado, setLivroSelecionado] = useState(null);
  const [modalEditarAberto, setModalEditarAberto] = useState(false);
  const [modalExcluirAberto, setModalExcluirAberto] = useState(false);
  const { token } = useAuth();
  const navigate = useNavigate();

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

  const deletarLivro = async () => {
    try {
      const response = await api.delete(`/livros/${livro.id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      onDelete(livro.id);
      fechaModalExcluir();
    } catch (error) {
      console.error("Erro ao excluir o livro:", error);
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
          <div className={styles.editar} onClick={() => showModalEditar(livro)}>
            <IoPencil />
          </div>
          <div className={styles.excluir} onClick={() => abreModalExcluir(livro)}>
            <IoTrash />
          </div>
        </div>
      </div>
      <ModalExcluir
        isOpen={modalExcluirAberto}
        onClose={fechaModalExcluir}
        onConfirm={deletarLivro}
        titulo="Excluir Livro"
        mensagem={`Tem certeza de que deseja excluir o livro`}
        nome={livro.nome}
        confirmLabel="Excluir"
        cancelLabel="Cancelar"
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