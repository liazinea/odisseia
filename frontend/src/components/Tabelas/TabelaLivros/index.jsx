import { useEffect, useState } from "react";
import styles from "./index.module.scss";
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import CelulaTabelaLivros from "../CelulaTabelaLivros";
import BotaoVerMais from "../../Botao/BotaoVerMais";
import { IoSearch } from "react-icons/io5";

const TabelaLivros = ({ livros }) => {
  const [livro, setLivro] = useState([]);
  const [globalFilter, setGlobalFilter] = useState("");
  const [pagesLoaded, setPagesLoaded] = useState(1);
  const itemsPerPage = 3;

  useEffect(() => {
    setLivro(livros);
  }, [livros]);

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
      header: "Data de cadastro",
      cell: (props) => (
        <p className={styles.data}>
          {formatarData(props.row.original.created_at)}
        </p>
      ),
    },
    {
      accessorKey: "liv_capa",
      id: "capa",
      header: "Capa",
      cell: (props) => (
        <p className={styles.capa}>{props.row.original.liv_capa}</p>
      ),
    },
    {
      accessorKey: "liv_nome",
      id: "titulo",
      header: "Título",
      cell: (props) => (
        <p className={styles.titulo}>{props.row.original.liv_nome}</p>
      ),
    },
    {
      accessorKey: "liv_numRegistro",
      id: "num",
      header: "Número de registro",
      cell: (props) => (
        <p className={styles.num}>{props.row.original.liv_numRegistro}</p>
      ),
    },
    {
      accessorKey: "opcoes",
      id: "opcoes",
      header: "Opções",
      cell: (props) => (
        <div className={styles.opcoes}>
          <div>icon1</div>
          <div>icon2</div>
        </div>
      ),
    },
  ];

  const table = useReactTable({
    data: livro,
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
              placeholder="Pesquise o livro que deseja"
            />
            <div className={styles.icon}>
              <IoSearch />
            </div>
          </div>
        </div>
        <div className={styles.secao}>
          <p>Livros já cadastrados</p>
        </div>
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
          .map((row) => (
            <CelulaTabelaLivros
              key={row.original.liv_id}
              livro={row.original}
            />
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

export default TabelaLivros;
