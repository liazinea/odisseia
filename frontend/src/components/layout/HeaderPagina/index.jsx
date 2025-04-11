import React from 'react';
import styles from './index.module.scss';

const HeaderPagina = ({titulo}) => {
  return (
    <div className={styles.principal}>
      <div className={styles.conteudo}>
        <h1 className={styles.titulo}>{titulo}</h1>
      </div>
    </div>
  );
}

export default HeaderPagina