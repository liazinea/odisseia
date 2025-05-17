import React from "react";
import styles from "./index.module.scss";
import Input from "../../Inputs/Input";

const ModalConfirmarSenha = ({
  isOpen,
  onClose,
  onSubmit,
  handleSubmit,
  register,
  errors,
  password,
  setPassword,
  mensagem = "Por favor, digite sua senha:",
  titulo = "Confirmar Exclusão",
  passwordMessage,
}) => {
  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay}>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.modalSenha}>
        <h3 className={styles.titulo}>{titulo}</h3>
        <p className={styles.mensagem}>{mensagem}</p>
        {passwordMessage && <p style={{ color: "red" }}>{passwordMessage}</p>}
        <div>
          <label htmlFor="senha">Senha</label>
            <Input
            type="password"
            nomeCampo="password"
            placeholder="Digite sua senha"
            {...register("password", {
                required: "A senha é obrigatória",
            })}
            />
          {errors.password && (
            <p style={{ color: "red" }}>{errors.password.message}</p>
          )}
        </div>
        <div className={styles.botoes}>
          <button type="submit" className={styles.saveButton}>
            Confirmar
          </button>
          <button onClick={onClose} className={styles.closeButton} type="button">
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
};

export default ModalConfirmarSenha;