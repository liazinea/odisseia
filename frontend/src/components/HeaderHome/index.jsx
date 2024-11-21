import React from 'react';
import styles from './index.module.scss';
import { FaSearch } from 'react-icons/fa';

const HeaderHome = () => {
  return (
    <div className={styles.principal}>
      <div className={styles.conteudo}>
        <h1 className={styles.titulo}>Acervo Digital</h1>
        <p className={styles.subtitulo}>Biblioteca E.E. Ernesto Quissak</p>
        <p className={styles.paragrafo}>Navegue pelos livros dsponíveis na biblioteca!</p>
        <div className={styles.alinha}>
          <div className={styles.barra}>
            <input type='text' placeholder='Pesquise por autor, nome do livro ou gênero' className={styles.pesquisa}/>
            <FaSearch className={styles.icon}/>
          </div>
        </div>

      </div>
    </div>
  );
}

export default HeaderHome