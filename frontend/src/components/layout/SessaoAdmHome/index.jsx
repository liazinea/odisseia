import React from "react";
import BotaoAdmHome from "../../Botao/BotaoAdmHome";
import styles from "./index.module.scss";
import { useNavigate } from "react-router-dom";

const SessaoAdmHome = () => {
  const navigate = useNavigate()
  return (
    <div className={styles.container}>
      <BotaoAdmHome
        type="button"
        nomeBotao="realizar-emprestimo"
        icon="/plus-icon.svg"
        texto="Realizar empréstimo"
      />
      <BotaoAdmHome
        type="button"
        nomeBotao="consultar-emprestimos"
        icon="/registros-icon.svg"
        texto="Consultar empréstimos"
      />
        <BotaoAdmHome
        type="button"
        nomeBotao="livros"
        icon="/livro-icon.svg"
        texto="Livros"
        onClick={()=>navigate('/opcoes-livro')}
      />
      <BotaoAdmHome
        type="button"
        nomeBotao="usuarios"
        icon="/users-icon.svg"
        texto="Usuários"
        onClick={()=>navigate('/usuarios')}
      />
      <BotaoAdmHome
        type="button"
        nomeBotao="autores"
        icon="/autores-icon.svg"
        texto="Autores"
      />
      <BotaoAdmHome
        type="button"
        nomeBotao="generos"
        icon="/generos-icon.svg"
        texto="Gêneros"
        onClick={()=>navigate('/generos')}
      />
      <BotaoAdmHome
        type="button"
        nomeBotao="editoras"
        icon="/editoras-icon.svg"
        texto="editoras"
      />
    </div>
  );
};

export default SessaoAdmHome;
