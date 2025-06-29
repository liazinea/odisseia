import { Link } from "react-router-dom";
import BotaoFormLogin from "../../Botao/BotaoFormLogin";
import InputFormAcesso from "../../Inputs/InputFormAcesso";
import styles from "./index.module.scss";

const CardAcesso = ({
  tituloCard,
  typeInput,
  nomeCampoInput,
  placeholder,
  required,
  nomeBotao,
  textoBotao,
  register,
  errors,
  isSubmitting
}) => {
  return (
    <div className={styles.form}>
      <div className={styles.cardFundo}>
        <h1 className={styles.cardTitulo}>{tituloCard}</h1>

        <InputFormAcesso
          type={typeInput}
          nomeCampo={nomeCampoInput}
          placeholder={placeholder}
          required={required}
          register={register}
          error={errors?.[nomeCampoInput]}
        />
        s

        <div className={styles.botao}>
          <BotaoFormLogin
            type="submit"
            nomeBotao={nomeBotao}
            texto={isSubmitting ? "Enviando..." : textoBotao}
          />
        </div>

        <Link className={styles.texto} to={`/`}>
          <p>Voltar para Login</p>
        </Link>
      </div>
    </div>
  );
};

export default CardAcesso;
