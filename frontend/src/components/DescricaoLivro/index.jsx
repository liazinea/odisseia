import React, { useState, useEffect, useCallback } from "react";
import styles from "./index.module.scss";
import CapaLivro from "../CapaLivro";
import TituloDescricao from "../TituloDescricao";
import Button from "../Button";
import QuantidadeLivro from "../QuantidadeLivro";
import Sinopse from "../Sinopse";
import PropTypes from "prop-types";

const DescricaoLivro = ({
  titulo,
  subtitulo,
  capa,
  sinopse,
  classIndicativa,
  autor,
  quantidadeLivros,
  generos = [],
}) => {
  const [buttonSize, setButtonSize] = useState("large");
  const [isAbove520px, setIsAbove520px] = useState(window.innerWidth > 520);

  const getButtonSize = (width) => {
    if (width <= 400) return "extra-small";
    if (width <= 576) return "small";
    if (width <= 768) return "medium";
    if (width <= 1050) return "large";
    return "extra-large";
  };

  const updateLayout = useCallback(() => {
    const width = window.innerWidth;
    setButtonSize(getButtonSize(width));
    setIsAbove520px(width > 520); // Atualiza o estado com base na largura
  }, []);

  useEffect(() => {
    updateLayout();
    window.addEventListener("resize", updateLayout);

    return () => {
      window.removeEventListener("resize", updateLayout);
    };
  }, [updateLayout]);

  return (
    <div className={styles.descricaoLivro}>
      {/* Renderiza a primeira div de quantidade apenas em telas maiores que 520px */}
      {isAbove520px && (
        <div className={styles.quantidade}>
          <QuantidadeLivro quantidade={quantidadeLivros} />
        </div>
      )}

      <div className={styles.capaInfo}>
        <div className={styles.capaLivro}>
          <CapaLivro imagemCapa={capa} classificacao={classIndicativa} />
        </div>
        <div className={styles.infoLivro}>
          <TituloDescricao
            titulo={titulo}
            subtitulo={subtitulo}
            autor={autor}
          />
          <div className={styles.generosLivro}>
            {generos.map((genero) => (
              <Button
                key={genero}
                variant="primary"
                size={buttonSize}
                aria-label={`Gênero: ${genero}`}
              >
                {genero}
              </Button>
            ))}
          </div>

          {/* Renderiza a segunda div de quantidade apenas em telas menores ou iguais a 520px */}
          {!isAbove520px && (
            <div className={styles.quantidade}>
              <QuantidadeLivro quantidade={quantidadeLivros} />
            </div>
          )}
        </div>
      </div>
      <div className={styles.divSinopse}>
        <Sinopse sinopse={sinopse} />
      </div>
    </div>
  );
};

// Validando as props com PropTypes
DescricaoLivro.propTypes = {
  titulo: PropTypes.string.isRequired,
  subtitulo: PropTypes.string.isRequired,
  capa: PropTypes.string.isRequired,
  classIndicativa: PropTypes.string.isRequired,
  autor: PropTypes.string.isRequired,
  quantidadeLivros: PropTypes.number.isRequired,
  generos: PropTypes.arrayOf(PropTypes.string),
};

export default DescricaoLivro;
