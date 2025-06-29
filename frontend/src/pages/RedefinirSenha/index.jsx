import React, { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import api from "../../services/api";
import styles from "./index.module.scss";
import InputForm from "../../components/Inputs/InputForm";
import BotaoFormLogin from "../../components/Botao/BotaoFormLogin";

const RedefinirSenha = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const email = searchParams.get("email");

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const [msgSucesso, setMsgSucesso] = useState("");
  const [msgErro, setMsgErro] = useState("");

  const onSubmit = async (data) => {
    setMsgSucesso("");
    setMsgErro("");

    try {
      const response = await api.post('/usuarios/redefinir-senha', {
        token,
        email,
        password: data.password,
        password_confirmation: data.passwordConfirmation,
      });

      setMsgSucesso(response.data.message);
    } catch (error) {
      setMsgErro(error.response?.data?.message || 'Erro ao redefinir senha.');
    }
  };

  if (!token || !email) {
    return <p>Token ou email inválido.</p>;
  }

  return (
    <div className={styles.principal}>
      <div className={styles.logo}>
        <div className={styles.logoFundo}></div>
        <div className={styles.logoTexto}>
          <div className={styles.centraliza}>
            <img
              src="/logo-odisseia.svg"
              alt=""
              className={styles.logoImagem}
            />
          </div>
          <div>
            <h2 className={styles.logoTitulo}>Odisseia</h2>
            <p className={styles.logoSubtitulo}>E.E Ernesto Quissak</p>
          </div>
        </div>
      </div>
      <div className={styles.form}>
        <div className={styles.cardFundo}>
          <h2 className={styles.cardTitulo}>Redefinir Senha</h2>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div>
              {/* <label>Nova senha:</label>
                <input
                  type="password"
                  {...register("password", {
                    required: "A senha é obrigatória",
                    minLength: { value: 6, message: "Mínimo 6 caracteres" },
                  })}
                /> */}
              <InputForm
                type={"password"}
                nomeCampo={"senha"}
                placeholder={"Digite a senha"}
                required={true}
                {...register("password", {
                  required: "A senha é obrigatória",
                  minLength: { value: 6, message: "Mínimo 6 caracteres" },
                })}
                error={errors}
              />
              {errors.password && (
                <p style={{ color: "red" }}>{errors.password.message}</p>
              )}
            </div>

            <div>
              {/* <label>Confirme a senha:</label> */}
              {/* <input
                  type="password"
                  {...register("passwordConfirmation", {
                    required: "Confirmação obrigatória",
                    validate: (value) =>
                      value === watch("password") || "As senhas não conferem",
                  })}
                /> */}
              <InputForm
                type={"password"}
                nomeCampo={"confirmaSenha"}
                placeholder={"Confirme a senha"}
                required={true}
                {...register("passwordConfirmation", {
                  required: "Confirmação obrigatória",
                  validate: (value) =>
                    value === watch("password") || "As senhas não conferem",
                })}
                error={errors}
              />
              {errors.passwordConfirmation && (
                <p style={{ color: "red" }}>
                  {errors.passwordConfirmation.message}
                </p>
              )}
            </div>

            {/* <button type="submit">Redefinir</button> */}
            <div className={styles.botao}>
              <BotaoFormLogin
                type={"submit"}
                nomeBotao={"submit"}
                texto={"Redefinir senha"}
              />
            </div>
          </form>
        </div>

        {msgSucesso && <p style={{ color: "green" }}>{msgSucesso}</p>}
        {msgErro && <p style={{ color: "red" }}>{msgErro}</p>}
      </div>
    </div>
  );
};

export default RedefinirSenha;
