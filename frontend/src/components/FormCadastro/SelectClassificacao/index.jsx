import styles from './index.module.scss';

import React from 'react'

const Classificacao= ({titulo, campo, register, erro}) => {

  return (
    <div>

      <p className={styles.label} htmlFor={campo}>{titulo}</p>
      <select {...register(campo,  {required: true})}type="text" id={campo} className={styles.select}>
      <option value="">Selecione</option>
      <option value="romance">Livre</option>
      <option value="acao">+12</option>
      <option value="história">+14</option>
      </select>
      


    </div>
  )
}
export default Classificacao