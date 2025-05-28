import React from "react";
import styles from "./index.module.scss";
import api from "../../../services/api";
import { useAuth } from "../../../context/AuthContext";

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
  status
}) => {
  if (!isOpen) return null;

  const { token } = useAuth()

  const handleFunction = async (id) => {
    if (status == 2) {
      try {
        const response = await api.patch(
          `/renova-emprestimo/${id}`,
          {
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log(response)
      } catch (error) {
        console.error(error)
      }
    } else if (status == 1) {
      try {
        const response = await api.patch(
          `/emprestimos/${id}`,
          {
            valor: 0
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        console.log(response)
      } catch (error) {
        console.error(error)
      }
    }
  }

  return (
    <div className={styles.modal}>
      <div className={styles.modalExcluir}>
        <h3 className={styles.titulo}>{titulo}</h3>
        <p className={styles.mensagem}>
          {mensagem}
          {nome && <span className={styles.nome}> "{nome}"</span>}
        </p>
        <div className={styles.botoes}>
          <button onClick={() => handleFunction(id)} className={styles.deleteButton}>
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