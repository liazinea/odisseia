import ListaLivros from "../../components/ListaLivros";
import Capa from '../../assets/jogos-vorazes.jpg';
import styles from './index.module.scss';
import Navbar from "../../components/Navbar";
import HeaderPagina from "../../components/HeaderPagina";
import Footer from "../../components/Footer";

const LivrosCadastrados = () => {
  
  return (
    <>
      <Navbar/>
      <HeaderPagina titulo={"Livros Cadastrados"}/>
      <div className={styles.principal}>
        <div className={styles.head}>
          <div className={styles.data}>Data de Cadastro</div>
          <div className={styles.capa}>Capa</div>
          <div className={styles.titulo}>Título</div>
          <div className={styles.num}>Número de Registro</div>
          <div className={styles.opcoes}>Opções</div>
        </div>
        <ListaLivros titulo={"Jogos Vorazes"} data={'11/05/2013'} capa={Capa} numRegistro={5165456} />
      </div>
      <Footer/>
    </>
  );

};

export default LivrosCadastrados;
