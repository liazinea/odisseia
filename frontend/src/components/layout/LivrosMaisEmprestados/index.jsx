import React, { useEffect, useState } from 'react';
import styles from './index.module.scss';
import CardLivrosMaisEmprestados from '../../Cards/CardLivrosMaisEmprestados';
import useLivros from '../../../hooks/useLivros';

function getRandomItems(array, n) {
  if (!array) return [];
  const arr = [...array];
  const result = [];
  const min = Math.min(n, arr.length);
  while (result.length < min) {
    const idx = Math.floor(Math.random() * arr.length);
    result.push(arr[idx]);
    arr.splice(idx, 1);
  }
  return result;
}

const LivrosMaisEmprestados = () => {
  const { buscaLivros } = useLivros();
  const [livrosAleatorios, setLivrosAleatorios] = useState([]);

  useEffect(() => {
    const fetchLivros = async () => {
      const data = await buscaLivros();
      setLivrosAleatorios(getRandomItems(data, 3));
    };
    fetchLivros();
  
  }, []);

  return (
    <div className={styles.container}>
      <h1 className={styles.titulo}> Livros Mais Emprestados</h1>
      <div className={styles.cards_container}>
        {livrosAleatorios.map((livro) => (
          <CardLivrosMaisEmprestados key={livro.id} livro={livro} />
        ))}
      </div>
    </div>
  );
}

export default LivrosMaisEmprestados;