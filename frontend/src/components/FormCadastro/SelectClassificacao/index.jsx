import styles from './index.module.scss';

import React from 'react'

const Classificacao= ({titulo, campo, register, errors}) => {

  return (
    <div>
      <div className={styles.principal}>
          <p className={styles.label} htmlFor={campo}>{titulo}</p>
          {errors?.[campo] && <span className={styles.erro}>{errors[campo].message}</span>}
      </div>
      <select {...register(campo, { required: "*Este campo é obrigatório" })}type="text" id={campo} className={styles.select}>
      <option value="">Selecione</option>
      <option value="Livre">Livre</option>
      <option value="+12">+12</option>
      <option value="+14">+14</option>
      </select>
      


    </div>
  )
}
export default Classificacao