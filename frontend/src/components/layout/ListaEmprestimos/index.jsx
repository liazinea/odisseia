import React, { useState, useEffect } from "react";
import styles from "./index.module.scss";
import { IoPencil, IoTrash } from "react-icons/io5";
import Input from "../../Inputs/Input";
import { useForm } from "react-hook-form";
import api from "../../../services/api";
import { useAuth } from "../../../context/AuthContext";
import ModalConfirmarSenha from "../../Modal/ModalConfirmarSenha";
import ModalEdicao from "../../Modal/ModalEdicao";
import ModalExcluir from "../../Modal/ModalExcluir";



const ListaEmprestimos = ({
  emprestimo,
  setMessage,
  buscaEmprestimos,
  setEmprestimos,
  setModalMensagemAberto,
}) => {
  const { token } = useAuth();
  const statusMap = {
    0: "CANCELADO",
    1: "RESERVADO",
    2: "EMPRESTADO",
    3: "DEVOLVIDO",
  };
  return (
    <div className={styles.row}>
      <div className={styles.nome}>{emprestimo.livro.liv_nome}</div>
      <div className={styles.status}>{statusMap[emprestimo.emp_status]}</div>
      <div className={styles.opcoes}>
        <div className={styles.visualizar} onClick={()=>console.log(emprestimo)}>
          <IoPencil />
        </div>
      </div>
    </div>
  );
};

export default ListaEmprestimos;
