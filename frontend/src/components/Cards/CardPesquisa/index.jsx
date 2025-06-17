import React from "react";
import styles from "./index.module.scss";
import CapaLivro from "../../Livro/CapaLivro";

const CardPesquisa = ({ livro }) => {
  const autores = livro?.autores?.map((autor) => autor.nome).join(", ");
  const anoPublicacao = livro?.dataPubli
    ? new Date(livro.dataPubli).getFullYear()
    : "Ano desconhecido";

  return (
    <div className={styles.card}>
      <div className={styles.imagem}>
        <CapaLivro
          imagemCapa={livro?.capa}
          classificacao={livro?.classificacaoIndicativa}
        />
      </div>
      <div className={styles.conteudo}>
        <div className={styles.header}>
          <h2 className={styles.titulo}>
            {livro?.nome || "Título não disponível"}
          </h2>
          {autores && <p className={styles.autores}>Por: {autores}</p>}
        </div>

        <div className={styles.infoExtra}>
          {livro?.editora?.nome && <span>Editora: {livro.editora.nome}</span>}
          <span>Ano: {anoPublicacao}</span>
          {livro?.qtdPaginas && <span>{livro.qtdPaginas} páginas</span>}
        </div>

        <p className={styles.sinopse}>
          <p className={styles.sinopse}>
            {livro?.sinopse ? livro.sinopse : "Sinopse não disponível."}
          </p>
        </p>

        {livro?.generos && livro.generos.length > 0 && (
          <div className={styles.generos}>
            {livro.generos.map((genero) => (
              <span key={genero.id} className={styles.genero}>
                {genero.nome}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CardPesquisa;
