import styles from "./index.module.scss";
import React from 'react';


const TextoIcon = ({nome, icon, descricao}) => {
  return (
    <div className={styles.geral}>
      <p className= {styles.titulo}>{nome}</p>
      <div className={styles.icon}>{icon}</div>
      <p className= {styles.info}>{descricao}</p>
    </div>
  )
}

export default TextoIcon
