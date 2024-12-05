import React, { useEffect, useState } from "react";
import styles from "./index.module.scss"; // Estilos do modal
import InputNumero from "../FormCadastro/InputNumero"; // Corrigido o caminho
import InputTexto from "../FormCadastro/InputTexto"; // Corrigido o caminho
import InputDate from "../FormCadastro/InputDate"; // Corrigido o caminho
import SelectEstante from "../FormCadastro/SelectEstante"; // Corrigido o caminho
import SelectGenero from "../FormCadastro/SelectGenero"; // Corrigido o caminho
import Classificacao from "../FormCadastro/SelectClassificacao"; // Corrigido o caminho
import InputCapa from "../FormCadastro/InputCapa"; // Corrigido o caminho
import InputSinopse from "../FormCadastro/InputSinopse"; // Corrigido o caminho
import SelectAutores from "../FormCadastro/SelectAutores"; // Corrigido o caminho
import { useForm } from "react-hook-form";
import useAutores from "../../hooks/useAutores";
import useGeneros from "../../hooks/useGeneros";
import BotaoCadastrar from "../FormCadastro/BotaoCadastrar";
import { api } from "../../config/api";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Modal from 'react-modal';

const ModalEditar = ({ showModal, closeModal, livro, modalAberto }) => {
  const [modalEstado, setModalEstado] = useState(modalAberto)
  

  return (
    <>
      </>
  );
};

export default ModalEditar;
