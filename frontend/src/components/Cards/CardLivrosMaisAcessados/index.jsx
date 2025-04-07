import React from 'react';
import styles from './index.module.scss';

const CardLivrosMaisAcessados = () => {
  return (
    <div className={styles.card}>
        <h1 className={styles.titulo}>Teste</h1>
        <p className={styles.paragrafo}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec eu est tristique, efficitur sem ac, tristique dui. Donec luctus lorem eget lacus vulputate, eget egestas orci varius. Ut dictum maximus vestibulum. Quisque in nulla quis velit pulvinar vehicula nec non sem. Nullam imperdiet rutrum vulputate. Nulla varius ac mi et tempus. Integer egestas ex magna, a mollis metus dapibus at. Sed eleifend enim justo, at condimentum ante tempus vel. Suspendisse id blandit leo, id facilisis augue. Praesent fermentum lectus fringilla imperdiet facilisis. Nunc varius nunc non elit bibendum tristique. Fusce mattis velit vel lectus accumsan, non feugiat lectus ultrices. Phasellus ex sapien, hendrerit ac ullamcorper in, vestibulum non nisi.</p>
        <div className={styles.imagem}>
          <img src="/img/capalivro.png" alt="Descrição da imagem" />
        </div>
    </div>
  );
}

export default CardLivrosMaisAcessados;
