import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import useLivros from '../../hooks/useLivros'; // ajuste o caminho se necessário
import CardLivrosMaisEmprestados from '../../components/Cards/CardLivrosMaisEmprestados';
import styles from './index.module.scss';
import HeaderHome from '../../components/layout/HeaderHome';

const PaginaPesquisa = () => {
  const { termo } = useParams();
  const { buscaLivros } = useLivros();
  const [resultados, setResultados] = useState([]);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    const fetchLivros = async () => {
      setCarregando(true);
      const todosLivros = await buscaLivros();
      const termoNormalizado = termo.toLowerCase();

      const filtrados = todosLivros.filter((livro) =>
        livro.titulo.toLowerCase().includes(termoNormalizado)
      );

      setResultados(filtrados);
      setCarregando(false);
    };

    fetchLivros();
  }, [termo, buscaLivros]);

  return (
    <div>
<HeaderHome/>
      <h3>Resultados para: "{termo}"</h3>
      {carregando ? (
        <p>Carregando...</p>
      ) : resultados.length > 0 ? (
        <div className={styles.container}>

          {resultados.map((livro) => (
            <div className={styles.cards}>
            <CardLivrosMaisEmprestados key={livro.id} livro={livro} />
            </div>
          ))}
        </div>
        
      ) : (
        <p>Nenhum livro encontrado.</p>
      )}
    </div>
  );
};

export default PaginaPesquisa;
