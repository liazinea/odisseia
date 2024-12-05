import React from "react";
import styles from './index.module.scss';

const ClassificacaoIndicativa = ({ rating }) => {
  // Mapear classificações para cores
  const colors = {
    'Livre': "#008a33", // Verde para Livre
    '+10': "#0073b5",   // Azul para 10 anos
    '+12': "#f2c400",   // Amarelo para 12 anos
    '+14': "#e07a00",   // Laranja para 14 anos
    '+16': "#d4080f",   // Vermelho para 16 anos
    '+18': "#080500",   // Preto para 18 anos
  };

  const color = colors[rating] || "#080500"; // Preto como padrão
  const displayRating = rating === "Livre" ? "L" : rating; // Exibir "L" se for "Livre"

  console.log('classificacao',rating);
  return (
    <div className={styles.container}>
      <div
        className={styles.classificacaoIndicativa}
        style={{ backgroundColor: color }}
      >
        <span className={styles.textoClassificacao}>{displayRating}</span>
      </div>
    </div>
  );
};

export default ClassificacaoIndicativa;