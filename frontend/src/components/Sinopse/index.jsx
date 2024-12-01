import React from 'react';
import styles from './index.module.scss';

const Sinopse = ({ sinopse, conteudo }) => {
    return (
        <div className={styles.sinopseContainer}>
            <p className={styles.titulo}>{sinopse}</p>
            <div className={styles.textoContainer}>
                <p className={styles.texto}>{conteudo[0]}</p>
                <p className={styles.texto}>{conteudo[1]}</p>
            </div>
        </div>
    );
};

export default Sinopse;
