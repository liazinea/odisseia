import React from 'react';
import InfosLivro from '../../components/Livro/InfosLivro';
import InfoAdicionais from '../../components/Livro/InfosAdicionais';
import styles from './index.module.scss';

const InformacoesDetalhadas = () => {
    const livro = {
        imagemCapa: 'https://via.placeholder.com/120x160',
        classificacao: 'Livre',
        titulo: 'Frankenstein',
        subTitulo: 'O Prometeu Moderno',
        autores: [{ id: 1, nome: 'Mary Shelley' }],
        generos: ['Fantasia', 'Aventura', 'Drama', 'Ficção'],
        quantidade: 10,
        sinopse: `O livro narra a história do ousado doutor Victor Frankenstein, cientista que se lança no experimento de retomar a vida de um ser inanimado. Isso resulta na concepção de uma criatura sobre-humana e monstruosa que passa a lhe perseguir, tornando-se um arquétipo de seu próprio criador.`,
        paginas: 328,
        edicao: 1,
        editora: { nome: 'Companhia das Letras' },
        dataPublicacao: '1949-06-08',
      };
    

  return (
    <div className={styles.container}>
     <div className={styles['part-azul']}>
      <InfosLivro livro={livro} />
      </div>
      <div className={styles['part-laranja']}>
      <div className={styles.infoAdicionalWrapper}>
        <InfoAdicionais
          paginas={livro.paginas}
          edicao={livro.edicao}
          editora={livro.editora}
          data={livro.dataPublicacao}
        />
        </div>
      </div>
    </div>
  );
};

export default InformacoesDetalhadas;

