import styles from './index.module.scss';

import React from 'react'

const InputNumero = ({titulo, placeholder}) => {
  return (
    <div>

      <p className={styles.label} htmlFor="input">{titulo}</p>
      <input type="number" min='1' id='input' className={styles.input} placeholder={placeholder}/>


    </div>
  )
}   
export default InputNumero