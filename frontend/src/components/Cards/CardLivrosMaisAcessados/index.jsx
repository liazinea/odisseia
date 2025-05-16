import React from "react";
import styles from "./index.module.scss";
import CapaLivro from "../../Livro/CapaLivro";
import Sinopse from "../../Livro/Sinopse";

const CardLivrosMaisAcessados = () => {
  return (
    <div className={styles.card}>
      <h1 className={styles.titulo}>Teste</h1>
      <div className={styles.paragrafo}>
        <Sinopse sinopse="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent facilisis eros eget diam iaculis scelerisque. Nulla id tempus magna. Donec blandit sodales risus mattis faucibus. Suspendisse tincidunt dolor eget ligula posuere, vitae efficitur lectus viverra. Mauris nec nisi in tellus fermentum tempor ut sit amet tellus. Proin posuere ipsum diam, id malesuada orci semper ullamcorper. Pellentesque ipsum nunc, feugiat a lectus sit amet, accumsan maximus velit. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Maecenas finibus est odio, in convallis erat ornare molestie. Cras vehicula lorem interdum, venenatis ligula et, mattis arcu. Curabitur sodales maximus." />
      </div>
      <div className={styles.imagem}>
        <CapaLivro />
      </div>
    </div>
  );
};

export default CardLivrosMaisAcessados;
