import styles from "./index.module.scss";
import Logo from "../Logo";
import ContatosFooter from "./ContatosFooter";

const Footer = () => {
  return (
    <footer className={styles[`footer`]}>
      <div className={styles[`footer-container`]}>
        <div className="logo-container">
          <Logo />
        </div>
        <div className={styles[`footer-content`]}>
          <ContatosFooter />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
