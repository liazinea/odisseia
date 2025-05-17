import Modal from "react-modal";
import FormModal from "../../Form/FormModal";
import styles from "./index.module.scss";
import { IoClose } from "react-icons/io5";
import { useState, useEffect } from "react";


const ModalEditarLivro = ({
  modalEditarAberto,
  closeModal,
  showModal,
  formModal,
  livro,
}) => {

  return (
    <Modal
      isOpen={modalEditarAberto}
      onRequestClose={closeModal}
      contentLabel="Confirmar Exclusão"
      shouldCloseOnOverlayClick={false}
      style={{
        content: {
          backgroundColor: "#002A3D",
          color: "#FFC09E",
          width: "70vw",
          margin: "auto",
          padding: "20px",
          borderRadius: "10px",
          textAlign: "center",
          overflowY: "auto",
          overflowX: "hidden",
          maxHeight: "80vh",
        },
      }}
    >
      <div className={`${styles.modal} ${showModal ? styles.exibir : ""}`}>
        <div className={styles.conteudoModal}>
          <div className={styles.header}>
            <h2>Editar Livro</h2>
            <div className={styles.close} onClick={closeModal}>
              <IoClose />
            </div>
          </div>
          <FormModal
            modalEditarAberto={modalEditarAberto}
            livro={livro}
            closeModal={closeModal}
          />
        </div>
      </div>
    </Modal>
  );
};

export default ModalEditarLivro;
