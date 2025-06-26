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
import ModalInfoDetalhada from "../../Modal/ModalInfoDetalhada";

const ListaEmprestimos = ({
  emprestimo,
  setMessage,

  setEmprestimos,
  setModalMensagemAberto,
}) => {
  const [modalSenhaAberto, setModalSenhaAberto] = useState(false);
  const [passwordMessage, setPasswordMessage] = useState(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  // Função para abrir o modal de senha
  const abrirModalSenha = () => {
    setPasswordMessage(null);
    setModalSenhaAberto(true);
    reset();
  };

  // Função para fechar o modal de senha
  const fecharModalSenha = () => {
    setModalSenhaAberto(false);
    setPasswordMessage(null);
    reset();
  };
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
        <div className={styles.visualizar} onClick={abrirModalSenha}>
          <IoPencil />
        </div>
      </div>
      <ModalInfoDetalhada
        isOpen={modalSenhaAberto}
        onClose={fecharModalSenha}
        handleSubmit={handleSubmit}
        register={register}
        errors={errors}
        passwordMessage={passwordMessage}
        emprestimo={emprestimo}
        setEmprestimos={setEmprestimos}
        usuarioId={emprestimo.aluno.usu_id}
      />
    </div>
  );
};

export default ListaEmprestimos;
