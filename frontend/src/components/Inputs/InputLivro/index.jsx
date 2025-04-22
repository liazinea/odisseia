import { useState } from "react";
import styles from "./index.module.scss";

const InputLivro = ({
  type,
  nomeCampo,
  placeholder,
  required,
  register,
  errors,
  filledStatus = false
}) => {
  const [filled, setFilled] = useState(filledStatus);

  const handleChange = (e) => {
    setFilled(e.target.value.trim() !== "");
  };

  return (
    <div>
      <label className={styles.label}>
        <input
          type={type}
          className={`${styles.input} ${filled ? styles.filled : ""}`}
          id={nomeCampo}
          {...register(nomeCampo, {
            required: required ? "Campo obrigatório" : false,
          })}
          onChange={handleChange}
        />
        <span className={styles.placeholder}>{placeholder}</span>
      </label>
        <p className={styles.error}>{errors && errors[nomeCampo] && (errors[nomeCampo].message)}</p>
    </div>
  );
};

export default InputLivro;
