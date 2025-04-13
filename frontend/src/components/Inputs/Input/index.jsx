import styles from "./index.module.scss";

const Input = ({
  type,
  nomeCampo,
  defaultValue,
  placeholder,
  required,
  disabled,
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
      onChange={(e) => onChange && onChange(e.target.value)}
    />
  );
};

export default Input;
