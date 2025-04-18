import styles from './index.module.scss';
import { FaUpload } from "react-icons/fa6";
import { useState } from 'react';


const InputCapa = ({campo, errors, errorsApi, register}) => {
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
        id={campo}
        accept='image/*'
        onChange= {handleFileChange}
      />
    </div>
  );
};

export default InputCapa;