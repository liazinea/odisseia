import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./index.module.scss";
import { IoPencil, IoTrash, IoTrashOutline } from "react-icons/io5";
import ModalExcluir from "../../Modal/ModalExcluir";
import ModalEditar from "../../Modal/ModalEditar";
import { api } from '../../../config/api';
import { useAuth } from "../../../context/AuthContext";

const CelulaTabelaLivros = ({ livro, onDelete  }) => {
  const [livroSelecionado, setLivroSelecionado] = useState(null);
  const [modalEditarAberto, setModalEditarAberto] = useState(false);
  const [modalAberto, setModalAberto] = useState(false);
  const {token} = useAuth()
  
  const navigate = useNavigate();


  const abreModal = (livroRelacionado) => {
    setLivroSelecionado(livroRelacionado);
    setModalAberto(true);
  };

  const showModal = (livroRelacionado) => {
    setLivroSelecionado(livroRelacionado);
    setModalEditarAberto(true);
  };

  const fechaModal = () => {
    setModalAberto(false);
    setLivroSelecionado(null);
  };

  const closeModal = () => {
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
      console.log("Livro excluído com sucesso:", response.data);
      onDelete(livro.id);
      fechaModal();
      buscaLivro(); // Atualiza a lista após exclusão
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
          <div className={styles.editar} onClick={() => showModal(livro)}>
            <IoPencil/>
          </div>
          <div className={styles.excluir} onClick={() => abreModal(livro)}>
            <IoTrash/>
          </div>
        </div>
      </div>
      <ModalExcluir textoModal={`Tem certeza de que deseja excluir o livro ${livro.nome}`} onClick={deletarLivro} modalAberto={modalAberto} fechaModal={fechaModal} itemSelecionado={livroSelecionado}/>
      <ModalEditar closeModal={closeModal} modalEditarAberto={modalEditarAberto} showModal={showModal} livro={livro}/>
    </div>
  );
};

export default CelulaTabelaLivros;
