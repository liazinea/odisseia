import styles from "./index.module.scss";

const Input = ({
  type,
  nomeCampo,
  defaultValue,
  placeholder,
  required,
  disabled,
  value,
  onChange,
}) => {
  return (
    <input
      type={type}
      className={styles.input}
      name={nomeCampo}
      defaultValue={defaultValue}
      id={nomeCampo}
      placeholder={placeholder}
      required={required}
      disabled={disabled}
      value={value} // Adicionado para controlar o valor do input
      onChange={(e) => onChange && onChange(e.target.value)} // Corrigido para passar o valor
    />
  );
};

export default Input;
