import HeaderPagina from "../../components/layout/HeaderPagina";
import TabelaLivros from "../../components/Tabelas/TabelaLivros";
import styles from "./index.module.scss";
import { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import {
  useNavigate
} from 'react-router-dom';
import useLivros from "../../hooks/useLivros";
import Carregando from "../../components/layout/Carregando";


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

  if(livros.length === 0){
      return (
        <div>
          <HeaderPagina titulo={'Livros Cadastrados'} />
          <Carregando/>
        </div>
    )
    }

  return (
    <div className={styles.principal}>
      <HeaderPagina titulo={"Livros Cadastrados"} />
      <TabelaLivros
        livros={livros}
        setLivros={setLivros}
      />
    </div>
  );
};

export default LivrosCadastrados;
