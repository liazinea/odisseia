import React from 'react'
import styles from './index.module.scss';
import { FaSearch } from 'react-icons/fa';

const BarraPesquisa = ({placeholder}) => {
  return (
    <div className={styles.barra}>
        <input type='text' placeholder={placeholder} className={styles.pesquisa}/>
        <FaSearch className={styles.icon}/>
    </div>
  );
}

export default BarraPesquisa