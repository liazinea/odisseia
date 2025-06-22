import styles from "./index.module.scss";
import HeaderPagina from '../../components/layout/HeaderPagina'
import { useAuth } from "../../context/AuthContext";
import { useEffect, useState } from "react";
import useEmprestimos from "../../hooks/useEmprestimos";
import {useNavigate} from 'react-router-dom';
import TabelaRegistros from "../../components/Tabelas/TabelaRegistros";
import Carregando from "../../components/layout/Carregando";

const RegistroAtividade = () => {
  const [emprestimos, setEmprestimos] = useState([])
  const { token } = useAuth();
  const {buscaEmprestimos} = useEmprestimos()
  const { userType } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    if (!token || userType != 1) {
      navigate("/");
    }
  }, [token]);

   useEffect(() => {
    const carregarEmprestimos = async () => {
      const dados = await buscaEmprestimos();
      setEmprestimos(dados);
    };
    carregarEmprestimos();
  }, []);

  console.log(emprestimos)

  if(emprestimos.length === 0){
    return (
      <div>
        <HeaderPagina titulo={'Registro de Atividades'} />
        <Carregando/>
      </div>
  )
  }

  return (
    <>
        <HeaderPagina titulo={'Registro de Atividades'} />
        <TabelaRegistros 
        emprestimos={emprestimos}/>
    </>
  );
};

export default RegistroAtividade;
