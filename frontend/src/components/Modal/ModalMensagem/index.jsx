
import Modal from "react-modal";
import styles from "./index.module.scss";
import { IoClose } from "react-icons/io5";

Modal.setAppElement("#root");
const ModalMensagem = ({ mensagemModal, closeModal, modalAberto }) => {
  return (
    <Modal
      isOpen={modalAberto}
      onRequestClose={closeModal}
      contentLabel="Mensagem"
      shouldCloseOnOverlayClick={false}
      className={styles.modalContent}
      overlayClassName={styles.modalOverlay}
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
