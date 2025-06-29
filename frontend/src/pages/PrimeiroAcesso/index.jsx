import { useForm } from "react-hook-form";
import api
  from "../../services/api";
import CardAcesso from "../../components/Cards/CardPrimeiroAcesso";
import styles from "./index.module.scss";
import {useNavigate} from "react-router-dom";
const PrimeiroAcesso = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      // substitua pela sua URL de API
      await api.post("/criar-token", {
        email: data.email,
      });
      navigate('/primeiro-acesso/validar-codigo', {
        state: { email: data.email }
      });
    } catch (error) {
      console.error(error);
      alert("Erro ao enviar código!");
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
            tituloCard="Primeiro Acesso"
            typeInput="email"
            nomeCampoInput="email"
            placeholder="Digite seu e-mail institucional"
            required={true}
            nomeBotao="enviar"
            textoBotao="Enviar Código"
            register={register}
            errors={errors}
            isSubmitting={isSubmitting}
          />
        </form>
      </div>
    </div>
  );
};

export default PrimeiroAcesso;
