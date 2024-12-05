import ListaLivros from "../../components/ListaLivros";
import styles from './index.module.scss';
import Navbar from "../../components/NavbarAdm";
import HeaderPagina from "../../components/HeaderPagina";
import Footer from "../../components/Footer";
import useLivros from "../../hooks/useLivros";
import { useEffect, useState } from "react";
import { api } from "../../config/api";

const LivrosCadastrados = () => {
  const {livros} = useLivros()
  const [livrosBuscados, setLivrosBuscados] = useState(livros)

  const buscaLivro = async () =>{
    const response = await api.get(`/livros`)
    setLivrosBuscados(response.data.livros.data)
  }

  useEffect(()=>{
    buscaLivro()
  }, [])

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
        {livrosBuscados.map((livro) => (
          <div key={livro.id}>
            <ListaLivros livro={livro} buscaLivro={buscaLivro}/>
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
