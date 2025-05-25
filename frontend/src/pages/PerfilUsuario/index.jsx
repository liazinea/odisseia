import React, { useState } from "react";
import HeaderPagina from "../../components/layout/HeaderPagina";
import styles from "./index.module.scss";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import Input from "../../components/Inputs/Input";
import Button from "../../components/Botao/Botao";
import ModalAlterarSenha from "../../components/Modal/ModalAlterarSenha";
import { useForm } from "react-hook-form";

const PerfilUsuario = () => {
  const navigate = useNavigate();
  const { token, userType } = useAuth();
  const { logout } = useAuth();

  // Estado para controlar o modal
  const [modalSenhaAberto, setModalSenhaAberto] = useState(false);
  const [passwordMessage, setPasswordMessage] = useState(null);

  // react-hook-form para o modal
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    reset,
  } = useForm();

  useEffect(() => {
    if (!token || userType != 0) {
      navigate("/");
    }
  }, [token, userType, navigate]);

  // Função para abrir o modal
  const abrirModalSenha = () => {
    setPasswordMessage(null);
    setModalSenhaAberto(true);
    reset();
  };

  // Função para fechar o modal
  const fecharModalSenha = () => {
    setModalSenhaAberto(false);
    setPasswordMessage(null);
    reset();
  };

  // Função para submit do modal
  const onSubmitAlterarSenha = async (data) => {
    // Aqui você faz a chamada para a API de alteração de senha
    // Exemplo fictício:
    if (data.novaSenha !== data.confirmarNovaSenha) {
      setPasswordMessage("As senhas não coincidem.");
      return;
    }
    // Capture e exiba os valores dos inputs
    console.log("Valores do formulário:", data);
    try {
      // await api.post("/usuario/alterar-senha", data);
      setPasswordMessage("Senha alterada com sucesso!");
      setTimeout(() => {
        fecharModalSenha();
      }, 1500);
    } catch (error) {
      setPasswordMessage("Erro ao alterar senha.");
    }
  };

  return (
    <>
      <HeaderPagina titulo="Perfil do aluno" />

      <div className={styles["container-geral"]}>
        <div className={styles["container-informacoes"]}>
          <div className={styles["titulo-container"]}>
            <h2 className={styles["titulo"]}>Dados pessoais</h2>
          </div>
          <div className={styles["container-inputs"]}>
            <div className={styles["inputs"]}>
              <label>Nome:</label>
              <Input value={"Fabinho doidão"} disabled={true} keepStyleWhenDisabled={true}/>
            </div>
            <div className={styles["inputs"]}>
              <label>Data de nascimento:</label>
              <Input type={"date"} value={"2025-05-02"} disabled={true} keepStyleWhenDisabled={true}/>
            </div>
            <div className={styles["inputs"]}>
              <label>RA:</label>
              <Input value={"43785"} disabled={true} keepStyleWhenDisabled={true}/>
            </div>
            <div className={styles["inputs"]}>
              <label>Série:</label>
              <Input value={"2° Ano A"} disabled={true} keepStyleWhenDisabled={true}/>
            </div>
            <div className={styles["inputs"]}>
              <label>E-mail:</label>
              <Input value={"email@example.com"} disabled={true} keepStyleWhenDisabled={true}/>
            </div>
            <div className={styles["inputs"]}>
              <label>Senha:</label>
              <Input value={"**************"} disabled={true} keepStyleWhenDisabled={true} />
            </div>
          </div>

          <div className={styles["container-botao"]}>
            <Button nomeBotao="EditarSenha" texto="Alterar a senha" onClick={abrirModalSenha} />
          </div>
        </div>
        <div className={styles["container-historico"]}>Exibir histórico</div>
      </div>

      <ModalAlterarSenha
        isOpen={modalSenhaAberto}
        onClose={fecharModalSenha}
        onSubmit={onSubmitAlterarSenha}
        handleSubmit={handleSubmit}
        register={register}
        errors={errors}
        passwordMessage={passwordMessage}
      />
    </>
  );
};

export default PerfilUsuario;