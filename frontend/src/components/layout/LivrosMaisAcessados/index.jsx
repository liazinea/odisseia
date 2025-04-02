import React from 'react';
import styles from './index.module.scss';
import CardLivrosMaisAcessados from '../../CardLivrosMaisAcessados';

const LivrosMaisAcessados = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.titulo}> Livros Mais Acessados </h1>

      <div className={styles.cards_container}>
        <CardLivrosMaisAcessados />
        <CardLivrosMaisAcessados />
        <CardLivrosMaisAcessados />

      </div>
    </div>
  );
}

export default LivrosMaisAcessados