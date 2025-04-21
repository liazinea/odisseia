import React from 'react'
import styles from './index.module.scss';
import { FaSearch } from 'react-icons/fa';
import { useState, useEffect } from 'react';
import useGeneros from '../../../../hooks/useGeneros';
const BarraPesquisa = ({placeholder,  buscaGeneros, setGeneros }) => {
  const [valorInput, setValorInput] = useState("");


  const handleInputChange = (event) => {
    setValorInput(event.target.value);
  };

  const handleSearch = async () => {
    console.log("Buscar por:", valorInput);
    const data = await buscaGeneros(valorInput)
    setGeneros(data)
  };

  return (
    <div className={styles.barra}>
        <input type='text' placeholder={placeholder} className={styles.pesquisa} required/>
        <FaSearch className={styles.icon} onClick={handleSearch}/>
    </div>
  );
};

export default BarraPesquisa;
