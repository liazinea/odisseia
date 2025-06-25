import React from "react";
import styles from "./index.module.scss";

const ModalRenovacao = ({
  isOpen,
  onClose,
  onConfirm,
  titulo,
  mensagem,
  nome,
  confirmLabel = "Confirmar",
  cancelLabel = "Cancelar",
}) => {
  if (!isOpen) return null;

  return (
    <div className={styles.modal}>
      <div className={styles.modalRenovacao}> {/* Use uma classe própria */}
        <h3 className={styles.titulo}>{titulo}</h3>
        <p className={styles.mensagem}>
          {mensagem}
          {nome && <span className={styles.nome}> "{nome}"</span>}
        </p>
        <div className={styles.botoes}>
          <button onClick={onConfirm} className={styles.confirmButton}>
            {confirmLabel}
          </button>
          <button onClick={onClose} className={styles.cancelButton}>
            {cancelLabel}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalRenovacao;
