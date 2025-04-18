import { useState } from "react";
import styles from "./index.module.scss";

const InputLivro = ({
  props,
  type,
  nomeCampo,
  placeholder,
  required,
  errors,
  errorsApi,
}) => {
  const isRequired = required;
  const [filled, setFilled] = useState(false);

  const handleChange = (e) => {
    setFilled(e.target.value.trim() !== "");
    if (onChange) onChange(e);
  };
  return (
    <label className={styles.label}>
      <input
        type={type}
        className={`${styles.input} ${filled ? styles.filled : null}`}
        name={nomeCampo}
        id={nomeCampo}
        onChange={handleChange}
        {...(isRequired ? { required: true } : {})}
        {...props}
      />
      <span className={styles.placeholder}>{placeholder}</span>
    </label>
  );
};

export default InputLivro;
