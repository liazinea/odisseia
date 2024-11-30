import styles from './index.module.scss';

import React from 'react'

const Classificacao= ({titulo, campo, register, erro}) => {

  return (
    <div>

      <p className={styles.label} htmlFor={campo}>{titulo}</p>
      <select {...register(campo,  {required: true})}type="text" id={campo} className={styles.select}>
      <option value="">Selecione</option>
      <option value="Livre">Livre</option>
      <option value="+12">+12</option>
      <option value="+14">+14</option>
      </select>
      


    </div>
  )
}
export default Classificacao