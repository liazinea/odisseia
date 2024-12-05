import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa"; // Importando os ícones do react-icons
import Button from "../Button";
import styles from "./index.module.scss"; // Importando o CSS Module

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [buttonSize, setButtonSize] = useState("large");

  // Função para atualizar o estado de buttonSize com base no tamanho da tela
  const checkMobile = () => {
    const width = window.innerWidth;
    if (width <= 420) {
      setButtonSize("small"); // Tamanho pequeno para telas abaixo de 420px
    } else if (width <= 480) {
      setButtonSize("medium"); // Tamanho médio para telas abaixo de 480px
    } else if (width <= 685) {
      setButtonSize("large"); // Tamanho grande para telas menores que 685px
    } else {
      setButtonSize("large"); // Tamanho normal para telas maiores que 685px
    }
  };

  // Efeito para verificar a largura da janela
  useEffect(() => {
    checkMobile(); // Verifica a largura da janela ao carregar
    window.addEventListener("resize", checkMobile); // Atualiza ao redimensionar

    return () => window.removeEventListener("resize", checkMobile); // Remove o listener
  }, []);

  const toggleMenu = () => setIsMenuOpen((prevState) => !prevState);

  return (
    <nav className={`${styles.navbar} ${isMenuOpen ? styles.open : ""}`}>
      <div className={styles["navbar-container"]}>
        {/* Logo */}
        <div className={styles["navbar-logo"]}>
          <Link to="/" className={styles["navbar-logo"]}>
            <div className={styles["logo-icon"]}>
              <svg
                className={styles["logo-icon"]}
                width="28"
                height="26"
                viewBox="0 0 28 26"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M14 4.86249V23.6125M8.6875 8.61249H5.875M9.625 12.3625H5.875M26.5 18.925V3.83749C26.5 2.33749 25.275 1.22499 23.7875 1.34999H23.7125C21.0875 1.57499 17.1 2.91249 14.875 4.31249L14.6625 4.44999C14.3 4.67499 13.7 4.67499 13.3375 4.44999L13.025 4.26249C10.8 2.87499 6.825 1.54999 4.2 1.33749C2.7125 1.21249 1.5 2.33749 1.5 3.82499V18.925C1.5 20.125 2.475 21.25 3.675 21.4L4.0375 21.45C6.75 21.8125 10.9375 23.1875 13.3375 24.5L13.3875 24.525C13.725 24.7125 14.2625 24.7125 14.5875 24.525C16.9875 23.2 21.1875 21.8125 23.9125 21.45L24.325 21.4C25.525 21.25 26.5 20.125 26.5 18.925Z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <span>Odisseia</span>
          </Link>
        </div>

        {/* Links principais */}
        <ul className={styles["navbar-links"]}>
          <li>
            <Link to="/Livros">Livros</Link>
          </li>
          <li>
            <Link to="/">Cadastrar Livros</Link>
          </li>
          <li>
            <Link to="/#">Gêneros</Link>
          </li>
          <li>
            <Link to="/#">Em breve</Link>
          </li>
        </ul>

        {/* Botão hambúrguer */}
        <button className={styles["navbar-menu-toggle"]} onClick={toggleMenu}>
          {isMenuOpen ? <FaTimes /> : <FaBars />}
        </button>

        {/* Botões do dropdown */}
        <ul
          className={`${styles["navbar-button"]} ${
            isMenuOpen ? styles.active : ""
          }`}
        >
          <li>
            <Link to="/emprestimos">
              <Button variant="quaternary" size={buttonSize}>
                Empréstimos
              </Button>
            </Link>
          </li>
          <li>
            <Link to="/cadastrar-livros">
              <Button variant="quaternary" size={buttonSize}>
                Cadastrar livros
              </Button>
            </Link>
          </li>
          <li>
            <Link to="/generos">
              <Button variant="quaternary" size={buttonSize}>
                Gêneros
              </Button>
            </Link>
          </li>
          <li>
            <Link to="/em-breve">
              <Button variant="quaternary" size={buttonSize}>
                Em Breve
              </Button>
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
