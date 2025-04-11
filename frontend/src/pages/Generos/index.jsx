import React, { useState } from "react";
import Navbar from "../../components/layout/Navbar";
import HeaderPagina from "../../components/layout/HeaderPagina";
import Footer from "../../components/layout/Footer";
import styles from "./index.module.scss";
import Button from "../../components/Botao/BotaoLaranja";
import Input from "../../components/Inputs/Input";

const Generos = () => {
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (value) => {
    setInputValue(value);
  };

  const handleButtonClick = () => {
    console.log("Valor do input:", inputValue);
  };

  return (
    <>
      <Navbar />
      <HeaderPagina titulo="Gêneros de Livros" />
      <div className={styles["barra-pesquisa"]}>Navbar</div>
      <div className={styles["container-geral"]}>
        <div className={styles["container-exibir"]}>
          <div className={styles["titulo"]}>
            <h2>Gêneros cadastrados</h2>
          </div>
          <div className={styles["tabela"]}></div>
        </div>
        <div className={styles["container-cadastro"]}>
          <div className={styles["titulo"]}>
            <h2>Cadastrar gênero</h2>
          </div>
          <div className={styles["input"]}>
            <label htmlFor="nome">Nome:</label>
            <Input
              type="text"
              nomeCampo="nome"
              placeholder="Nome do gênero"
              required={true}
              onChange={handleInputChange}
            />
          </div>
          <div className={styles["botao"]}>
            <Button
              type="button"
              nomeBotao="cadastrar"
              texto="Cadastrar"
              onClick={handleButtonClick}
            />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Generos;
