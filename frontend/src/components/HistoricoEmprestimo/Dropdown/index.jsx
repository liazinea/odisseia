import React from 'react'
import styles from './index.module.scss';
import { useState} from 'react';
import Informacoes from './Informacoes';
import ConteudoInfo from './ConteudoInfo';


const Dropdown = ({dataPubli, idEmprestimo, nomeLivro, numeroSerie, status}) => {

  const [open, setOpen] = useState(false);

  const toggleDropdown = () =>{
    setOpen(open => !open);
  }

  return (
    
      <div>
        <div className={styles.alinha}>
    <div onClick={toggleDropdown} className={`${styles.principal} ${open ? styles.aberto : null}`}>
    
      <div className={styles.dataPubli}>
         <p className={styles.label}>Data emprestimo:</p> <p>{dataPubli}</p>
      </div>
      <div className={styles.dataPubli}> 
        <p className={styles.label}>Id emprestimo:</p> <p>{idEmprestimo}</p> </div>
      <div className={styles.dataPubli}> <p className={styles.label}>Nome do livro:</p> <p>{nomeLivro}</p></div>
      <div className={styles.dataPubli}> <p className={styles.label}>Número de Série:</p> <p>{numeroSerie}</p></div>
      <div className={styles.dataPubli}> <p className={styles.label}>Status:</p> <p>{status}</p></div>
      </div>
      </div>

        <Informacoes Info={"Informações do Aluno"} open = {open}/>
        <ConteudoInfo NomeInfo={"Nome do Aluno"} Conteudo={"Nome completo do aluno"} open = {open}/>




        

    </div>
  );
}


export default Dropdown;
