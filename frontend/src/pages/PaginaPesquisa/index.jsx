import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import useLivros from "../../hooks/useLivros"; // ajuste o caminho se necessário
import CardPesquisa from "../../components/Cards/CardPesquisa";
import styles from "./index.module.scss";
import HeaderHome from "../../components/layout/HeaderHome";
import { useAuth } from "../../context/AuthContext";
import Carregando from "../../components/layout/Carregando";

const PaginaPesquisa = () => {
  const { token, userType } = useAuth();
  const navigate = useNavigate();

  const { termo } = useParams();
  const { buscaLivros } = useLivros();
  const [resultados, setResultados] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [paginaAtual, setPaginaAtual] = useState(0);
  const [tamanhoPagina, setTamanhoPagina] = useState(10);

  const totalPaginas = Math.ceil(resultados.length / tamanhoPagina);

  const livrosPaginados = resultados.slice(
    paginaAtual * tamanhoPagina,
    (paginaAtual + 1) * tamanhoPagina
  );

  const irParaAnterior = () => {
    if (paginaAtual > 0) setPaginaAtual(paginaAtual - 1);
  };

  const irParaProxima = () => {
    if (paginaAtual < totalPaginas - 1) setPaginaAtual(paginaAtual + 1);
  };

  useEffect(() => {
    setPaginaAtual(0);
  }, [tamanhoPagina]);

  useEffect(() => {
    let isMounted = true;

    const verificarAutenticacaoEBuscar = async () => {
      // Primeiro valida a autenticação
      if (!token || userType == 1) {
        navigate("/");
        return;
      }

      setPaginaAtual(0);

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
      {carregando ? (
        <Carregando/>
      ) : resultados.length > 0 ? (
        <div className={styles.container}>
          <h3 className={styles["termo-pesquisa"]}>Resultados para: "{termo}"</h3>
          {livrosPaginados.map((livro) => (
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
        <div>
          <h3 className={styles["termo-pesquisa"]}>Resultados para: "{termo}"</h3>
          <p className={styles.pesquisa}>Nenhum livro encontrado.</p>
        </div>
      )}
     {!carregando && resultados.length > 0 && (
  <div className={styles.paginacao}>
    <div className={styles["botoes-paginacao"]}>
      <button
        className={styles["botao-paginacao"]}
        onClick={irParaAnterior}
        disabled={paginaAtual === 0}
      >
        Anterior
      </button>

      <span className={styles["info-paginacao"]}>
        Página {paginaAtual + 1} de {totalPaginas}
      </span>

      <button
        className={styles["botao-paginacao"]}
        onClick={irParaProxima}
        disabled={paginaAtual >= totalPaginas - 1}
      >
        Próxima
      </button>
    </div>

    <div className={styles["detalhes-paginacao"]}>
      <span className={styles["info-paginacao"]}>
        Total de itens: {resultados.length}
      </span>

      <div className={styles["seletor-tamanho-pagina"]}>
        <label htmlFor="pageSize">Itens por página:</label>
        <select
          id="pageSize"
          value={tamanhoPagina}
          onChange={(e) => setTamanhoPagina(Number(e.target.value))}
        >
          {[5, 10, 20, 50].map((size) => (
            <option key={size} value={size}>
              {size}
            </option>
          ))}
        </select>
      </div>
    </div>
  </div>
)}

    </div>
  );
};

export default PaginaPesquisa;
