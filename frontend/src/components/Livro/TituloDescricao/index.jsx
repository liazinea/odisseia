import styles from "./index.module.scss";
import React from 'react';

const TituloDescricao = ({ titulo, autores }) => {
  if (!Array.isArray(autores)) {
    return <p>Dados de autores não estão disponíveis ou estão em formato inválido.</p>;
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.titulo}>{titulo}</h1>
      {autores.map((autor) => (
        <p key={autor.id} className={styles.autor}>{autor.nome}</p>
      ))}
    </div>
  );
};

export default TituloDescricao;
