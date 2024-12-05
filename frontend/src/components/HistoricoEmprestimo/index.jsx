import React from 'react'
import styles from './index.module.scss';

import PesquisaEmprestimo from './PesquisaEmprestimo';
import BotaoFiltra from './BotaoFiltra';
import TituloFiltro from './TituloFiltro';
import Dropdown from './Dropdown';



const HistoricoEmprestimo = () => {
  return (
    <div>
      <div className={styles.fundo}>
        <div className={styles.pesquisa}>
          <PesquisaEmprestimo/>
        </div>
        <div className={styles.filtro}>
          
        <TituloFiltro/>
        <BotaoFiltra textoBotao={"Todos"}/>
        <BotaoFiltra textoBotao={"Reservados"}/>
        <BotaoFiltra textoBotao={"Emprestados"}/>
        <BotaoFiltra textoBotao={"Devolvidos"}/>
        <BotaoFiltra textoBotao={"Cancelados"}/>
        </div>

       <div className={styles.dropdown}>
       
        <Dropdown  dataPubli={"22/07/2002"} idEmprestimo={"0009"} nomeLivro={"Harry Potter"} numeroSerie={"9093203 2093202"} status={" reservado"}/>
       
        </div>

      </div>
      
    </div>
  )
}

export default HistoricoEmprestimo