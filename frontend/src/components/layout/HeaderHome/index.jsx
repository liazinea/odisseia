import React from 'react';
import styles from './index.module.scss';
import BarraPesquisa from './BarraPesquisa';

const HeaderHome = () => {
  return (
    <div className={styles.principal}>
      <div className={styles.conteudo}>
        <h1 className={styles.titulo}>Acervo Digital</h1>
        <p className={styles.subtitulo}>Sala de leitura E.E. Ernesto Quissak</p>
        <p className={styles.paragrafo}>Navegue pelos livros disponíveis na biblioteca!</p>
        <div className={styles.alinha}>
          <BarraPesquisa placeholder={`Pesquise por autor, nome do livro ou gênero`}/>
        </div>

      </div>
    </div>
  );
}

export default HeaderHome