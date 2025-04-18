import React from 'react'
import styles from './index.module.scss'
import CardLogin from '../../components/Cards/CardLogin'
import { useEffect } from 'react'
import {
  useNavigate
} from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const Login = () => {
  const navigate = useNavigate()
  const { token } = useAuth()
  const { userType } = useAuth()

  useEffect(() => {
    console.log('oii')
    if (token && userType == 0) {
      navigate('/home')
    } else if (token && userType == 1) {
      navigate('/home-adm')
    }
  }, [token])

  return (
    <div className={styles.principal}>
      <div className={styles.logo}>
        <div className={styles.logoFundo}>
          <div className={styles.logoTexto}>
            <div className={styles.centraliza}>
              <img src="/logo-odisseia.svg" alt="" className={styles.logoImagem} />
            </div>
            <div>
              <h2 className={styles.logoTitulo}>Odisseia</h2>
              <p className={styles.logoSubtitulo}>E.E Ernesto Quissak</p>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.form}>
        <CardLogin />
      </div>
    </div>
  )
}

export default Login