import { useState } from 'react';
import ModalMensagem from '../../Modal/ModalMensagem';
import styles from './index.module.scss'

const BotaoForm = ({type, nomeBotao, texto, mensagemModal}) => {
 
  return (
    <div>
      <button className={styles.botao} type={type} name={nomeBotao}>{texto}</button>
    </div>
  )
}

export default BotaoForm