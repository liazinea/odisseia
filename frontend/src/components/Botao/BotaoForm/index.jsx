import styles from './index.module.scss'

const BotaoForm = ({type, nomeBotao, texto}) => {
  return (
    <button className={styles.botao} type={type} name={nomeBotao}>{texto}</button>
  )
}

export default BotaoForm