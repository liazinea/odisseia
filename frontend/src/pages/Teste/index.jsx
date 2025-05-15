import React from "react";
import CelulaTabelaRegistros from "../../components/Tabelas/CelulaTabelaRegistros";
import Footer from "../../components/layout/Footer";

const Teste = () => {
  return (
    <>
      <CelulaTabelaRegistros
      aluno={{ nome: "Maria Silva", ra: "123456-7", serie: "2 T" }}
      livro={{
        titulo: "HARRY POTTER E O ENIGMA DO PRÍNCIPE",
        autor: "J.K. ROWLING",
        registro: "B-1234",
        codigo: "HP123456",
        classificacao: "10+"
      }}
      emprestimo={{
        id: "00000024",
        funcionario: "João Souza",
        dataReserva: "14/12/2024",
        dataLimite: "16/12/2024"
      }}
    />
    </>
    
  );
};

export default Teste;
