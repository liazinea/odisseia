import { useForm } from "react-hook-form";
import axios from "axios";
import { useState } from "react";
import CardAcesso from "../../components/Cards/CardPrimeiroAcesso";
import styles from "./index.module.scss";
import api from "../../services/api";
import ModalMensagem from "../../components/Modal/ModalMensagem";

const RedefinicaoSenha = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [mensagem, setMensagem] = useState("");
  const [erro, setErro] = useState("");
  const [modalMensagemAberto, setModalMensagemAberto] = useState(false);
  const [mensagemModal, setMensagemModal] = useState("");

  const fecharModalMensagem = () => {
    setModalMensagemAberto(false);
    setMensagemModal("");
  };

  const onSubmit = async (data) => {
    try {
      const response = await api.post("/usuarios/enviar-codigo", {
        email: data.email,
      });

      setModalMensagemAberto(true);
      setMensagem(response.data.message);
      setMensagemModal(response.data.message);
      setErro("");
    } catch (err) {
      setErro(err.response?.data?.message || "Erro ao enviar o código.");
      setMensagemModal(err.response?.data?.message || "Erro ao enviar o código.");
      setModalMensagemAberto(true);
      setMensagem("");
    }
  };

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
        <form onSubmit={handleSubmit(onSubmit)}>
          <CardAcesso
            tituloCard={"Esqueci minha senha"}
            typeInput={"email"}
            nomeCampoInput={"email"}
            placeholder={"Digite seu e-mail"}
            required={true}
            nomeBotao={"enviar"}
            textoBotao={"Enviar Código"}
            onClick={handleSubmit(onSubmit)}
            register={register}
            errors={errors}
          />
        </form>
      </div>
      <ModalMensagem
        mensagemModal={mensagemModal}
        closeModal={fecharModalMensagem}
        modalAberto={modalMensagemAberto}
      />
    </div>
  );
};

export default RedefinicaoSenha;
