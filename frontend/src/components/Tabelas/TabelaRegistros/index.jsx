import { useEffect, useState } from "react";
import styles from "./index.module.scss";
import CelulaTabelaRegistros from "../CelulaTabelaRegistros";
import BotaoVerMais from "../../Botao/BotaoVerMais";
import { IoSearch } from "react-icons/io5";
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
// import useLivros from "../../../hooks/useLivros";

const TabelaRegistros = ({ emprestimos }) => {
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

  const globalFilterFunction = (row, columnId, filterValue) => {
    const valuesToCheck = [
      row.original.titulo,
      row.original.numEmprestimo,
      row.original.status,
      row.original.aluno?.usu_nome,
      row.original.aluno?.usu_ra
    ];
  
    return valuesToCheck.some((value) =>
      value?.toString().toLowerCase().includes(filterValue.toLowerCase())
    );
  };
  

  const columns = [
    {
      accessorKey: "created_at",
      id: "data",
      header: "Data",
      cell: (props) => (
        <p className={styles.status}>
          {formatarData(props.row.original.created_at)}
        </p>
      ),
    },
    {
      accessorKey: "emp_id",
      id: "emp_id",
      header: "Número Empréstimo",
      cell: (props) => (
        <p className={styles.status}>
          {props.row.original.emp_id}
        </p>
      ),
    },
    {
      accessorKey: "livro.liv_titulo",
      id: "liv_titulo",
      header: "Título",
      cell: (props) => (
        <p className={styles.status}>{props.row.original.livro.liv_nome}</p>
      ),
    },
    {
      accessorKey: "liv_isbn",
      id: "isbn",
      header: "ISBN",
      cell: (props) => (
        <div className={styles.status}>{props.row.original.livro.liv_isbn}</div>
      ),
    },
    {
      accessorKey: "status",
      id: "status",
      header: "Status",
      cell: (props) => {
        const statusMap = {
          0: "CANCELADO",
          1: "RESERVADO",
          2: "EMPRESTADO",
          3: "DEVOLVIDO",
        };
        return <div className={styles.status}>{statusMap[props.row.original.emp_status]}</div>;
      }
    },
  ];

  const table = useReactTable({
    data: emprestimos,
    columns,
    state: {
      globalFilter,
    },
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    globalFilterFn: globalFilterFunction,
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
                globalFilter == "RESERVADO" ? styles.botaoAtivo : null
              }`}
              onClick={() => setGlobalFilter("RESERVADO")}
            >
              Reservados
            </p>
          </div>
          <div className={styles.status}>
            <p
              className={`${styles.filtroBotao} ${
                globalFilter == "EMPRESTADO" ? styles.botaoAtivo : null
              }`}
              onClick={() => setGlobalFilter("EMPRESTADO")}
            >
              Emprestados
            </p>
          </div>
          <div className={styles.status}>
            <p
              className={`${styles.filtroBotao} ${
                globalFilter == "DEVOLVIDO" ? styles.botaoAtivo : null
              }`}
              onClick={() => setGlobalFilter("DEVOLVIDO")}
            >
              Devolvidos
            </p>
          </div>
          <div className={styles.status}>
            <p
              className={`${styles.filtroBotao} ${
                globalFilter == "CANCELADO" ? styles.botaoAtivo : null
              }`}
              onClick={() => setGlobalFilter("CANCELADO")}
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
                className={`${styles.status}`}
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
                aluno={emprestimos[i].aluno}
                livro={emprestimos[i].livro}
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
