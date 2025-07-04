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
  onClick
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

        <div className={styles.botao}>
          <BotaoFormLogin
           type={"button"} 
           nomeBotao={nomeBotao} 
           texto={textoBotao} 
           onClick={onClick}
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
