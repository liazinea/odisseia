import { Link } from "react-router-dom";
import BotaoForm from "../../Botao/BotaoForm";
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
}) => {
  return (
    <div className={styles.form}>
      <form action="" className={styles.cardFundo}>
        <h1 className={styles.cardTitulo}>{tituloCard}</h1>
        <InputFormAcesso
          type={typeInput}
          nomeCampo={nomeCampoInput}
          placeholder={placeholder}
          required={required}
        />
        <div className={styles.botao}>
          <BotaoForm type={"submit"} nomeBotao={nomeBotao} texto={textoBotao} />
        </div>
        <Link to={`/`}>
          <p>Voltar para Login</p>
        </Link>
      </form>
    </div>
  );
};

export default CardAcesso;
