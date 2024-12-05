import styles from './index.module.scss';

import React from 'react'

const SelectEstante = ({ titulo, register, estantes, campo, errors }) => {

  return (
    <div>

      <div className={styles.principal}>
          <p className={styles.label} htmlFor={campo}>{titulo}</p>
          {errors?.[campo] && <span className={styles.erro}>{errors[campo].message}</span>}
      </div>
      <select {...register(campo, { required: "*Este campo é obrigatório" })} type="text" id={campo} className={styles.select}>
      <option value="">Selecione a prateleira</option>
        {estantes.map((estante) => (
          <option key={estante.id} value={estante.nome}>
            {estante.nome}
          </option>
        ))}
      </select>



    </div>
  )
}
export default SelectEstante