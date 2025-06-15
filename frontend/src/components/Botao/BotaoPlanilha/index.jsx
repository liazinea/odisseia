import styles from "./index.module.scss";

const BotaoPlanilha = ({
  campo,
  register,
  required = true,
}) => {
  return (
    <div className={styles.principal}>
      <label className={styles.botao}>
        Escolher planilha
        <input
          className={styles.input}
          id={campo}
          name={campo}
          {...register(campo, {
            required: required ? "Campo obrigatório" : false,
          })}
          type="file"
          accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
        />
      </label>
    </div>
  );
};

export default BotaoPlanilha;
