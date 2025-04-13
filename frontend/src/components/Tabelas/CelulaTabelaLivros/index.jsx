import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./index.module.scss";

const CelulaTabelaLivros = ({ livro }) => {
  const [livroSelecionado, setLivroSelecionado] = useState(null);
  const [modalEditarAberto, setModalEditarAberto] = useState(false);
  const [modalAberto, setModalAberto] = useState(false);
  
  const navigate = useNavigate();

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
          <div className={styles.editar}>
            editar
          </div>
          <div className={styles.excluir}>
            excluir
          </div>
        </div>
      </div>
    </div>
  );
};

export default CelulaTabelaLivros;
