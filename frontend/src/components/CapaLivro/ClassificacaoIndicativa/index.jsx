import React from "react";
import styles from './index.module.scss';

const ClassificacaoIndicativa = ({ rating }) => {
  // Mapear classificações para cores
  const colors = {
    'L': "#008a33", // Verde para Livre
    '+10': "#0073b5", // Amarelo para 10 anos
    '+12': "#f2c400", // Laranja para 12 anos
    '+14': "#e07a00", // Vermelho claro para 14 anos
    '+16': "#d4080f", // Vermelho médio para 16 anos
    '+18': "#080500", // Vermelho escuro para 18 anos
  };

  const color = colors[rating] || "#080500"; // Preto como padrão

  return (
<div className={styles.container}>
  <div className={styles.classificacaoIndicativa} style={{ backgroundColor: color }}>
    <span className={styles.textoClassificacao}>{rating}</span>
  </div>
</div>

  );
};

export default ClassificacaoIndicativa;
