import React from "react";
import styles from "./index.module.scss";

const ModalExcluir = ({
  isOpen,
  onClose,
  onConfirm,
  titulo,
  mensagem,
  nome,
  confirmLabel = "Excluir",
  cancelLabel = "Cancelar",
}) => {
  if (!isOpen) return null;

  return (
    <div className={styles.modal}>
      <div className={styles.modalExcluir}>
        <h3 className={styles.titulo}>{titulo}</h3>
        <p className={styles.mensagem}>
          {mensagem}
          {nome && <span className={styles.nome}> "{nome}"</span>}
        </p>
        <div className={styles.botoes}>
          <button onClick={onConfirm} className={styles.deleteButton}>
            {confirmLabel}
          </button>
          <button onClick={onClose} className={styles.closeButton}>
            {cancelLabel}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalExcluir;