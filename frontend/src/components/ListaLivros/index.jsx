import styles from "./index.module.scss";
import { MdOutlineEdit } from "react-icons/md";
import { IoMdTrash } from "react-icons/io";
import { formatDate } from "../../utils/formateDate";
import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import { api } from "../../config/api";
import Button from "../Button";
import { useNavigate } from "react-router-dom";

Modal.setAppElement("#root");

const ListaLivros = ({ livro, buscaLivro }) => {
  const [livroSelecionado, setLivroSelecionado] = useState(null);
  const [modalAberto, setModalAberto] = useState(false);
  const navigate = useNavigate();

  /*const onClickDiv = (id) =>{
    navigate(`/livros/${id}`)
  }*/

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
      console.log("Livro excluído com sucesso:", response.data);
      fechaModal();
    } catch (error) {
      console.error("Erro ao excluir o livro:", error);
    }
  };

  useEffect(() => {
    buscaLivro();
  }, [modalAberto]);

  return (
    <div className={styles.principal}>
      <div className={styles.body}>
        <div className={styles.data}>{formatDate(livro.dataPubli)}</div>
        <div className={styles.capa}>
          <img
            src={`http://127.0.0.1:8000/storage/${livro.capa}`}
            className={styles.imagem}
            alt="Capa do Livro"
          />
        </div>
        <div className={styles.titulo} onClick={() => navigate(`/livros/${livro.id}`)}>{livro.nome}</div>
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
                width: "90%", // Adaptação para dispositivos menores
                maxWidth: "400px", // Limita a largura máxima
                margin: "auto",
                padding: "20px",
                borderRadius: "12px",
                textAlign: "center",
                boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)", // Sombra mais destacada
                backgroundColor: "#ffffff", // Fundo branco
                color: "#333", // Texto escuro para contraste
                maxHeight: "30vh", // Limita a altura do modal para 90% da altura da viewport
                overflowY: "auto", // Adiciona rolagem se o conteúdo ultrapassar a altura
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
              },
              overlay: {
                backgroundColor: "rgba(0, 0, 0, 0.6)", // Fundo mais escuro para foco no modal
                display: "flex", // Centralização
                alignItems: "center",
                justifyContent: "center",
                zIndex: "1000", // Garantir prioridade sobre outros elementos
              },
            }}
          >
            <h2
              style={{
                fontSize: "1.5rem",
                marginBottom: "15px",
                color: "#333",
              }}
            >
              Confirmação
            </h2>
            {livroSelecionado && (
              <p
                style={{
                  marginBottom: "20px",
                  lineHeight: "1.6",
                  color: "#555",
                }}
              >
                Tem certeza de que deseja excluir o livro "
                <b>{livroSelecionado.nome}</b>"?
              </p>
            )}
            <div
              style={{
                display: "flex",
                gap: "10px", // Espaço entre os botões
                justifyContent: "center",
                marginTop: "20px",
              }}
            >
              <Button
                variant="danger"
                size="medium"
                onClick={() => deletarLivro(livroSelecionado)}
              >
                Sim, excluir
              </Button>
              <Button variant="tertiary" size="medium" onClick={fechaModal}>
                Cancelar
              </Button>
            </div>
          </Modal>
        </div>
      </div>
    </div>
  );
};
export default ListaLivros;
