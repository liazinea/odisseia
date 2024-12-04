import styles from './index.module.scss';
import React from 'react'

const InputTexto = ({ register,campo, titulo, placeholder, errors}) => {

  return (
    <div>
      <div className={styles.principal}>
        <p className={styles.label} htmlFor={campo}>{titulo}</p>
        {errors?.[campo] && <span className={styles.erro}>{errors[campo].message}</span>}
      </div>
      <input
        {...register(campo, { required: "*Este campo é obrigatório" })}
        type="text"
        id={campo}
        className={styles.input}
        placeholder={placeholder}
      />
    </div>
  )
}
export default InputTexto