import React from 'react'
import styles from './index.module.scss';


  const Informacoes = ({Info, open}) =>{ 

  return (
    <div  className={`${styles.toggleFechado} ${open ? styles.toggleAberto : null}`}>
      <p className={styles.titulo}>{Info}</p>
        
    </div>
  );
}

export default Informacoes