import React from "react";
import HeaderPagina from "../../components/layout/HeaderPagina";
import styles from "./index.module.scss";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import Input from "../../components/Inputs/Input";
import Button from "../../components/Botao/Botao";

const PerfilUsuario = () => {
  const navigate = useNavigate();
  const { token, userType } = useAuth();

  const { logout } = useAuth();
  useEffect(() => {
    if (!token || userType != 0) {
      navigate("/");
    }
  }, [token]);
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
              <Input value={"Fabinho doidão"} disabled={true} />
            </div>
            <div className={styles["inputs"]}>
              <label>Data de nascimento:</label>
              <Input type={"date"} value={"2025-05-02"} disabled={true} />
            </div>
            <div className={styles["inputs"]}>
              <label>RA:</label>
              <Input value={"43785"} disabled={true} />
            </div>
            <div className={styles["inputs"]}>
              <label>Série:</label>
              <Input value={"2° Ano A"} disabled={true} />
            </div>
            <div className={styles["inputs"]}>
              <label>E-mail:</label>
              <Input value={"email@example.com"} disabled={true} />
            </div>
            <div className={styles["inputs"]}>
              <label>Senha:</label>
              <Input value={"**************"} disabled={true} />
            </div>
          </div>

          <div className={styles["container-botao"]}>
            <Button nomeBotao="EditarSenha" texto="Alterar a senha" />
          </div>
        </div>
        <div className={styles["container-historico"]}>Exibir histórico</div>
      </div>
    </>
  );
};

export default PerfilUsuario;
