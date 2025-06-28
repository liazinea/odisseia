import React, { useEffect, useState } from 'react';
import styles from './index.module.scss';
import CardLivrosMaisEmprestados from '../../Cards/CardLivrosMaisEmprestados';
import useLivros from '../../../hooks/useLivros';
import Carregando from '../Carregando';

const LivrosMaisEmprestados = () => {
  const { buscaLivrosMaisEmprestados } = useLivros();
  const [livros, setLivros] = useState([]);

  useEffect(() => {
    const fetchLivrosMaisEmprestados = async () => {
      const data = await buscaLivrosMaisEmprestados();
      setLivros(data);
    };
    fetchLivrosMaisEmprestados();
  }, []);

  if (livros.length === 0) {
    return <Carregando />;
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.titulo}>Livros Mais Emprestados</h1>
      <div className={styles.cards_container}>
        {livros.map((livro) => (
          <CardLivrosMaisEmprestados key={livro.liv_id} livro={livro} />
        ))}
      </div>
    </div>
  );
};

export default LivrosMaisEmprestados;
