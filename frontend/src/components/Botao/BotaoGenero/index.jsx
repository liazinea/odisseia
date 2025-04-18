import styles from './index.module.scss';
import React from 'react'

const BotaoGenero = ({texto}) => {
  return (
    <div>
      <button type="submit" className={styles.btn}>{texto}</button>
    </div>
  )
}   
export default BotaoGenero;
