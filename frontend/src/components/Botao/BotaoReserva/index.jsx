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
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const response = await api.post(
        '/emprestimos',
        {
          liv_id: idLivro,
          usu_id: user,
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
    } catch (error) {
      const mensagemErro = error.response?.data?.message || "Erro ao fazer empréstimo do livro.";
      setMessage(mensagemErro);
      setModalMensagemAberto(true);
      console.error('Erro ao fazer empréstimo do livro:', error);
    } finally {
      setLoading(false);
    }
  };


  return (
    <div>
      <button onClick={handleSubmit} type="button" className={styles.btn} disabled={loading}>
        {loading ? 'Aguarde...' : texto}
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
