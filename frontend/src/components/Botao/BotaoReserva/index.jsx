import styles from './index.module.scss';
import React from 'react';
import { useAuth } from '../../../context/AuthContext';
import api from '../../../services/api';

const BotaoReserva = ({ texto, idLivro }) => {
  const { token, user } = useAuth();

  const handleSubmit = async () => {
    try {
      const response = await api.post(
        '/emprestimos',
        {
          liv_id: idLivro,
          usu_id: user, // já é o ID do usuário
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log('Empréstimo criado com sucesso:', response.data);
      // Aqui você pode exibir um toast ou feedback para o usuário
    } catch (error) {
      console.error('Erro ao fazer empréstimo do livro:', error);
    }
  };

  return (
    <div>
      <button onClick={handleSubmit} type="button" className={styles.btn}>
        {texto}
      </button>
    </div>
  );
};

export default BotaoReserva;
