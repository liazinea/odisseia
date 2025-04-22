import React from "react";
import styles from './index.module.scss';

const ClassificacaoIndicativa = ({ rating }) => {
  const colors = {
    'Livre': "#008a33",
    '+10': "#0073b5",
    '+12': "#f2c400",
    '+14': "#e07a00",
    '+16': "#d4080f",
    '+18': "#080500",
  };
// console.log(rating)
  const normalizedRating = (rating || "").trim();
  const color = colors[normalizedRating] || "#080500";
  const displayRating = normalizedRating === "Livre" ? "L" : normalizedRating;

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
