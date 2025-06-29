import { useState } from 'react';
import styles from './index.module.scss';

const InputFormAcesso = ({
  type,
  nomeCampo,
  placeholder,
  required,
  register,
  error,
  filledStatus = false
}) => {
  const [filled, setFilled] = useState(filledStatus);

  const handleChange = (e) => {
    setFilled(e.target.value.trim() !== "");
    console.log('oi');
  };

  // Extraindo manualmente as propriedades do register
  const {
    onChange: onChangeRHForm,
    onBlur,
    name,
    ref
  } = register(nomeCampo, {
    required: required ? 'Campo obrigatório' : false,
  });

  return (
    <label className={styles.label}>
      <input
        id={nomeCampo}
        name={name}
        type={type}
        ref={ref}
        className={`${styles.input} ${filled ? styles.filled : ''}`}
        onChange={(e) => {
          handleChange(e);      // Seu próprio controle visual
          onChangeRHForm(e);    // Integração com react-hook-form
        }}
        onBlur={onBlur}
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
