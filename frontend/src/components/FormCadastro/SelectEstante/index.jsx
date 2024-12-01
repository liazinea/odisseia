import styles from './index.module.scss';

import React from 'react'

const SelectEstante = ({ titulo, register, estantes, campo }) => {

  return (
    <div>

      <p className={styles.label} htmlFor={campo}>{titulo}</p>
      <select {...register(campo, { required: true })} type="text" id={campo} className={styles.select}>
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