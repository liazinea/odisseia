import React from 'react'
import styles from './index.module.scss'
import CardForm from '../../components/Cards/CardForm'

const Login = () => {
  return (
    <div className={styles.principal}>
      <div className={styles.logo}>
        <img src="/forma-login.svg" alt="" className={styles.logoFundo}/>
        <div className={styles.logoTexto}>
          <div className={styles.centraliza}>
            <img src="/logo-odisseia.svg" alt="" className={styles.logoImagem}/>
          </div>
          <h2 className={styles.logoTitulo}>Odisseia</h2>
          <p className={styles.logoSubtitulo}>E.E Ernesto Quissak</p>
        </div>
      </div>
      <div className={styles.form}>
        <CardForm/>
      </div>
    </div>
  )
}

export default Login