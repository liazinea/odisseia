import styles from './index.module.scss';
import { MdOutlineEdit } from "react-icons/md";
import { IoMdTrash } from "react-icons/io";
import { formatDate } from '../../utils/formateDate';
import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import { api } from '../../config/api';

Modal.setAppElement('#root');

const ListaLivros = ({ livro, buscaLivro }) => {
  const [livroSelecionado, setLivroSelecionado] = useState(null);
  const [modalAberto, setModalAberto] = useState(false);

  const abreModal = (livroRelacionado) => {
    setLivroSelecionado(livroRelacionado);
    setModalAberto(true);
  };

  const fechaModal = () => {
    setModalAberto(false);
    setLivroSelecionado(null);
  };

  const deletarLivro = async (livroDeletado) => {
    try {
      const response = await api.delete(`/livros/${livroDeletado.id}`);
      console.log('Livro excluído com sucesso:', response.data);
      fechaModal();
    } catch (error) {
      console.error('Erro ao excluir o livro:', error);
    }
  };

  useEffect(() => {
    buscaLivro()
  }, [modalAberto])

  return (
    <div className={styles.principal}>
      <div className={styles.body}>
        <div className={styles.data}>{formatDate(livro.dataPubli)}</div>
        <div className={styles.capa}>
          <img src={`http://127.0.0.1:8000/storage/${livro.capa}`} className={styles.imagem} alt="Capa do Livro" />
        </div>
        <div className={styles.titulo}>{livro.nome}</div>
        <div className={styles.num}>{livro.numRegistro}</div>
        <div className={styles.opcoes}>
          <MdOutlineEdit size={30} />
          <div className={styles.excluir} onClick={() => abreModal(livro)}>
          <IoMdTrash size={30} color="#C00F0C" />
           
          </div>

          <Modal
              isOpen={modalAberto}
              onRequestClose={fechaModal}
              contentLabel="Confirmar Exclusão"
              style={{
                content: {
                  width: '400px',
                  margin: 'auto',
                  padding: '20px',
                  borderRadius: '10px',
                  textAlign: 'center',
                },
              }}
            >
              <h2>Confirmação</h2>
              {livroSelecionado && (
                <p>
                  Tem certeza de que deseja excluir o livro "<b>{livroSelecionado.nome}</b>"?
                </p>
              )}
              <div>
                <button
                  style={{
                    marginRight: '10px',
                    padding: '10px 20px',
                    backgroundColor: '#d9534f',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '5px',
                    cursor: 'pointer',
                  }}
                  onClick={() => deletarLivro(livroSelecionado)}
                >
                  Sim, Excluir
                </button>
                <button
                  style={{
                    padding: '10px 20px',
                    backgroundColor: '#5bc0de',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '5px',
                    cursor: 'pointer',
                  }}
                  onClick={fechaModal}
                >
                  Cancelar
                </button>
              </div>
            </Modal>
        </div>
      </div>
    </div>
  );
};
export default ListaLivros;
