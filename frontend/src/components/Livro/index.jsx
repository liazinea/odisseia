import React from "react";
import DescricaoLivro from "../../components/DescricaoLivro";
import InfoAdicionais from "../../components/InfoAdicionais";
import styles from "./index.module.scss";

const Livro = ({ livro }) => {
  return (
    <div className={styles.livro}>
      <div className={styles.descLivro}>
        <DescricaoLivro
          titulo={livro.titulo}
          subtitulo={livro.subtitulo}
          capa={livro.capa}
          classIndicativa={livro.classIndicativa}
          autor={livro.autor}
          quantidadeLivros={livro.quantidadeLivros}
          generos={livro.generos}
        />
      </div>
      <div className={styles.infoAdicional}>
        <InfoAdicionais
          paginas={livro.paginas}
          edicao={livro.edicao}
          editora={livro.editora}
          data={livro.dataPublicacao}
        />
      </div>
    </div>
  );
};

export default Livro;
