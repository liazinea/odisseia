import { useState } from 'react';
import styles from './index.module.scss';

const BotaoForm = ({ type = "button", nomeBotao, texto, onClick }) => {
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    setLoading(true);
    try {
      await onClick();
    } catch (err) {
      console.error("Erro no BotaoForm:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
      <button
        className={styles.botao}
        type={type}
        name={nomeBotao}
        onClick={handleClick}
        disabled={loading}
      >
        {loading ? "Carregando..." : texto}
      </button>
  );
};

export default BotaoForm;
