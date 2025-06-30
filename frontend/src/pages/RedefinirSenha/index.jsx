import { useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import api from "../../services/api";
import styles from "./index.module.scss";
import InputForm from "../../components/Inputs/InputForm";
import BotaoFormLogin from "../../components/Botao/BotaoFormLogin";
import ModalMensagem from "../../components/Modal/ModalMensagem";

const RedefinirSenha = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const email = searchParams.get("email");
  const [modalMensagemAberto, setModalMensagemAberto] = useState(false);
  const [mensagemModal, setMensagemModal] = useState("");
  const navigate = useNavigate();

  const fecharModalMensagem = () => {
    setModalMensagemAberto(false);
    setMensagemModal("");
    navigate('/')
  };

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
      const response = await api.post("/usuarios/redefinir-senha", {
        token,
        email,
        password: data.password,
        password_confirmation: data.passwordConfirmation,
      });

      setMsgSucesso(response.data.message);
      setMensagemModal(response.data.message);
      setModalMensagemAberto(true);
    } catch (error) {
      setMsgErro(error.response?.data?.message || "Erro ao redefinir senha.");
      setMensagemModal(
        error.response?.data?.message || "Erro ao redefinir senha."
      );
      setModalMensagemAberto(true);
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
            <div className={styles.botao}>
              <BotaoFormLogin
                type={"button"}
                nomeBotao={"submit"}
                texto={"Redefinir senha"}
                onClick={handleSubmit(onSubmit)}
              />
            </div>
          </form>
        </div>
      </div>
      <ModalMensagem
        mensagemModal={mensagemModal}
        closeModal={fecharModalMensagem}
        modalAberto={modalMensagemAberto}
      />
    </div>
  );
};

export default RedefinirSenha;
