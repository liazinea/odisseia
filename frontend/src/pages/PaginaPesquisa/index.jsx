import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import useLivros from "../../hooks/useLivros"; // ajuste o caminho se necessário
import CardPesquisa from "../../components/Cards/CardPesquisa";
import styles from "./index.module.scss";
import HeaderHome from "../../components/layout/HeaderHome";
import { useAuth } from "../../context/AuthContext";

const PaginaPesquisa = () => {
  const { token, userType } = useAuth();
  const navigate = useNavigate();

  const { termo } = useParams();
  const { buscaLivros } = useLivros();
  const [resultados, setResultados] = useState([]);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const verificarAutenticacaoEBuscar = async () => {
      // Primeiro valida a autenticação
      if (!token || userType == 1) {
        navigate("/");
        return;
      }

      // Só busca os livros se o usuário for permitido
      setCarregando(true);
      const todosLivros = await buscaLivros();
      const termoNormalizado = termo.toLowerCase();

      const filtrados = todosLivros.filter((livro) =>
        livro.nome.toLowerCase().includes(termoNormalizado)
      );

      if (isMounted) {
        setResultados(filtrados);
        setCarregando(false);
      }
    };

    verificarAutenticacaoEBuscar();

    return () => {
      isMounted = false;
    };
  }, [termo]);

  return (
    <div>
      <HeaderHome />
      <h3 className={styles["termo-pesquisa"]}>Resultados para: "{termo}"</h3>
      {carregando ? (
        <p className="pesquisa">Carregando...</p>
      ) : resultados.length > 0 ? (
        <div className={styles.container}>
          {resultados.map((livro) => (
            <Link
              to={`/livro/${livro.id}`}
              key={livro.id}
              className={styles.cards}
            >
              <CardPesquisa livro={livro} />
            </Link>
          ))}
        </div>
      ) : (
        <p className="pesquisa">Nenhum livro encontrado.</p>
      )}
    </div>
  );
};

export default PaginaPesquisa;
