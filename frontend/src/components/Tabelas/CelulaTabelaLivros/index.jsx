import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./index.module.scss";
import { IoPencil, IoTrash, IoTrashOutline } from "react-icons/io5";
import ModalExcluir from "../../Modal/ModalExcluir";
import ModalEditar from "../../Modal/ModalEditar";
// import { api } from '../../../config/api';

const CelulaTabelaLivros = ({ livro }) => {
  const [livroSelecionado, setLivroSelecionado] = useState(null);
  const [modalEditarAberto, setModalEditarAberto] = useState(false);
  const [modalAberto, setModalAberto] = useState(false);
  
  const navigate = useNavigate();
  const buscaLivro = async () =>{
    const response = await api.get(`/livros`)
    setLivrosBuscados(response.data.livros.data)
  }

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

  const deletarLivro = async (livroDeletado) => {
    try {
      const response = await api.delete(`/livros/${livroDeletado.id}`);
      console.log("Livro excluído com sucesso:", response.data);
      fechaModal();
      buscaLivro(); // Atualiza a lista após exclusão
    } catch (error) {
      console.error("Erro ao excluir o livro:", error);
    }
  };

  useEffect(() => {
    buscaLivro();
  }, [modalAberto]);

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
            src={livro.liv_capa}
            className={styles.imagem}
            alt="Capa do Livro"
          />
        </div>
        <div
          className={styles.titulo}
          onClick={() => navigate(`/livros/${livro.id}`)}
        >
          {livro.liv_nome}
        </div>
        <div className={styles.num}>{livro.liv_numRegistro}</div>
        <div className={styles.opcoes}>
          <div className={styles.editar} onClick={() => showModal(livro)}>
            <IoPencil/>
          </div>
          <div className={styles.excluir} onClick={() => abreModal(livro)}>
            <IoTrash/>
          </div>
        </div>
      </div>
      <ModalExcluir textoModal={`Tem certeza de que deseja excluir o livro "<b>{livroSelecionado.nome}</b>"?`} onClick={deletarLivro} modalAberto={modalAberto} fechaModal={fechaModal} itemSelecionado={livroSelecionado}/>
      <ModalEditar closeModal={closeModal} modalEditarAberto={modalEditarAberto} showModal={showModal}/>
    </div>
  );
};

export default CelulaTabelaLivros;
