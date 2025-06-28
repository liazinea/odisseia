import Modal from "react-modal";
import styles from "./index.module.scss";
import { IoClose } from "react-icons/io5";

const ModalMensagem = ({ mensagemModal, closeModal, modalAberto }) => {
  return (
    <Modal
      isOpen={modalAberto}
      onRequestClose={closeModal}
      contentLabel="Mensagem"
      shouldCloseOnOverlayClick={false}
      style={{
        content: {
          width: "90%",
          maxWidth: "400px",
          margin: "auto",
          padding: "0",
          borderRadius: "12px",
          backgroundColor: "#DDC1A7",
          maxHeight: "320px",   // Limita a altura total do modal
          overflow: "hidden",   // Oculta excesso para o modal
          display: "flex",
          flexDirection: "column",
        },
        overlay: {
          backgroundColor: "rgba(0, 0, 0, 0.3)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: "1000",
        },
      }}
    >
      <div className={styles.modal}>
        <div className={styles.header}>
          <div className={styles.icon} onClick={closeModal}>
            <IoClose />
          </div>
        </div>
        <div className={styles.body}>
          <h2 className={styles.titulo}>{mensagemModal}</h2>
        </div>
      </div>
    </Modal>
  );
};

export default ModalMensagem;
