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
        <TabelaRegistros 
        alunos={[{nome: "Lívia", ra: 151654, serie: '2º ano'}, {nome: "Talles", ra: 151655, serie: '1º ano'}, {nome: "Gabriela", ra: 151652, serie: '3º ano'}, {nome: "Luiza", ra: 151659, serie: '1º ano'}, {nome: "Bruno Patrick", ra: 151653, serie: '2º ano'},]} 
        livro={[{titulo: 'A Culpa é das Estrelas', autor:[{nome: 'John Green'}], registro: '56191561', isbn: '1651651', classificacao: '+12', }]}
        emprestimos={[{id: 1, created_at: '05-11-2026', numEmprestimo: 24, titulo: "O Espreitador", isbn: "29845151485111", status: 'Reservado', funcionario: 'Maria', dataReserva: '05-11-2025', dataLimite: '05-18-2025'}, 
            {id: 2, created_at: '05-11-2026', numEmprestimo: 24, titulo: "O Espreitador", isbn: "29845151485111", status: 'Reservado', funcionario: 'Maria', dataReserva: '05-11-2025', dataLimite: '05-18-2025'}, 
            {id: 3, created_at: '05-11-2026', numEmprestimo: 24, titulo: "O Espreitador", isbn: "29845151485111", status: 'Reservado',funcionario: 'Maria', dataReserva: '05-11-2025', dataLimite: '05-18-2025'}, 
            {id: 4, created_at: '05-11-2026', numEmprestimo: 24, titulo: "O Espreitador", isbn: "29845151485111", status: 'Reservado',funcionario: 'Maria', dataReserva: '05-11-2025', dataLimite: '05-18-2025'}]}/>
    </>
  );
};

export default RegistroAtividade;
