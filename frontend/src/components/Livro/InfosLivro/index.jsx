import React from 'react';
import styles from './index.module.scss';
import CapaLivro from '../CapaLivro';
import TituloDescricao from '../TituloDescricao';
import Sinopse from '../Sinopse';
import BotaoGenero from '../../Botao/BotaoGenero';
import BotaoQtd from '../../Botao/BotaoQtd';

const InfosLivro = ({ livro }) => {
  return (
    <div className={styles.card}>
      <div className={styles.topo}>
        <CapaLivro imagemCapa={livro.imagemCapa} classificacao={livro.classificacao} />

        <div className={styles.textos}>
          <div className={styles.qtdWrapper}>
            <BotaoQtd quantidade={livro.quantidade} />
          </div>

          <TituloDescricao titulo={livro.titulo} 
                           subTitulo={livro.subTitulo} 
                           autores={livro.autores} />

          <div className={styles.generos}>
            {livro.generos.map((genero, i) => (
              <BotaoGenero key={i} texto={genero} />
            ))}
          </div>
        </div>

      </div>

      <div className={styles.sinopse}>
        <Sinopse sinopse={livro.sinopse} />
      </div>
    </div>
  );
};

export default InfosLivro;
