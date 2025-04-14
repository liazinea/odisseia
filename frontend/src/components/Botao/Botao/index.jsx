import styles from "./index.module.scss";

const BotaoForm = ({ type, nomeBotao, texto, onClick }) => {
  return (
    <button
      className={styles.botao}
      type={type}
      name={nomeBotao}
      onClick={onClick} // Adicionado suporte para eventos de clique
    >
      {texto}
    </button>
  );
};

export default BotaoForm;
