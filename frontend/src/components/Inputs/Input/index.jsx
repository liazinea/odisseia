import styles from "./index.module.scss";

const Input = ({ type, nomeCampo, placeholder, required, onChange }) => {
  return (
    <input
      type={type}
      className={styles.input}
      name={nomeCampo}
      id={nomeCampo}
      placeholder={placeholder}
      required={required}
      onChange={(e) => onChange && onChange(e.target.value)}
    />
  );
};

export default Input;
