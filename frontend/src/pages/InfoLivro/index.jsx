import Navbar from "../../components/Navbar";
import Header from "../../components/HeaderPagina";
import Button from "../../components/Button";
import Livro from "../../components/Livro";
import Footer from "../../components/Footer";
import styles from "./index.module.scss";
import { useParams } from "react-router-dom";

const InfoLivro = () => {
  const {id} = useParams()
  const {livro} = useLivro(id)

  return (
    <>
      <Navbar />
      <Header titulo="Informações Detalhadas" />
      <Livro livro={livro} />
      <div className={styles.btn}>
        <Button variant="reserve" size="extra-large">
          Realizar reserva
        </Button>
      </div>
      <Footer />
    </>
  );
};

export default InfoLivro;
