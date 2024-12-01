import styles from './index.module.scss';

import React from 'react'

const InputNumero = ({ register, campo,erro,titulo, placeholder }) => {

  return (
    <div>

      <p className={styles.label} htmlFor={campo}>{titulo}</p>
      <input
        {...register(campo, {required: true})}
        type="number" min='1' id={campo} className={styles.input} placeholder={placeholder}
      />


    </div>
  )
}
export default InputNumero