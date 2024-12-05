import React from 'react'
import styles from './index.module.scss';
import { FaSearch } from 'react-icons/fa';

const PesquisaEmprestimo = ( ) => {
  return (
    <div className={styles.barra}>
        <input type='text' placeholder="Pesquise por livro, aluno ou data de empréstimo" className={styles.pesquisa}/>
        <FaSearch className={styles.icon}/>
    </div>
  );
}

export default PesquisaEmprestimo