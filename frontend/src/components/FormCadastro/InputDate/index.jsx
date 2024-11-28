import styles from './index.module.scss';

import React from 'react'

const InputTexto = ({titulo, placeholder}) => {
  return (
    <div>

      <p className={styles.label} htmlFor="input">{titulo}</p>
      <input type="date" id='input' className={styles.input} placeholder={placeholder}/>


    </div>
  )
}
export default InputTexto