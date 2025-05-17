import React from "react";
import styles from "./index.module.scss";
import Input from "../../Inputs/Input";

const ModalEdicao = ({
  isOpen,
  onClose,
  onSubmit,
  handleSubmit,
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
  if (!isOpen) return null;

  return (
    <div className={styles.modal}>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.modalEdicao}>
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
          <button type="submit" className={styles.saveButton}>
            Salvar
          </button>
          <button onClick={onClose} type="button" className={styles.closeButton}>
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
};

export default ModalEdicao;