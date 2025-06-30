import styles from './index.module.scss';
import React from 'react';
import { useAuth } from '../../../context/AuthContext';
import api from '../../../services/api';
import { useState } from 'react';
import ModalMensagem from '../../Modal/ModalMensagem';

const BotaoReserva = ({ texto, idLivro }) => {
  const { token, user } = useAuth();

  const [modalMensagemAberto, setModalMensagemAberto] = useState(false);
    const [message, setMessage] = useState(null);

  const handleSubmit = async () => {
    console.log('uar')
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
      console.log(response.data)
      setMessage("Reserva cadastrada com sucesso!");
      setModalMensagemAberto(true);
      console.log('Empréstimo criado com sucesso:', response.data);
      // Aqui você pode exibir um toast ou feedback para o usuário
    } catch (error) {
      setMessage(error.response.data.message);
      setModalMensagemAberto(true);
      console.error('Erro ao fazer empréstimo do livro:', error);
    }
  };

  return (
    <div>
      <button onClick={handleSubmit} type="button" className={styles.btn}>
        {texto}
      </button>
      <ModalMensagem
        mensagemModal={message}
        modalAberto={modalMensagemAberto}
        closeModal={() => setModalMensagemAberto(false)}
      />
    </div>
  );
};

export default BotaoReserva;
