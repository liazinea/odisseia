import React from 'react';
import PropTypes from 'prop-types';
import styles from './index.module.scss';

const Sinopse = ({ sinopse }) => {
    return (
        <div className={styles.sinopseContainer}>
            <p className={styles.titulo} aria-label="Seção de sinopse">SINOPSE</p>
            <p className={styles.texto} aria-live="polite">
                {sinopse || 'Sinopse não disponível.'}
            </p>
        </div>
    );
};

Sinopse.propTypes = {
    sinopse: PropTypes.string,
};

Sinopse.defaultProps = {
    sinopse: '',
};

export default Sinopse;