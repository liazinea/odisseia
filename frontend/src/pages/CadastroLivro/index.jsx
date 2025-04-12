import styles from './index.module.scss';
import Header from '../../components/layout/Header';
import CardCadastro from '../../components/Cards/CardCadastro';
import React from 'react'


const CadastroLivro = () => {
  return (
    <div>
    <Header titulo={"Cadastro de Livro"}/>
    <div className={styles.card}>
    <CardCadastro/>
    </div>

    
    </div>
  )
}

export default CadastroLivro