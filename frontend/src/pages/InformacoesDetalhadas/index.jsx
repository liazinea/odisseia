import React from 'react';
import InfosLivro from '../../components/Livro/InfosLivro';
import InfoAdicionais from '../../components/Livro/InfosAdicionais';
import styles from './index.module.scss';
import HeaderPagina from '../../components/layout/HeaderPagina';
import { useParams } from 'react-router-dom';
import useLivro from '../../hooks/useLivro';
import { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import api from '../../services/api';


const InformacoesDetalhadas = () => {
  const { id } = useParams();
  const [livro, setLivro] = useState(null)
  const { buscaLivro } = useLivro(id)
  const { token, userType } = useAuth()
  useEffect(() => {
    if (!token || userType != 1) {
      navigate('/')
    }
  }, [token])

  useEffect(() => {
    // Função para buscar o livro na API
    const carregaLivro = async () => {
      try {
        const response = await api.get(`/livros/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`, // Inclui o token no header
          },
        });
        setLivro(response.data.livro); // Armazena os dados do livro no estado
      } catch (error) {
        console.error('Erro ao carregar livro:', error);
      }
    };

    if (id) {
      carregaLivro(); // Chama a função apenas se o ID for válido
    }
  }, [livro]); // A dependênc

  
  if (!livro) {
    return <div>Carregando...</div>; // Exibe um texto ou loader enquanto o livro está sendo carregado
  }

  return (
    <div>
      <HeaderPagina titulo={'Informações Detalhadas'} />
      <div className={styles.container}>
        <div className={styles.parteLaranja}>
          <InfosLivro livro={livro} />
        </div>
        <div className={styles.parteAzul}>
          <div className={styles.infoAdicionalWrapper}>
            <InfoAdicionais
              paginas={livro.qtdPaginas}
              edicao={livro.edicao}
              editora={livro.editora} 
              data={livro.dataPubli}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default InformacoesDetalhadas;

