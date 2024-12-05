// CapaLivro.jsx
import React from 'react';
import ClassificacaoIndicativa from './ClassificacaoIndicativa';
import styles from './index.module.scss';

const CapaLivro = ({ imagemCapa, classificacao }) => {
  
  return (
    <div className={styles.capaLivro}>
      {imagemCapa ? (
        <img src={`http://127.0.0.1:8000/storage/${imagemCapa}`} alt="Capa do livro" className={styles.imagemCapa} />
      ) : (
        <div className={styles.skeleton}><span>Imagem indisponível</span></div>
      )}
      {/* A classificação indicativa fica sobre a imagem ou o esqueleto */}
      
      <div className={styles.classIndicativa}>
      <ClassificacaoIndicativa rating={classificacao} />
      </div>
    </div>
  );
};

export default CapaLivro;
