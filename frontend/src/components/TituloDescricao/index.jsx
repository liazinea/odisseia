import styles from "./index.module.scss";
import React from 'react'

const TituloDescricao = ({titulo, subtitulo, autor}) => {
  return (
    <div className={styles.container}>
      <h1 className={styles.titulo}>{titulo}</h1>
      <p className={styles.subtitulo}>{subtitulo}</p>
      <p className={styles.autor}>{autor}</p>
    </div>
  )
}

export default TituloDescricao
