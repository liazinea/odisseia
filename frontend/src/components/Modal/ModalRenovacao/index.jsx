import React, { useState } from "react";
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
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleConfirm = async () => {
    setLoading(true);
    try {
      await onConfirm(); // Executa a função passada como prop
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.modal}>
      <div className={styles.modalRenovacao}>
        <h3 className={styles.titulo}>{titulo}</h3>
        <p className={styles.mensagem}>
          {mensagem}
          {nome && <span className={styles.nome}> "{nome}"</span>}
        </p>
        <div className={styles.botoes}>
          <button
            onClick={handleConfirm}
            className={styles.confirmButton}
            disabled={loading}
          >
            {loading ? "Aguarde..." : confirmLabel}
          </button>
          <button
            onClick={onClose}
            className={styles.cancelButton}
            disabled={loading}
          >
            {cancelLabel}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalRenovacao;
