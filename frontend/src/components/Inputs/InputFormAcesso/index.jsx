import { useState } from 'react';
import styles from './index.module.scss';

const InputFormAcesso = ({ type, nomeCampo, placeholder, required, register, error }) => {
  const [filled, setFilled] = useState(false);

  const handleChange = (e) => {
    setFilled(e.target.value !== '');
  };

  return (
    <label className={styles.label}>
      <input
        id={nomeCampo}
        name={nomeCampo}
        type={type}
        className={`${styles.input} ${filled ? styles.filled : ''}`}
        onChange={handleChange}
        {...register(nomeCampo, {
          required: required ? 'Campo obrigatório' : false,
        })}
      />
      <span className={styles.placeholder}>{placeholder}</span>

      {error && (
        <span style={{ color: 'red', fontSize: '0.85rem', marginTop: '5px', display: 'block' }}>
          {error.message}
        </span>
      )}
    </label>
  );
};

export default InputFormAcesso;
