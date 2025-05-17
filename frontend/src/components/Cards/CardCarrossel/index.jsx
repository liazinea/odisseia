import React, { useState, useEffect } from "react";
import styles from "./index.module.scss";
import CapaLivro from "../../Livro/CapaLivro";

const dados = {
  Romance: [1, 2, 3, 4],
  "Ficção Científica": [5, 6, 7, 8],
  Drama: [9, 10, 11, 12],
};

const generos = Object.keys(dados);

const CardCarrossel = () => {
  const [generoAtual, setGeneroAtual] = useState(0);
  const [animating, setAnimating] = useState(false);

  useEffect(() => {
    const intervalo = setInterval(() => {
      trocarGenero((generoAtual + 1) % generos.length);
    }, 9000);
    return () => clearInterval(intervalo);
  }, [generoAtual]);

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

  const genero = generos[generoAtual];
  const livros = dados[genero];

  return (
    <div className={styles.carrosselContainer}>
      <h2 className={styles.generoTitulo}>{genero}</h2>
      <div className={styles.carrosselWrapper}>
        <button className={`${styles.seta} ${styles.esquerda}`} onClick={handlePrev}>
          &#10094;
        </button>

        <div className={`${styles.cardContainer} ${animating ? styles.animating : ""}`}>
          {livros.map((livro, index) => (
            <div key={index} className={styles.card}>
              <CapaLivro imagemCapa={livro.capa} classificacao={livro.classificacaoIndicativa} />
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


