import styles from "./index.module.scss";
import React from 'react';


const QuantidadeLivro = ({quantidade}) => {
  return (
    <div>
      <p className={styles.qtd}>Quantidade: </p>

      <div className={styles.quadrado}>
        <div className={styles.subquad}>
            <p className={styles.numero}>{quantidade}</p>
        </div>
      </div>
      
    </div>
  )
}

export default QuantidadeLivro


