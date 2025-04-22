import Modal from "react-modal";
import styles from "./index.module.scss";
import { IoClose } from "react-icons/io5";

const ModalMensagem = ({
  mensagemModal,
  closeModal,
  modalAberto,
}) => {
  return (
    <Modal
      isOpen={modalAberto}
      onRequestClose={closeModal}
      contentLabel="Confirmar Exclusão"
      shouldCloseOnOverlayClick={false}
      style={{
        content: {
          width: "90%", // Adaptação para dispositivos menores
          maxWidth: "400px", // Limita a largura máxima
          margin: "auto",
          padding: "20px",
          borderRadius: "12px",
          textAlign: "center",
          backgroundColor: "#DDC1A7", // Fundo branco
          maxHeight: "40vh", // Limita a altura do modal para 90% da altura da viewport
          overflowY: "auto", // Adiciona rolagem se o conteúdo ultrapassar a altura
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        },
        overlay: {
          backgroundColor: "rgba(0, 0, 0, 0.3)", // Fundo mais escuro para foco no modal
          display: "flex", // Centralização
          alignItems: "center",
          justifyContent: "center",
          zIndex: "1000", // Garantir prioridade sobre outros elementos
        },
      }}
    >
      <div className={`${styles.modal}`}>
        <div className={styles.conteudoModal}>
          <div className={styles.close} onClick={closeModal}>
            <div className={styles.icon}>
            <IoClose />
            </div>
          </div>
          <div className={styles.header}>
            <h2 className={styles.titulo}>{mensagemModal}</h2>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default ModalMensagem;
