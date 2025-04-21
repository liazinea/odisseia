import React, { useState } from 'react';
import ClassificacaoIndicativa from './ClassificacaoIndicativa';
import styles from './index.module.scss';

const CapaLivro = ({ imagemCapa, classificacao }) => {
  const [imagemValida, setImagemValida] = useState(true);

  const getUrlImagem = () => {
    if (!imagemCapa) return '';
    return imagemCapa.startsWith('http')
      ? imagemCapa
      : `http://127.0.0.1:8000/storage/${imagemCapa}`;
  };

  return (
    <div className={styles.capaLivro}>
      <div className={styles.classIndicativa}>
        <ClassificacaoIndicativa rating={classificacao} />
      </div>

      {imagemValida && imagemCapa ? (
        <img
          src={`http://127.0.0.1:8000/storage/${imagemCapa}`}
          alt="Capa do livro"
          className={styles.imagemCapa}
          onError={() => setImagemValida(false)}
        />
      ) : (
        <div className={styles.skeleton}>
          <span>Imagem indisponível</span>
        </div>
      )}
    </div>
  );
};

export default CapaLivro;
