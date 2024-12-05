import React from 'react'
import Navbar from '../../components/NavbarAdm'
import HeaderPagina from '../../components/HeaderPagina'
import FormCadastro from '../../components/FormCadastro'
import Footer from '../../components/Footer'
import styles from './index.module.scss';

const CadastroLivro = () => {
  return (
    <>
        <Navbar/>
        <HeaderPagina titulo={"Cadastro de Livro"}/>
        <div className={styles.form}>
            <FormCadastro/>
        </div>
        <Footer/>
    </>
  )
}

export default CadastroLivro