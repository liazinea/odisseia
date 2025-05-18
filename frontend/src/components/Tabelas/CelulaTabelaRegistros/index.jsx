import React, { useEffect, useState } from "react";
import styles from "./index.module.scss";
import Botao from "../../Botao/Botao";
import { useRef } from "react";
import { set } from "react-hook-form";
import { useAuth } from "../../../context/AuthContext";
import api from "../../../services/api";

const CelulaTabelaRegistros = ({ aluno, livro, emprestimo }) => {
  const [statusAtual, setStatusAtual] = useState("RESERVADO");
  const [dropdownAberto, setDropdownAberto] = useState(false);
  const [open, setOpen] = useState(false);
  const { token } = useAuth()
  const formatarData = (dataString) => {
    const data = new Date(dataString);
    const dia = data.getDate().toString().padStart(2, "0");
    const mes = (data.getMonth() + 1).toString().padStart(2, "0");
    const ano = data.getFullYear();
    return `${dia}/${mes}/${ano}`;
  };

  useEffect(() => {
    switch (emprestimo.emp_status) {
      case 1:
        setStatusAtual('RESERVADO')
        break
      case 2:
        setStatusAtual('EMPRESTADO')
        break
      case 3:
        setStatusAtual('DEVOLVIDO')
        break
      default:
        setStatusAtual('RESERVADO')
        break
    }
  }, [])

  const opcoesStatus = ["RESERVADO", "EMPRESTADO", "DEVOLUÇÃO", "CANCELAR"];

  const alternarDropdown = () => setDropdownAberto(!dropdownAberto);
  const selecionarStatus = (novoStatus) => {
    setStatusAtual(novoStatus);
    setDropdownAberto(false);
  };

  const Submit = async () => {
    try {
      let valorAtt = 0
      if(statusAtual =='RESERVADO'){
        valorAtt = 1
      }else if(statusAtual == 'EMPRESTADO'){
        valorAtt = 2
      }else if(statusAtual == 'DEVOLVIDO'){
        valorAtt = 3
      }
      const resposta = await api.patch(
        `/emprestimos/${emprestimo.emp_id}`,
        {
          valor: valorAtt
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );


      if (!resposta.ok) {
        throw new Error("Erro ao salvar os dados");
      }

      alert("Alterações salvas com sucesso!");
    } catch (erro) {
      console.error("Erro ao salvar:", erro);
      alert("Falha ao salvar alterações.");
    }
  };

  const toggleDropdown = () => {
    setOpen((open) => !open);
    console.log(open)
  };
  const dropdownRef = useRef(null);

  return (
    <div className={styles.registroContainer}>
      <div onClick={toggleDropdown} className={`${styles.headerDropdown} ${open ? styles.dropdownAtivo : ""}`} ref={dropdownRef}>
        <div className={styles.infosHeader}>
          <p className={styles.infos}>{formatarData(emprestimo.created_at)}</p>
          <p className={styles.infos}>{emprestimo.emp_id}</p>
          <p className={styles.infos}>{livro.liv_nome}</p>
          <p className={styles.infos}>{livro.liv_isbn}</p>
          <p className={`${styles.infos} ${styles.status}`}>{emprestimo.emp_status}</p>
        </div>
      </div>
      <div className={`${styles.conteudo} ${open ? styles.active : ""}`}>
        <section className={styles.infoBloco}>
          <h2 className={styles.infosTitulo}>Informações do Aluno:</h2>
          <div className={styles.linha}>
            <p className={styles.infosTexto}>
              <strong>Nome do Aluno:</strong>
              <br />
              {aluno.usu_nome}
            </p>
            <p className={styles.infosTexto}>
              <strong>RA:</strong>
              <br />
              {aluno.usu_ra}
            </p>
            <p className={styles.infosTexto}>
              <strong>Série/Ano:</strong>
              <br />
              {aluno.serie}
            </p>
            <p className={styles.infosTexto}>
              <strong>ID do Empréstimo:</strong>
              <br />
              {emprestimo.emp_id}
            </p>
          </div>
        </section>

        <section className={styles.infoBloco}>
          <h2 className={styles.infosTitulo}>Informações do Livro:</h2>
          <div className={styles.linha}>
            <p className={styles.infosTexto}>
              <strong>Nome do Livro:</strong>
              <br />
              {livro.liv_nome}
            </p>
            <p className={styles.infosTexto}>
              <strong>Nome do Autor:</strong>
              <br />
              {livro.autores && (
                Array.isArray(livro.autores) ? (
                  livro.autores.map((autor, index) => (
                    <p key={index}>{autor.aut_nome}</p>
                  ))
                ) : (
                  <p>{livro.autores.aut_nome}</p>
                )
              )}

            </p>
            <p className={styles.infosTexto}>
              <strong>Número de Registro:</strong>
              <br />
              {livro.liv_numRegistro}
            </p>
          </div>
          <div className={styles.linha}>
            <p className={styles.infosTexto}>
              <strong>Código do Sistema:</strong>
              <br />
              {livro.liv_id}
            </p>
            <p className={styles.infosTexto}>
              <strong>Classificação na Estante:</strong>
              <br />
              {livro.classIndicativa}
            </p>
          </div>
        </section>

        <section className={styles.infoBloco}>
          <h2 className={styles.infosTitulo}>Informações do Empréstimo:</h2>
          <div className={styles.linha}>
            <p className={styles.infosTexto}>
              <strong>Data da Reserva:</strong>
              <br />
              {emprestimo.created_at}
            </p>
            <p className={styles.infosTexto}>
              <strong>Data Limite de Retirada:</strong>
              <br />
              {emprestimo.emp_dataFim}
            </p>
          </div>
        </section>

        <section className={styles.statusReserva}>
          <h2 className={styles.infosTitulo}>Status da Reserva:</h2>
          <div className={styles.dropdownContainer}>
            <button
              onClick={alternarDropdown}
              className={styles.dropdownToggle}
            >
              {statusAtual}
            </button>
            {dropdownAberto && (
              <ul className={`${styles.dropdownMenu} ${dropdownAberto ? styles.active : null}`}>
                {opcoesStatus.map((opcao) => (
                  <li
                    key={opcao}
                    onClick={() => selecionarStatus(opcao)}
                    className={
                      statusAtual === opcao
                        ? styles.dropdownItemAtivo
                        : styles.dropdownItem
                    }
                  >
                    {opcao}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </section>

        <section className={styles.blocoBotao}>
          <Botao
            className={styles.botaoSalvar}
            onClick={Submit}
            texto={"Salvar Alterações"}
          />
        </section>
      </div>
    </div>
  );
};

export default CelulaTabelaRegistros;
