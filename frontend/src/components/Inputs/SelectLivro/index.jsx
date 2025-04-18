import {useState} from 'react'
import CreatableSelect from 'react-select/creatable';
import styles from './index.module.scss'

const SelectLivro = ({type, nomeCampo, placeholder, required, options}) => {
    const isRequired = required;
    const [filled, setFilled] = useState(false);
    
    const toggleFilled = (selectedOptions) => {
      setFilled(Array.isArray(selectedOptions) ? selectedOptions.length > 0 : !!selectedOptions);
    };
    

    return (
        <label className={styles.label}>
            <CreatableSelect isMulti
                type={type}
                classNamePrefix="custom-select"
                className={`${styles.input} ${filled ? styles.filled : ''}`}
                name={nomeCampo} 
                id={nomeCampo}
                onChange={toggleFilled}
                options={options}
                styles={{
                    control: (base) => ({
                        ...base,
                        border: 'none',
                        boxShadow: 'none',
                        backgroundColor: 'transparent',
                        minHeight: '40px',
                    }),
                    valueContainer: (base) => ({
                        ...base,
                        padding: '0 8px',
                    }),
                    input: (base) => ({
                        ...base,
                        color: 'inherit',
                        margin: 0,
                        padding: 0,
                    }),
                    singleValue: (base) => ({
                        ...base,
                        color: 'inherit',
                    }),
                    placeholder: (base) => ({
                      ...base,
                      display: 'none' // Ensures no placeholder is shown
                  }),
                  indicatorSeparator: () => ({
                    display: 'none' // This removes the separator bar
                }),
                dropdownIndicator: () => ({
                  display: 'none' // This removes the separator bar
              }),
                }}
                {...(isRequired ? { required: true } : {})}
            />
            <span className={styles.placeholder}>{placeholder}</span>
        </label>
    )
}

export default SelectLivro