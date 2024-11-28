import styles from './index.module.scss';

import React from 'react'

const InputSinopse = ({titulo, placeholder}) => {
  return (
    <div>

      <p className={styles.label} htmlFor="input">{titulo}</p>
      <textarea rows="25" 
                  cols="50"  type="text" id='input' className={styles.input} placeholder={placeholder}/>


    </div>
  )
}
export default InputSinopse