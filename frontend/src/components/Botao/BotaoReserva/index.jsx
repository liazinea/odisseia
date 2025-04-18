import styles from './index.module.scss';
import React from 'react'

const BotaoReserva = ({texto}) => {
  return (
    <div>
      <button type="submit" className={styles.btn}>{texto}</button>
    </div>
  )
}   
export default BotaoReserva;