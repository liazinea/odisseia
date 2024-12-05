import styles from './index.module.scss';

import React from 'react'

const InputSinopse = ({ titulo, placeholder, register, campo, errors, errorsApi}) => {

  return (
    <div>

      <div className={styles.principal}>
          <p className={styles.label} htmlFor={campo}>{titulo}</p>
          {errors?.[campo] && <span className={styles.erro}>{errors[campo].message}</span>}
      </div>
      <textarea  {...register(campo, { required: "*Este campo é obrigatório" })}rows="25" 
                  cols="50"  type="text" id={campo} className={styles.input} placeholder={placeholder}/>
            

    </div>
  )
}
export default InputSinopse