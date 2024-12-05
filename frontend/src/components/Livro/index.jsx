import React from "react";
import DescricaoLivro from "../../components/DescricaoLivro";
import InfoAdicionais from "../../components/InfoAdicionais";
import styles from "./index.module.scss";

const Livro = ({ livro }) => {
  console.log(livro)
  return (
    <div className={styles.livro}>
      <div className={styles.descLivro}>
        {<DescricaoLivro
          titulo={livro.nome}
          capa={livro.capa}
          sinopse={livro.sinopse}
          quantidadeLivros={1}
          classIndicativa={livro.classIndicativa}
          autores={livro.autores}
          generos={livro.generos}
        />}
      </div>
      <div className={styles.infoAdicional}>
        {<InfoAdicionais
          paginas={livro.qtdPaginas}
          edicao={livro.edicao}
          editora={livro.editora}
          data={livro.dataPubli}
        />}
      </div>
    </div>
  );
};

export default Livro;
