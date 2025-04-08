import React from "react";
import BotaoAdmHome from "../../Botao/BotaoAdmHome";
import styles from "./index.module.scss";

const SessaoAdmHome = () => {
  return (
    <div className={styles.container}>
      <BotaoAdmHome
        type="button"
        nomeBotao="usuarios"
        icon="/public/users-icon.svg"
        texto="Usuários"
      />
      <BotaoAdmHome
        type="button"
        nomeBotao="livros"
        icon="/public/livro-icon.svg"
        texto="Livros"
      />
      <BotaoAdmHome
        type="button"
        nomeBotao="editoras"
        icon="/public/editoras-icon.svg"
        texto="editoras"
      />
      <BotaoAdmHome
        type="button"
        nomeBotao="autores"
        icon="/public/autores-icon.svg"
        texto="Autores"
      />
      <BotaoAdmHome
        type="button"
        nomeBotao="generos"
        icon="/public/generos-icon.svg"
        texto="Gêneros"
      />
      <BotaoAdmHome
        type="button"
        nomeBotao="registros"
        icon="/public/registros-icon.svg"
        texto="Registros"
      />
    </div>
  );
};

export default SessaoAdmHome;
