import styles from './index.module.scss';

import React from 'react'

const SelectEstante= ({ titulo, register,erro,  campo}) => {

  return (
    <div>

      <p className={styles.label} htmlFor={campo}>{titulo}</p>
      <select {...register(campo,  {required: true})}type="text" id={campo} className={styles.select}>
      <option value="">Selecione</option>
      <option value="romance">Romance</option>
      <option value="acao">Ação</option>
      <option value="história">História</option>
      </select>



    </div>
  )
}
export default SelectEstante