import { useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import api from "../../services/api";
import InputForm from "../../components/Inputs/InputForm";
import BotaoFormLogin from "../../components/Botao/BotaoFormLogin";
import ModalMensagem from "../../components/Modal/ModalMensagem";
import styles from "./index.module.scss";
import { useState } from "react";

const ValidarCodigo = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [mensagemModal, setMensagemModal] = useState();
  const [sucessoModal, setSucessoModal] = useState(false);
  const [modalMensagemAberto, setModalMensagemAberto] = useState();
  const email = location.state?.email || "";

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const fecharModalMensagem = () => {
    setModalMensagemAberto(false);
    setMensagemModal("");
    if(sucessoModal){
      navigate("/");
      setSucessoModal(false)
    }
  };

  const onSubmit = async (data) => {
    try {
      const response = await api.post("/confirmar-codigo", data);
      console.log(data)
      setMensagemModal("Senha definida com sucesso!");
      setMensagemModal(response.data.message);
      setModalMensagemAberto(true);
      console.log(modalMensagemAberto)
      setSucessoModal(true)
    } catch (error) {
      console.log(error);
      setMensagemModal(error.response.data.message);
      setModalMensagemAberto(true);
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
        <div className={styles.cardFundo}>
          <h2 className={styles.cardTitulo}>Validar Código</h2>
          <form onSubmit={handleSubmit(onSubmit)}>
            <InputForm
              type={"email"}
              nomeCampo={"email"}
              placeholder={"Digite o email"}
              required={true}
              filledInput={true}
              {...register("email", { required: "Email obrigatório" })}
              defaultValue={email}
              error={errors}
            />
            {/* <div style={{ marginBottom: "10px" }}>
          <label>Email</label>
          <input
            type="email"
            {...register("email", { required: "Email obrigatório" })}
            defaultValue={email}
          />
          {errors.email && <p style={{ color: "red" }}>{errors.email.message}</p>}
        </div> */}
            <InputForm
              type={"number"}
              nomeCampo={"codigo"}
              placeholder={"Código recebido"}
              required={true}
              {...register("code", { required: "Código obrigatório" })}
              error={errors}
            />

            {/* <div style={{ marginBottom: "10px" }}>
          <label>Código recebido</label>
          <input
            type="text"
            {...register("code", { required: "Código obrigatório" })}
          />
          {errors.code && <p style={{ color: "red" }}>{errors.code.message}</p>}
        </div> */}

            <InputForm
              type={"password"}
              nomeCampo={"senha"}
              placeholder={"Nova senha"}
              required={true}
              {...register("password", { required: "Senha obrigatória" })}
              error={errors}
            />

            {/* <div style={{ marginBottom: "10px" }}>
          <label>Nova senha</label>
          <input
            type="password"
            {...register("password", { required: "Senha obrigatória" })}
          />
          {errors.password && (
            <p style={{ color: "red" }}>{errors.password.message}</p>
          )}
        </div> */}

            {/* <button type="submit">Salvar senha</button> */}
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

export default ValidarCodigo;
