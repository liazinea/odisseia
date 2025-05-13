import styles from "./index.module.scss";
import HeaderPagina from '../../components/layout/HeaderPagina'
import { useAuth } from "../../context/AuthContext";
import { useEffect } from "react";
import {useNavigate} from 'react-router-dom';
import TabelaRegistros from "../../components/Tabelas/TabelaRegistros";

const RegistroAtividade = () => {
  const { token } = useAuth();
  const { userType } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    if (!token || userType != 1) {
      navigate("/");
    }
  }, [token]);
  return (
    <>
        <HeaderPagina titulo={'Registro de Atividades'} />
        <TabelaRegistros emprestimos={[{id: 1, created_at: '05-11-2026', numEmprestimo: 24, titulo: "O Espreitador", isbn: "29845151485111", status: 'Reservado'}, 
            {id: 2, created_at: '05-11-2026', numEmprestimo: 24, titulo: "O Espreitador", isbn: "29845151485111", status: 'Reservado'}, 
            {id: 3, created_at: '05-11-2026', numEmprestimo: 24, titulo: "O Espreitador", isbn: "29845151485111", status: 'Reservado'}, 
            {id: 4, created_at: '05-11-2026', numEmprestimo: 24, titulo: "O Espreitador", isbn: "29845151485111", status: 'Reservado'}]}/>
    </>
  );
};

export default RegistroAtividade;
