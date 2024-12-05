import styles from './index.module.scss';

import React from 'react'

const BotaoCadastrar = ({texto}) => {
  return (
    <div>
      <button type="submit" className={styles.btn}>{texto}</button>
    </div>
  )
}   
export default BotaoCadastrar