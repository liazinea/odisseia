import styles from "./index.module.scss";

const Input = ({
  type,
  nomeCampo,
  defaultValue,
  placeholder,
  disabled,
  value,
  onChange,
  keepStyleWhenDisabled = false, // nova prop
  ...props
}) => {
  // Adiciona uma classe extra se o input estiver desabilitado e for para manter o estilo
  const inputClass = [
    styles.input,
    disabled && keepStyleWhenDisabled ? styles.keepStyleWhenDisabled : ""
  ].join(" ");

  return (
    <input
      type={type}
      className={inputClass}
      name={nomeCampo}
      defaultValue={defaultValue}
      id={nomeCampo}
      placeholder={placeholder}
      disabled={disabled}
      value={value}
      onChange={onChange}
      {...props}
    />
  );
};

export default Input;