import styles from './index.module.scss';

import React from 'react'

const InputNumero = ({ register, campo, errors, titulo, placeholder }) => {

  return (
    <div>

<div className={styles.principal}>
        <p className={styles.label} htmlFor={campo}>{titulo}</p>
        {errors?.[campo] && <span className={styles.erro}>{errors[campo].message}</span>}
      </div>
      <input
        {...register(campo, { required: "*Este campo é obrigatório" })}
        type="number" min='1' id={campo} className={styles.input} placeholder={placeholder}
      />


    </div>
  )
}
export default InputNumero