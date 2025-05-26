import React from "react";
import CelulaTabelaRegistros from "../../components/Tabelas/CelulaTabelaRegistros";
import Footer from "../../components/layout/Footer";
import SelectLivro from "../../components/Inputs/SelectLivro";
import ModalInfoDetalhada from "../../components/Modal/ModalInfoDetalhada";
import { useState } from "react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import Button from "../../components/Botao/Botao";
const Teste = () =>{

    const [modalSenhaAberto, setModalSenhaAberto] = useState(false);
    const [passwordMessage, setPasswordMessage] = useState(null);
  
   
    // react-hook-form para o modal
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
  

  
    // Função para submit do modal de senha

  return (
    <div>
      <Button nomeBotao="info" texto="teste" onClick={abrirModalSenha} />
    <ModalInfoDetalhada  isOpen={modalSenhaAberto}
        onClose={fecharModalSenha}
        handleSubmit={handleSubmit}
        register={register}
        errors={errors}
        passwordMessage={passwordMessage}
        nomeLivro={"Teste"}
        nomeAutor={"Ana Castela"}
        genero={"Romance"}
        editora={"Editora Intrinseca"}
        prazoRetirada={"10/10/2023"}
        dataReserva={"10/10/2023"}
        statusReserva="emprestado"/>
        
        
    </div>
  );
};

export default Teste;
