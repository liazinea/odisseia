import React, { useState } from "react";
import styles from "./index.module.scss";
import { FaSearch } from "react-icons/fa";

const BarraPesquisa = ({ placeholder }) => {
  const [searchValue, setSearchValue] = useState("");

  const handleInputChange = (e) => {
    setSearchValue(e.target.value);
  };

  const handleSearchClick = () => {
    console.log("Valor da pesquisa:", searchValue);
  };

  return (
    <div className={styles.barra}>
      <input
        type="text"
        placeholder={placeholder}
        className={styles.pesquisa}
        value={searchValue}
        onChange={handleInputChange}
      />
      <FaSearch className={styles.icon} onClick={handleSearchClick} />
    </div>
  );
};

export default BarraPesquisa;
