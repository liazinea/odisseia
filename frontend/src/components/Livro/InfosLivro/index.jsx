import { useEffect, useState } from 'react';
import styles from './index.module.scss';
import CapaLivro from '../CapaLivro';
import TituloDescricao from '../TituloDescricao';
import Sinopse from '../Sinopse';
import BotaoGenero from '../../Botao/BotaoGenero';
import BotaoQtd from '../../Botao/BotaoQtd';
import useLivros from '../../../hooks/useLivros';

const InfosLivro = ({ livro }) => {


  const { buscaQuantidadePorNome } = useLivros();
  const [quantidade, setQuantidade] = useState(0);

  useEffect(() => {
    if (livro?.nome) {
      buscaQuantidadePorNome(livro.nome).then(setQuantidade);
    }
  }, [livro?.nome]);

  return (
    <div className={styles.card}>
      <div className={styles.topo}>
        <div className={styles.capaContainer}>
          <CapaLivro imagemCapa={livro.capa} classificacao={livro.classificacaoIndicativa} />
        </div>

        <div className={styles.textos}>
          <div className={styles.titulos}>
            <TituloDescricao titulo={livro.nome} autores={livro.autores} />
            <div className={styles.generosTitulo}>
              {livro.generos.map((genero, i) => (
                <BotaoGenero key={i} texto={genero.nome} />
              ))}
            </div>
          </div>
        </div>

        <div className={styles.containerQtd}>
          <div className={styles.qtdWrapper}>
            <BotaoQtd quantidade={quantidade} />
          </div>
        </div>
      </div>
       <div className={styles.generos}>
              {livro.generos.map((genero, i) => (
                <BotaoGenero key={i} texto={genero.nome} />
              ))}
            </div>
      <div className={styles.sinopse}>
        <Sinopse sinopse={livro.sinopse} />
      </div>
    </div>
  );
};

export default InfosLivro;
