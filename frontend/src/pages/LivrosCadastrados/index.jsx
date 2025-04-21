import HeaderPagina from "../../components/layout/HeaderPagina";
import TabelaLivros from "../../components/Tabelas/TabelaLivros";
import styles from "./index.module.scss";
import { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import {
  useNavigate
} from 'react-router-dom';
import useLivros from "../../hooks/useLivros";


const LivrosCadastrados = () => {
  const [livros, setLivros] = useState([])
  const { token } = useAuth()
  const { userType } = useAuth()
  const navigate = useNavigate()
  const {buscaLivros} = useLivros()


  useEffect(() => {
    if (!token || userType != 1) {
      navigate('/')
    }
  }, [token])

  useEffect(() => {
    const carregarivros = async () => {
      const dados = await buscaLivros();
      setLivros(dados);
    };
    carregarivros();
  }, []);

  return (
    <div className={styles.principal}>
      <HeaderPagina titulo={"Livros Cadastrados"} />
      <TabelaLivros
        livros={livros}
      />
    </div>
  );
};

export default LivrosCadastrados;
