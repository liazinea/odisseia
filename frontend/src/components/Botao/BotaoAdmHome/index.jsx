import styles from "./index.module.scss";

const BotaoForm = ({ type, icon, nomeBotao, texto }) => {
  return (
    <button className={styles.botao} type={type} name={nomeBotao}>
      <img className={styles.img} src={icon} />
      {texto}
    </button>
  );
};

export default BotaoForm;
