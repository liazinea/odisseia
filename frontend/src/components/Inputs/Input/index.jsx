import styles from "./index.module.scss";

const Input = ({
  type,
  nomeCampo,
  defaultValue,
  placeholder,
  disabled,
  value,
  onChange,
  ...props
}) => {
  return (
    <input
      type={type}
      className={styles.input}
      name={nomeCampo}
      defaultValue={defaultValue}
      id={nomeCampo}
      placeholder={placeholder}
      disabled={disabled}
      {...props}
    />
  );
};

export default Input;
