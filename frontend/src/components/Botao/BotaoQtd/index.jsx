import PropTypes from "prop-types";
import styles from "./index.module.scss";
import React from "react";

const BotaoQtd = ({ quantidade }) => (
  <div className={styles.container}>
    <p className={styles.qtd}>Quantidade:</p>
    <div className={styles.quadrado}>
      <div className={styles.subquad}>
        <p className={styles.numero}>{quantidade}</p>
      </div>
    </div>
  </div>
);

BotaoQtd.propTypes = {
  quantidade: PropTypes.number.isRequired,
};

export default BotaoQtd;