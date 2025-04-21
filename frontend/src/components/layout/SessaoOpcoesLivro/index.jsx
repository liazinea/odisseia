import React from "react";
import BotaoAdmHome from "../../Botao/BotaoAdmHome";
import styles from "./index.module.scss";

const SessaoOpcoesLivro = () => {
  return (
    <div className={styles.container}>
      <BotaoAdmHome
        type="button"
        nomeBotao="usuarios"
        icon="/livro-icon.svg"
        texto="Cadastrar Livros"
      />
      <BotaoAdmHome
        type="button"
        nomeBotao="usuarios"
        icon="/generos-icon.svg"
        texto="Consultar Livros"
      />
    </div>
  );
};

export default SessaoOpcoesLivro;
