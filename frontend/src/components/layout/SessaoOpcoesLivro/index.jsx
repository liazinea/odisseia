import React from "react";
import BotaoAdmHome from "../../Botao/BotaoAdmHome";
import styles from "./index.module.scss";
import { useNavigate } from "react-router-dom";

const SessaoOpcoesLivro = () => {
  const navigate = useNavigate();
  return (
    <div className={styles.container}>
      <BotaoAdmHome
        type="button"
        nomeBotao="cadastrar-livro"
        icon="/livro-icon.svg"
        texto="Cadastrar Livros"
        onClick={()=>navigate('/livro/cadastro')}
        />
      <BotaoAdmHome
        type="button"
        nomeBotao="livros"
        icon="/generos-icon.svg"
        texto="Consultar Livros"
        onClick={()=>navigate('/livros')}
      />
    </div>
  );
};

export default SessaoOpcoesLivro;
