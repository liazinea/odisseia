import styles from './index.module.scss';
import Header from '../../components/layout/Header';
import CardCadastro from '../../components/Cards/CardCadastro';
import React from 'react'
import { useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import {
  useNavigate
} from 'react-router-dom';



const CadastroLivro = () => {
  const { token } = useAuth()
  const { userType } = useAuth()
  const navigate = useNavigate()
  

  useEffect(() => {
    if (!token || userType != 1) {
      navigate('/')
    }
  }, [token])

  return (
    <div className={styles.principal}>
      <Header titulo={"Cadastro de Livro"} />
      <div className={styles.card}>
        <CardCadastro />
      </div>


    </div>
  )
}

export default CadastroLivro