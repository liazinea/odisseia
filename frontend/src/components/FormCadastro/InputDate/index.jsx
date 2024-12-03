import styles from './index.module.scss';

import React from 'react'

const InputTexto = ({ campo, register,erro,  titulo, placeholder}) => {

  return (
    <div>

      <p className={styles.label} htmlFor={campo}>{titulo}</p>
      <input {...register(campo,  {required: true})}type="date" id={campo} className={styles.input} placeholder={placeholder}/>
      

    </div>
  )
}
export default InputTexto