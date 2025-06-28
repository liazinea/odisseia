import { useEffect, useState } from "react";
import styles from "./index.module.scss";
import CelulaTabelaRegistros from "../CelulaTabelaRegistros";
import BotaoVerMais from "../../Botao/BotaoVerMais";
import { IoSearch } from "react-icons/io5";
import {
  getCoreRowModel,
  getFilteredRowModel,
  useReactTable,
} from "@tanstack/react-table";

const TabelaRegistros = ({ emprestimos }) => {
  const [emprestimo, setEmprestimo] = useState([]);
  const [globalFilter, setGlobalFilter] = useState("");
  const [pagesLoaded, setPagesLoaded] = useState(1);
  const [modalMensagemAberto, setModalMensagemAberto] = useState(false);
  const itemsPerPage = 7;

  // Map para traduzir o status numérico
  const statusMap = {
    0: "CANCELADO",
    1: "RESERVADO",
    2: "EMPRESTADO",
    3: "DEVOLVIDO",
  };

  useEffect(() => {
    const emprestimosOrdenados = [...emprestimos].sort((a, b) => {
      return new Date(b.created_at) - new Date(a.created_at);
    });
    setEmprestimo(emprestimosOrdenados);
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
    const statusString = statusMap[row.original.emp_status];
    const valuesToCheck = [
      row.original.livro?.liv_nome,
      row.original.emp_id,
      statusString,
      row.original.aluno?.usu_nome,
      row.original.aluno?.usu_ra,
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
        <p className={styles.status}>{props.row.original.emp_id}</p>
      ),
    },
    {
      accessorKey: "livro.liv_nome",
      id: "liv_titulo",
      header: "Título",
      cell: (props) => (
        <p className={styles.status}>{props.row.original.livro?.liv_nome}</p>
      ),
    },
    {
      accessorKey: "livro.liv_isbn",
      id: "isbn",
      header: "ISBN",
      cell: (props) => (
        <div className={styles.status}>
          {props.row.original.livro?.liv_isbn}
        </div>
      ),
    },
    {
      accessorKey: "emp_status",
      id: "status",
      header: "Status",
      cell: (props) => (
        <div className={styles.status}>
          {statusMap[props.row.original.emp_status]}
        </div>
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
    globalFilterFn: globalFilterFunction,
  });

  const filteredRows = table
    .getRowModel()
    .rows.slice(0, pagesLoaded * itemsPerPage);
  const hasNoResults = filteredRows.length === 0;

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
          {["", "RESERVADO", "EMPRESTADO", "DEVOLVIDO", "CANCELADO"].map(
            (status) => (
              <div className={styles.status} key={status}>
                <p
                  className={`${styles.filtroBotao} ${
                    globalFilter === status ? styles.botaoAtivo : ""
                  }`}
                  onClick={() => setGlobalFilter(status)}
                >
                  {status === "" ? "Todos" : status}
                </p>
              </div>
            )
          )}
        </div>
        <div className={styles.linha}></div>
        {table.getHeaderGroups().map((headerGroup) => (
          <div className={styles.head} key={headerGroup.id}>
            {headerGroup.headers.map((header) => (
              <p className={styles.status} key={header.id}>
                {header.column.columnDef.header}
              </p>
            ))}
          </div>
        ))}
        {table
          .getRowModel()
          .rows.slice(0, pagesLoaded * itemsPerPage)
          .map((row, i) => (
            <div className={styles.celula} key={row.original.emp_id}>
              <CelulaTabelaRegistros
                emprestimo={row.original}
                aluno={row.original.aluno}
                livro={row.original.livro}
                onDelete={(id) =>
                  setEmprestimo((prev) => prev.filter((e) => e.emp_id !== id))
                }
                setModalMensagemAberto={setModalMensagemAberto}
              />
            </div>
          ))}
        {hasNoResults && (
          <div className={styles.semResultados}>
            <p>Não há itens nessa categoria.</p>
          </div>
        )}
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
