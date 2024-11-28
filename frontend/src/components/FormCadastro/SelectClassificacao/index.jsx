import styles from './index.module.scss';

import React from 'react'

const Classificacao= ({titulo}) => {
  return (
    <div>

      <p className={styles.label} htmlFor="input">{titulo}</p>
      <select type="text" id='input' className={styles.select}>
      <option value="">Selecione</option>
      <option value="romance">Livre</option>
      <option value="acao">+12</option>
      <option value="história">+14</option>
      </select>



    </div>
  )
}
export default Classificacao