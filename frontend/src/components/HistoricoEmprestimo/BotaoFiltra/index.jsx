import React from 'react'
import styles from './index.module.scss';
import { useState} from 'react';

const BotaoFiltra= ({textoBotao}) => {
  const [open, setOpen] = useState(false);

  const toggleDropdown = () =>{
    setOpen(open => !open);
  }
  return (
    <div >
      <button onClick={toggleDropdown} className={`${styles.btn} ${open ? styles.btnAtivo : null}`}>{textoBotao}</button>
        
    </div>
  );
}

export default BotaoFiltra