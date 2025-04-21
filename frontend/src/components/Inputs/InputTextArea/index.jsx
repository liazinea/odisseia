import {useState} from 'react'
import styles from './index.module.scss'

const InputTextArea = ({nomeCampo, placeholder, required, errors, errorsApi, register}) => {
    const isRequired = required;
      const [filled, setFilled] = useState(false);
    
      const toggleFilled = () =>{
    
        if(document.getElementById(nomeCampo).value != ''){
          setFilled(true)
        }else{
          setFilled(false)
        }
      }
  return (
    <label className={styles.label}>
        <textarea rows="10" className={`${styles.input} ${filled ? styles.filled : null}`} 
        name={nomeCampo} id={nomeCampo} onChange={toggleFilled}  {...register(nomeCampo, {
          required: required ? "Campo obrigatório" : false,
        })}/>
        <span className={styles.placeholder}>{placeholder}</span>
    </label>
  )
}

export default InputTextArea