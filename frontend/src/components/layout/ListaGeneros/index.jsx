import React from "react";
import styles from "./index.module.scss";
import { MdOutlineEdit } from "react-icons/md";
import { IoMdTrash } from "react-icons/io";

const ListaGeneros = ({ genero }) => {
  return (
    <div className={styles.row}>
      <div className={styles.nome}>{genero.nome}</div>
      <div className={styles.opcoes}>
        <div className={styles.editar}>
          <MdOutlineEdit size={30} />
        </div>
        <div className={styles.excluir}>
          <IoMdTrash size={30} color="#C00F0C" />
        </div>
      </div>
    </div>
  );
};

export default ListaGeneros;
