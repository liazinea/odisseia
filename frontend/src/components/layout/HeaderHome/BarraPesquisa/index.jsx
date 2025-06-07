import React, { useState } from 'react';
import styles from './index.module.scss';
import { FaSearch } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const BarraPesquisa = ({ placeholder }) => {
  const [valorInput, setValorInput] = useState('');
  const navigate = useNavigate();

  const handleInputChange = (event) => {
    setValorInput(event.target.value);
  };

  const handleSearch = () => {
    if (valorInput.trim() !== '') {
      navigate(`/pesquisa/${encodeURIComponent(valorInput)}`);
    }
  };

  return (
    <div className={styles.barra}>
      <input
        type="text"
        placeholder={placeholder}
        className={styles.pesquisa}
        value={valorInput}
        onChange={handleInputChange}
        onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
        required
      />
      <FaSearch className={styles.icon} onClick={handleSearch} />
    </div>
  );
};

export default BarraPesquisa;
