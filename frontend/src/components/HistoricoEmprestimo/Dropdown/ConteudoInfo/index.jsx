import React from 'react'
import styles from './index.module.scss';


  const ConteudoInfo = ({NomeInfo, Conteudo, open}) =>{ 

  return (
    <div className={`${styles.toggleFechado} ${open ? styles.toggleAberto : null}`}>
      
      <p className={styles.titulo}>{NomeInfo}</p>
      <p className={styles.conteudo}>{Conteudo}</p>
        
    </div>
  );
}

export default ConteudoInfo