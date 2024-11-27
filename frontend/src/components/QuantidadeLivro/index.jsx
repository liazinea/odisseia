import styles from "./index.module.scss";
import React from 'react';


const QuantidadeLivro = ({quantidade, volume}) => {
  return (
    <div>
      <p className={styles.qtd}>{quantidade}</p>

      <div className={styles.quadrado}>
        <div className={styles.subquad}>
            <p className={styles.numero}>{volume}</p>
        </div>
      </div>
      
    </div>
  )
}

export default QuantidadeLivro


