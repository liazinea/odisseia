import React from "react";
import styles from "./index.module.scss";
import CapaLivro from "../../Livro/CapaLivro";
import Sinopse from "../../Livro/Sinopse";

const CardLivrosMaisAcessados = ({ livro }) => {
  return (
    <div className={styles.card}>
      <h1 className={styles.titulo}>{livro?.nome || "Título não disponível"}</h1>
      <div className={styles.paragrafo}>
        <Sinopse sinopse={livro?.sinopse} />
      </div>
      <div className={styles.imagem}>
        <CapaLivro
          imagemCapa={livro?.capa}
          classificacao={livro?.classificacaoIndicativa}
        />
      </div>
    </div>
  );
};

export default CardLivrosMaisAcessados;