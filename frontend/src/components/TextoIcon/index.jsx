import styles from "./index.module.scss";
import React from 'react';
import { IoBookOutline } from "react-icons/io5";


const TextoIcon = ({nome, icon, descricao}) => {
  return (
    <div className={styles.geral}>
      <p className= {styles.titulo}>{nome}</p>
      <IoBookOutline className={styles.icon}/>
      <p className= {styles.info}>{descricao}</p>
    </div>
  )
}

export default TextoIcon
