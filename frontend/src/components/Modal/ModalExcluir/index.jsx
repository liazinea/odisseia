import React, { useState } from "react";
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
  id,
  status,
}) => {
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleConfirm = async () => {
    setLoading(true);
    try {
      await onConfirm(); // Executa a função passada por props
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.modal}>
      <div className={styles.modalExcluir}>
        <h3 className={styles.titulo}>{titulo}</h3>
        <p className={styles.mensagem}>
          {mensagem}
          {nome && <span className={styles.nome}> "{nome}"</span>}
        </p>
        <div className={styles.botoes}>
          <button
            onClick={handleConfirm}
            className={styles.deleteButton}
            disabled={loading}
          >
            {loading ? "Aguarde..." : confirmLabel}
          </button>
          <button
            onClick={onClose}
            className={styles.closeButton}
            disabled={loading}
          >
            {cancelLabel}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalExcluir;
