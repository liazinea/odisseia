import React, { useState } from "react";
import styles from "./index.module.scss";
import Input from "../../Inputs/Input";

const ModalAlterarSenha = ({
  isOpen,
  onClose,
  onSubmit,
  handleSubmit,
  register,
  errors,
  passwordMessage,
  titulo = "Editar senha",
}) => {
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const submitHandler = async (data) => {
    setLoading(true);
    try {
      await onSubmit(data);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.modalOverlay}>
      <form onSubmit={handleSubmit(submitHandler)} className={styles.modalSenha}>
        <h3 className={styles.titulo}>{titulo}</h3>
        {passwordMessage && <p style={{ color: "red" }}>{passwordMessage}</p>}
        <div>
          <label htmlFor="senhaAtual">Senha Atual</label>
          <Input
            type="password"
            nomeCampo="senhaAtual"
            placeholder="Digite sua senha atual"
            {...register("senhaAtual", {
              required: "A senha atual é obrigatória",
            })}
          />
          {errors.senhaAtual && (
            <p style={{ color: "red" }}>{errors.senhaAtual.message}</p>
          )}
        </div>
        <div>
          <label htmlFor="novaSenha">Nova Senha</label>
          <Input
            type="password"
            nomeCampo="novaSenha"
            placeholder="Digite a nova senha"
            {...register("novaSenha", {
              required: "A nova senha é obrigatória",
              minLength: {
                value: 6,
                message: "A nova senha deve ter pelo menos 6 caracteres",
              },
            })}
          />
          {errors.novaSenha && (
            <p style={{ color: "red" }}>{errors.novaSenha.message}</p>
          )}
        </div>
        <div>
          <label htmlFor="confirmarNovaSenha">Confirmar Nova Senha</label>
          <Input
            type="password"
            nomeCampo="confirmarNovaSenha"
            placeholder="Confirme a nova senha"
            {...register("confirmarNovaSenha", {
              required: "Confirme a nova senha",
              validate: (value, formValues) =>
                value === formValues.novaSenha || "As senhas não coincidem",
            })}
          />
          {errors.confirmarNovaSenha && (
            <p style={{ color: "red" }}>{errors.confirmarNovaSenha.message}</p>
          )}
        </div>
        <div className={styles.botoes}>
          <button
            type="submit"
            className={styles.saveButton}
            disabled={loading}
          >
            {loading ? "Salvando..." : "Alterar Senha"}
          </button>
          <button
            onClick={onClose}
            className={styles.closeButton}
            type="button"
            disabled={loading}
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
};

export default ModalAlterarSenha;
