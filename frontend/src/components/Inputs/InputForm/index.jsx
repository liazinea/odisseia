import {useState} from 'react'
import styles from './index.module.scss'

const InputForm = ({type, nomeCampo, placeholder, required, ...props}) => {
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
        name={nomeCampo} id={nomeCampo} onChange={toggleFilled} {...(isRequired ? { required: true } : {})}  {...props}/>
        <span className={styles.placeholder}>{placeholder}</span>
    </label>
  )
}

export default InputForm