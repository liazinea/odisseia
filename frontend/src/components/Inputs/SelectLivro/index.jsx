import {useState} from 'react'
import CreatableSelect from 'react-select/creatable';
import styles from './index.module.scss'

const SelectLivro = ({nomeCampo, placeholder, required, errors, errorsApi, register}) => {
    const isRequired = required;
    const [filled, setFilled] = useState(false);
    
    const toggleFilled = () => {
      if(document.getElementById(nomeCampo).value != ''){
        setFilled(true)
      }else{
        setFilled(false)
      }
  return (
    <label className={styles.label}>
      <input type="text" list="sla" id='ihi' multiple className={`${styles.input} ${filled ? styles.filled : null}`} onChange={toggleFilled} {...(isRequired ? { required: true } : {})}/>
        <datalist 
        name={nomeCampo} id={'sla'} >
          <option value={'hahahaha'}></option>
          <option value={'hohoho'}></option>
          <option value={'hahahaha'}></option>
          <option value={'hahahaha'}></option>
          </datalist>
        <span className={styles.placeholder}>{placeholder}</span>
    </label>
  )
}

export default SelectLivro
