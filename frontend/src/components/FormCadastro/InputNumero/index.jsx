import styles from './index.module.scss';

import React from 'react'

const InputNumero = ({ register, campo, errors, errorsApi, titulo, placeholder }) => {

  return (
    <div>

      <div className={styles.principal}>
        <p className={styles.label} htmlFor={campo}>{titulo}</p>
        {errors?.[campo] && <span className={styles.erro}>{errors[campo].message}</span>}
        {
          typeof errorsApi == 'string' ? (
            <span className={styles.erro}>{errorsApi}</span>
          ) : (
            errorsApi && Array.isArray(errorsApi) && errorsApi.map((erroApi) => (
              <span className={styles.erro} key={erroApi}>
                {erroApi}
              </span>
            ))
          )
        }r
      </div>
      <input
        {...register(campo, { required: "*Este campo é obrigatório" })}
        type="number" min='1' id={campo} className={styles.input} placeholder={placeholder}
      />


    </div>
  )
}
export default InputNumero