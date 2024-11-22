import React from 'react';
import styles from './index.module.scss';

const HeaderPagina = ({titulo}) => {
  return (
    <div className={styles.principal}>
      <h1 className={styles.titulo}>{titulo}</h1>
    </div>
  );
}

export default HeaderPagina