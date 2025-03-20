import CardAcesso from '../../components/Cards/CardPrimeiroAcesso';
import styles from './index.module.scss';

const PrimeiroAcesso = () => {
  return (
    <div className={styles.principal}>
      <div className={styles.logo}>
        <div className={styles.logoFundo}> 
        </div>

        <div className={styles.logoTexto}>
          <div className={styles.centraliza}>
            <img src="/logo-odisseia.svg" alt="" className={styles.logoImagem}/>
          </div>
          <div>
            <h2 className={styles.logoTitulo}>Odisseia</h2>
            <p className={styles.logoSubtitulo}>E.E Ernesto Quissak</p>
          </div>
        </div>
      </div>
      <div className={styles.form}>
        <CardAcesso tituloCard={'Esqueci minha senha'} typeInput={'email'} nomeCampoInput={'email'} placeholder={'Digite seu e-mail institucional'} required={true} nomeBotao={'enviar'} textoBotao={'Enviar Código'}/>
      </div>
    </div>
  )
}

export default PrimeiroAcesso