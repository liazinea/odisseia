import { useEffect, useState } from "react";
import styles from "./index.module.scss";
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import CelulaTabelaRegistros from "../CelulaTabelaRegistros";
import BotaoVerMais from "../../Botao/BotaoVerMais";
import { IoSearch } from "react-icons/io5";
// import useLivros from "../../../hooks/useLivros";

const TabelaRegistros = ({ emprestimos, alunos, livro, setEmprestimos }) => {
  const [emprestimo, setEmprestimo] = useState([]);
  const [globalFilter, setGlobalFilter] = useState("");
  const [pagesLoaded, setPagesLoaded] = useState(1);
  //   const {buscaLivros} = useLivros();
  const [modalMensagemAberto, setModalMensagemAberto] = useState(false);
  const itemsPerPage = 7;

  //   console.log(livros)
  //   useEffect(() => {
  //     const carregarivros = async () => {
  //       const dados = await buscaLivros();
  //       setLivro(dados);
  //     };
  //     carregarivros();
  //   }, [modalMensagemAberto]);

    useEffect(() => {
      setEmprestimo(emprestimos);
    }, [emprestimos]);

  const formatarData = (dataString) => {
    const data = new Date(dataString);
    const dia = data.getDate().toString().padStart(2, "0");
    const mes = data
      .toLocaleString("pt-BR", { month: "short" })
      .replace(".", "");
    const ano = data.getFullYear();
    return `${dia}/${mes}/${ano}`;
  };

  const verMais = () => {
    setPagesLoaded((prev) => prev + 1);
  };

  const columns = [
    {
      accessorKey: "created_at",
      id: "data",
      header: "Data",
      cell: (props) => (
        <p className={styles.data}>
          {formatarData(props.row.original.created_at)}
        </p>
      ),
    },
    {
      accessorKey: "numEmprestimo",
      id: "numEmprestimo",
      header: "Número Empréstimo",
      cell: (props) => (
        <p className={styles.numEmprestimo}>
          {props.row.original.numEmprestimo}
        </p>
      ),
    },
    {
      accessorKey: "titulo",
      id: "titulo",
      header: "Título",
      cell: (props) => (
        <p className={styles.titulo}>{props.row.original.titulo}</p>
      ),
    },
    {
      accessorKey: "isbn",
      id: "isbn",
      header: "ISBN",
      cell: (props) => (
        <div className={styles.isbn}></div>
      ),
    },
    {
      accessorKey: "status",
      id: "status",
      header: "Status",
      cell: (props) => (
        <div className={styles.status}></div>
      ),
    },
  ];

  const table = useReactTable({
    data: emprestimo,
    columns,
    state: {
      globalFilter,
    },
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <div className={styles.principal}>
      <div className={styles.wrapper}>
        <div className={styles.divPesquisa}>
          <div className={styles.pesquisa}>
            <input
              className={styles.pesquisaInput}
              type="text"
              onChange={(e) => setGlobalFilter(e.target.value)}
              placeholder="Pesquise por livro, aluno ou número"
            />
            <div className={styles.icon}>
              <IoSearch />
            </div>
          </div>
        </div>
        <p className={styles.filtrar}>FILTRAR POR:</p>
        <div className={styles.filtros}>
          <div className={styles.status}>
            <p
              className={`${styles.filtroBotao} ${
                globalFilter == "" ? styles.botaoAtivo : null
              }`}
              onClick={() => setGlobalFilter("")}
            >
              Todos
            </p>
          </div>
          <div className={styles.status}>
            <p
              className={`${styles.filtroBotao} ${
                globalFilter == "Reservado" ? styles.botaoAtivo : null
              }`}
              onClick={() => setGlobalFilter("Reservado")}
            >
              Reservados
            </p>
          </div>
          <div className={styles.status}>
            <p
              className={`${styles.filtroBotao} ${
                globalFilter == "Emprestado" ? styles.botaoAtivo : null
              }`}
              onClick={() => setGlobalFilter("Emprestado")}
            >
              Emprestados
            </p>
          </div>
          <div className={styles.status}>
            <p
              className={`${styles.filtroBotao} ${
                globalFilter == "Devolvido" ? styles.botaoAtivo : null
              }`}
              onClick={() => setGlobalFilter("Devolvido")}
            >
              Devolvidos
            </p>
          </div>
          <div className={styles.status}>
            <p
              className={`${styles.filtroBotao} ${
                globalFilter == "Cancelado" ? styles.botaoAtivo : null
              }`}
              onClick={() => setGlobalFilter("Cancelado")}
            >
              Cancelados
            </p>
          </div>
        </div>
        <div className={styles.linha}></div>
        {table.getHeaderGroups().map((headerGroup) => (
          <div className={styles.head} key={headerGroup.id}>
            {headerGroup.headers.map((header) => (
              <p
                className={`${styles[header.column.columnDef.id]}`}
                key={header.id}
              >
                {header.column.columnDef.header}
              </p>
            ))}
          </div>
        ))}
        {table
          .getRowModel()
          .rows.slice(0, pagesLoaded * itemsPerPage)
          .map((row, i) => (
            <div>
              {/* {console.log(row.original)} */}
              <CelulaTabelaRegistros
                key={row.original.emprestimo_id}
                emprestimo={row.original}
                aluno={alunos[i]}
                livro={livro}
                onDelete={(id) => {
                  setEmprestimo((prev) => prev.filter((emprestimo) => emprestimo.id !== id));
                }}
                setModalMensagemAberto={setModalMensagemAberto}
              />
            </div>
          ))}
        <div className={styles.botao}>
          {pagesLoaded * itemsPerPage < table.getRowModel().rows.length && (
            <BotaoVerMais
              className={styles.botaoVerMais}
              onClick={verMais}
              texto={"Ver mais"}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default TabelaRegistros;
