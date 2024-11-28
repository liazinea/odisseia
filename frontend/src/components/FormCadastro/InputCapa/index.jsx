import styles from './index.module.scss';
import { FaUpload } from "react-icons/fa6";
import { useState } from "react";

import React from 'react'





const InputCapa = () => {
  const [preview, setPreview] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setPreview(reader.result); // Define o preview com o conteúdo da imagem
      };
      reader.readAsDataURL(file); // Lê o arquivo como URL base64
    }
  };

  return (
    <div className={styles.imageinput}>
      <label htmlFor="fileinput" className={styles.imagelabel}>
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
        className={styles.fileinput}
        id="fileinput"
        accept="image/*"
        onChange={handleFileChange} // Adiciona o evento ao input
      />
    </div>
  );
};

export default InputCapa;