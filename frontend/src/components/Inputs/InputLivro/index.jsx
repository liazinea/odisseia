import {useState} from 'react'
import styles from './index.module.scss'

const InputLivro = ({type, nomeCampo, placeholder, required}) => {
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
        <input type={type} className={`${styles.input} ${filled ? styles.filled : null}`} 
        name={nomeCampo} id={nomeCampo} onChange={toggleFilled} {...(isRequired ? { required: true } : {})}/>
        <span className={styles.placeholder}>{placeholder}</span>
    </label>
  )
}

export default InputLivro