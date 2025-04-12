import { useState, useEffect } from "react";
import Navbar from "../../components/layout/Navbar";
import HeaderPagina from "../../components/layout/HeaderPagina";
import Footer from "../../components/layout/Footer";
import styles from "./index.module.scss";
import Button from "../../components/Botao/BotaoLaranja";
import Input from "../../components/Inputs/Input";
import useGeneros from "../../hooks/useGeneros";
import BarraPesquisa from "../../components/layout/HeaderHome/BarraPesquisa";
import ListaGeneros from "../../components/layout/ListaGeneros";

const Generos = () => {
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (value) => {
    setInputValue(value);
  };

  const handleButtonClick = () => {
    console.log("Valor do input:", inputValue);
  };

  const { generos } = useGeneros();
  const [generosBuscados, setGenerosBuscados] = useState([]);
  console.log(generos);

  const buscaGenero = async () => {
    const response = await api.get(`/generos`);
    setGenerosBuscados(response.data.generos.data);
  };

  useEffect(() => {
    setGenerosBuscados([
      { id: 1, nome: "Ficção Científica" },
      { id: 2, nome: "Fantasia" },
      { id: 3, nome: "Romance" },
      { id: 4, nome: "Terror" },
      { id: 5, nome: "Biografia" },
    ]);
  }, []);

  return (
    <>
      <Navbar />
      <HeaderPagina titulo="Gêneros de Livros" />
      <div className={styles["barra-pesquisa"]}>
        <BarraPesquisa
          placeholder="Pesquise por gênero"
          onChange={handleInputChange}
        />
      </div>
      <div className={styles["container-geral"]}>
        <div className={styles["container-exibir"]}>
          <div className={styles["titulo"]}>
            <h2>Gêneros cadastrados</h2>
          </div>
          <div className={styles["tabela"]}>
            <div className={styles.head}>
              <div className={styles.nome}>Nome</div>
              <div className={styles.opcoes}>Opções</div>
            </div>
            {generosBuscados.map((genero) => (
              <div className={styles.conteudo} key={genero.id}>
                <ListaGeneros genero={genero} buscaGenero={buscaGenero} />
              </div>
            ))}
          </div>
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
              placeholder="Digite o nome do gênero"
              required={true}
              onChange={handleInputChange}
            />
          </div>
          <div className={styles["botao"]}>
            <Button
              type="button"
              nomeBotao="cadastrar"
              texto="Adicionar Gênero"
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
