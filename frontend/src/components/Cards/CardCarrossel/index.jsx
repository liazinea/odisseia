import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./index.module.scss";
import CapaLivro from "../../Livro/CapaLivro";
import useLivrosEGeneros from "../../../hooks/useLivrosEGeneros";

const CardCarrossel = () => {
  const [livros, setLivros] = useState([]);
  const [generos, setGeneros] = useState([]);
  // console.log(generos)
  //  console.log(livros)
  const [generoAtual, setGeneroAtual] = useState(0);
  const [animating, setAnimating] = useState(false);
  const { buscaLivrosEGeneros } = useLivrosEGeneros();
  const navigate = useNavigate();

  useEffect(() => {
    const carregarlivros = async () => {
      const dados = await buscaLivrosEGeneros();
      const generosExtraidos = dados.map(dado => dado.genero);
      setGeneros(generosExtraidos);

      const todosLivros = dados.flatMap(dado =>
        dado.livros.map(livro => ({ ...livro, genero: dado.genero }))
      );
      setLivros(todosLivros);
      setGeneroAtual(0);
    };

    carregarlivros();
  }, [livros == 0]);

  useEffect(() => {
    if (generos.length === 0) return;
    const intervalo = setInterval(() => {
      trocarGenero((generoAtual + 1) % generos.length);
    }, 9000);
    return () => clearInterval(intervalo);
  }, [generoAtual, generos]);

  const trocarGenero = (novoIndice) => {
    setAnimating(true);
    setTimeout(() => {
      setGeneroAtual(novoIndice);
      setAnimating(false);
    }, 300);
  };

  const handlePrev = () => {
    const novo = (generoAtual - 1 + generos.length) % generos.length;
    trocarGenero(novo);
  };

  const handleNext = () => {
    const novo = (generoAtual + 1) % generos.length;
    trocarGenero(novo);
  };

  const genero = generos[generoAtual] || '';
  const livrosDoGenero = livros.filter(livro => livro.genero === genero);

  return (
    <div className={styles.carrosselContainer}>
      <h2 className={styles.generoTitulo}>{genero}</h2>
      <div className={styles.carrosselWrapper}>
        <button className={`${styles.seta} ${styles.esquerda}`} onClick={handlePrev}>
          &#10094;
        </button>

        <div className={`${styles.cardContainer} ${animating ? styles.animating : ""}`}>
          {livrosDoGenero.map((livro, index) => (
            <div key={index} className={styles.card} onClick={() => navigate(`/livro/${livro.liv_id}`)}>
              <CapaLivro imagemCapa={livro.liv_capa} classificacao={livro.liv_classIndicativa} />
            </div>
          ))}
        </div>

        <button className={`${styles.seta} ${styles.direita}`} onClick={handleNext}>
          &#10095;
        </button>
      </div>
    </div>
  );
};

export default CardCarrossel;
