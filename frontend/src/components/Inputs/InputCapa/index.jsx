import styles from './index.module.scss';
import { FaUpload } from "react-icons/fa6";
import { useState } from 'react';

const InputCapa = ({ campo, errors, errorsApi, register, required = true }) => {
  const [preview, setPreview] = useState(null);

  const handlePreview = (event) => {
    const file = event.target.files[0];
    console.log(file)
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreview(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className={styles.imageinput}>
      <label htmlFor={campo} className={styles.imagelabel}>
        <span>Capa do livro</span>

        <div className={styles.imageplaceholder}>
          {preview ? (
            <img
              src={preview}
              alt="Preview da capa do livro"
              className={styles.previewImage}
            />
          ) : (
            <FaUpload className={styles.icon} />
          )}
        </div>
      </label>

      <input
        type="file"
        id={campo}
        name={campo}
        accept="image/*"
        className={styles.fileinput}
        {...register(campo, {
          required: required ? "Campo obrigatório" : false,
          onChange: (e) => handlePreview(e),
        })}
      />
        <p className={styles.error}>{errors?.[campo] && (errors[campo]?.message)}</p>
    </div>
  );
};

export default InputCapa;
