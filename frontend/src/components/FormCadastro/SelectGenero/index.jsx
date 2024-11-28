import styles from './index.module.scss';

import React from 'react'

const SelectEstante= ({titulo}) => {
  return (
    <div>

      <p className={styles.label} htmlFor="input">{titulo}</p>
      <select type="text" id='input' className={styles.select}>
      <option value="">Selecione</option>
      <option value="história">Matemática</option>
      <option value="romance">Romance</option>
      <option value="acao">Ação</option>
      <option value="história">História</option>
      </select>



    </div>
  )
}
export default SelectEstante