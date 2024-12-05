import styles from './index.module.scss';
import { FaUpload } from "react-icons/fa6";
import { useState } from "react";

const InputCapa = ({ register, campo, errors, errorsApi }) => {
  const [preview, setPreview] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreview(e.target.result)
      };
      reader.readAsDataURL(file)
    }
  };

  return (
    <div className={styles.imageinput}>
      <label htmlFor={campo} className={styles.imagelabel}>
        <span>Capa do livro</span>
        {errors?.[campo] && <span className={styles.erro}>{errors[campo].message}</span>}
        {
          typeof errorsApi == 'string' ? (
            <span className={styles.erro}>{errorsApi}</span>
          ) : (
            errorsApi && Array.isArray(errorsApi) && errorsApi.map((erroApi) => (
              <span className={styles.erro} key={erroApi}>
                {erroApi}
              </span>
            ))
          )
        }
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
        {...register(campo, {
          required: "*Este campo é obrigatório",
          onChange: handleFileChange,
        })}
        type="file"
        className={styles.fileinput}
        id={campo}
        accept='image/*'
      />
    </div>
  );
};

export default InputCapa;
