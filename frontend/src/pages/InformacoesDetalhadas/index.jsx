import React from "react";
import InfosLivro from "../../components/Livro/InfosLivro";
import InfoAdicionais from "../../components/Livro/InfosAdicionais";
import styles from "./index.module.scss";
import HeaderPagina from "../../components/layout/HeaderPagina";
import { useParams } from "react-router-dom";
import useLivro from "../../hooks/useLivro";
import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import api from "../../services/api";
import { useNavigate } from "react-router-dom";
import Carregando from "../../components/layout/Carregando";

const InformacoesDetalhadas = () => {
  const { id } = useParams();
  const [livro, setLivro] = useState(null);
  const { buscaLivro } = useLivro(id);
  const navigate = useNavigate();
  const { token, userType } = useAuth();
  useEffect(() => {
    if (!token) {
      navigate("/");
    }
  }, [token]);

  useEffect(() => {
    if (!livro) {
      const carregaLivro = async () => {
        try {
          const response = await api.get(`/livros/${id}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          setLivro(response.data.livro);
        } catch (error) {
          console.error("Erro ao carregar livro:", error);
        }
      };

      if (id) {
        carregaLivro();
      }
    }
  }, [livro]);

  if (!livro) {
    return (
      <div>
        <HeaderPagina titulo={"Informações Detalhadas"} />
        <Carregando/>
      </div>
    );
  }

  return (
    <div>
      <HeaderPagina titulo={"Informações Detalhadas"} />
      <div className={styles.container}>
        <div className={styles.parteLaranja}>
          <InfosLivro livro={livro} />
        </div>
        <div className={styles.parteAzul}>
          <div className={styles.infoAdicionalWrapper}>
            <InfoAdicionais
              paginas={livro.qtdPaginas}
              edicao={livro.edicao}
              editora={livro.editora}
              data={livro.dataPubli}
              id={livro.id}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default InformacoesDetalhadas;
