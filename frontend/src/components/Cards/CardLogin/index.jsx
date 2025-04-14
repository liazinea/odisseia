import BotaoFormLogin from '../../Botao/BotaoFormLogin'
import InputForm from '../../Inputs/InputForm'
import styles from './index.module.scss'
import {Link} from 'react-router-dom'

const CardLogin = () => {

  
  return (
    <div className={styles.form}>
        <div className={styles.cardFundo}>
          <h1 className={styles.cardTitulo}>Login</h1>
          <form action="">
            <InputForm type={'email'} nomeCampo={"email"} placeholder={"E-mail"} required={true}/>
            <InputForm type={'password'} nomeCampo={"senha"} placeholder={"Senha"} required={true}/>
            <div className={styles.botao}>
              <BotaoFormLogin type={"submit"} nomeBotao={'entrar'} texto={'Entrar'}/>
            </div>
            <div className={styles.texto}>
              <Link to={`/primeiro-acesso`}>
                <p>Primeiro acesso?</p>
              </Link>
              <Link to={`/esqueci-minha-senha`}>
                <p>Esqueci minha senha</p>
              </Link>
            </div>
            </form>
        </div>
    </div>
  )
}

export default CardLogin