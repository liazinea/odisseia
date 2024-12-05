import ListaLivros from "../../components/ListaLivros";
import styles from './index.module.scss';
import Navbar from "../../components/NavbarAdm";
import HeaderPagina from "../../components/HeaderPagina";
import Footer from "../../components/Footer";
import useLivros from "../../hooks/useLivros";

const LivrosCadastrados = () => {
  const { livros } = useLivros();
  console.log(livros);

  return (
    <>
      <Navbar />
      <HeaderPagina titulo={"Livros Cadastrados"} />
      <div className={styles.principal}>
        <div className={styles.head}>
          <div className={styles.data}>Data de Cadastro</div>
          <div className={styles.capa}>Capa</div>
          <div className={styles.titulo}>Título</div>
          <div className={styles.num}>Número de Registro</div>
          <div className={styles.opcoes}>Opções</div>
        </div>
        {livros.map((livro) => (
          <div key={livro.id}>
            <ListaLivros livro={livro} />
          </div>
        ))}
      </div>
      <div className={styles.footer}>
        <Footer />
      </div>
    </>
  );
};

export default LivrosCadastrados;
