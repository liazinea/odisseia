import styles from './index.module.scss'

const BotaoModal = ({texto, onClick, destaque}) => {
  return (
    <button className={`${styles.botao} ${destaque ? styles.vermelho : styles.laranja}`} onClick={onClick}>{texto}</button>
  )
}

export default BotaoModal