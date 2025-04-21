import styles from './index.module.scss'

const BotaoVerMais = ({texto, onClick}) => {
  return (
    <button className={styles.btn} onClick={onClick}>{texto}</button>
  )
}

export default BotaoVerMais