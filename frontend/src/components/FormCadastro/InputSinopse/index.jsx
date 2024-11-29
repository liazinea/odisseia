import styles from './index.module.scss';

import React from 'react'

const InputSinopse = ({ titulo, placeholder, register, campo, erro}) => {

  return (
    <div>

      <p className={styles.label} htmlFor={campo}>{titulo}</p>
      <textarea  {...register(campo,  {required: true})}rows="25" 
                  cols="50"  type="text" id={campo} className={styles.input} placeholder={placeholder}/>
            

    </div>
  )
}
export default InputSinopse