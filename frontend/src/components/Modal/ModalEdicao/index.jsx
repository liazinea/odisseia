import React, { useState } from "react";
import styles from "./index.module.scss";
import Input from "../../Inputs/Input";

const ModalEdicao = ({
  isOpen,
  onClose,
  onSubmit, // função async passada pelo pai
  handleSubmit, // hook-form
  register,
  errors,
  titulo,
  labelAtual,
  valorAtual,
  labelNovo,
  nomeCampoNovo,
  valorNovo,
  disabledNovo = false,
  registerOptions = {},
}) => {
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen) return null;

  const handleInternalSubmit = async (data) => {
    setIsLoading(true);
    try {
      await onSubmit(data); // executa a função do componente pai
    } catch (error) {
      console.error("Erro ao submeter:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.modal}>
      <form
        onSubmit={handleSubmit(handleInternalSubmit)}
        className={styles.modalEdicao}
      >
        <h3 className={styles.titulo}>{titulo}</h3>
        <div>
          <label>{labelAtual}</label>
          <Input type="text" value={valorAtual} disabled />
        </div>
        <div>
          <label>{labelNovo}</label>
          <Input
            type="text"
            defaultValue={valorNovo}
            disabled={disabledNovo}
            {...register(nomeCampoNovo, registerOptions)}
          />
          {errors && errors[nomeCampoNovo] && (
            <p style={{ color: "red" }}>{errors[nomeCampoNovo].message}</p>
          )}
        </div>
        <div className={styles.botoes}>
          <button
            type="submit"
            className={styles.saveButton}
            disabled={isLoading}
          >
            {isLoading ? "Salvando..." : "Salvar"}
          </button>
          <button
            onClick={onClose}
            type="button"
            className={styles.closeButton}
            disabled={isLoading}
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
};

export default ModalEdicao;
