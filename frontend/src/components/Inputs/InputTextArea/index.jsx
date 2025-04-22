import {useState} from 'react'
import styles from './index.module.scss'

const InputTextArea = ({nomeCampo, placeholder, required, errors, errorsApi, register, filledStatus=false}) => {
    const isRequired = required;
      const [filled, setFilled] = useState(filledStatus);

  return (
    <div>

    <label className={styles.label}>
        <textarea rows="10" className={`${styles.input} ${filled ? styles.filled : null}`} 
        name={nomeCampo} id={nomeCampo} {...register(nomeCampo, {
          required: required ? "Campo obrigatório" : false,
          onChange: (e) => {
            setFilled(e.target.value !== "");
          }
        })}/>
        <span className={styles.placeholder}>{placeholder}</span>
    </label>
    <p className={styles.error}>{errors?.[nomeCampo]?.message}</p>
    </div>
    
  )
}

export default InputTextArea