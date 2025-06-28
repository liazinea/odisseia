import { useState, useEffect } from "react";
import HeaderPagina from "../../components/layout/HeaderPagina";
import styles from "./index.module.scss";
import Button from "../../components/Botao/Botao";
import Input from "../../components/Inputs/Input";
import useGeneros from "../../hooks/useGeneros";
import BarraPesquisa from "../../components/layout/HeaderHome/BarraPesquisa";
import { IoSearch } from "react-icons/io5";
import ListaGeneros from "../../components/layout/ListaGeneros";
import { useForm } from "react-hook-form";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { api } from "../../config/api";
import ModalMensagem from "../../components/Modal/ModalMensagem";
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import Carregando from "../../components/layout/Carregando";

const Generos = () => {
  const [globalFilter, setGlobalFilter] = useState("");
  const { token } = useAuth();
  const { userType } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!token || userType != 1) {
      navigate("/");
    }
  }, [token, userType, navigate]);
  const [modalMensagemAberto, setModalMensagemAberto] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const [registerMessage, setRegisterMessage] = useState(null);
  const [message, setMessage] = useState(null);

  const handleInputChange = (value) => {
    setInputValue(value);
    setGlobalFilter(value.target.value);
  };

  const [generos, setGeneros] = useState([]);
  const { buscaGeneros } = useGeneros();

  const carregarGeneros = async () => {
    const dados = await buscaGeneros();
    setGeneros(dados);
  };

  useEffect(() => {
    carregarGeneros();
  }, []);

  const onSubmit = async (data) => {
    try {
      const response = await api.post("/generos", data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setRegisterMessage(response.data.message);
      setMessage(response.data.message);
      setModalMensagemAberto(true);

      const dados = await buscaGeneros();
      setGeneros(dados);
    } catch (error) {
      console.error("Erro:", error.response?.data || error.message);
      setRegisterMessage(
        error.response?.data?.message || "Erro ao cadastrar gênero."
      );

      setMessage(
        error.response?.data?.message || "Erro ao cadastrar autor."
      );
      setModalMensagemAberto(true);
    }
  };

  const columns = [
    {
      accessorKey: "nome",
      id: "generos",
      header: "Gêneros",
      cell: (props) => (
        <p className={styles.status}>{props.row.original.nome}</p>
      ),
    },
    {
      accessorKey: "opcoes",
      id: "opcoes",
      header: "Opções",
      cell: (props) => (
        <div>
          <p className={styles.status}>editar</p>
          <p className={styles.status}>excluir</p>
        </div>
      ),
    },
  ];

  const table = useReactTable({
    data: generos,
    columns,
    state: {
      globalFilter,
    },
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  if (generos.length === 0) {
    return (
      <div>
        <HeaderPagina titulo={'Gêneros'} />
        <Carregando />
      </div>
    )
  }

  return (
    <>
      <HeaderPagina titulo="Gêneros" />
      <div className={styles.divPesquisa}>
        <div className={styles.pesquisa}>
          <input
            className={styles.pesquisaInput}
            type="text"
            onChange={(e) => setGlobalFilter(e.target.value)}
            placeholder="Pesquise o gênero que deseja"
          />
          <div className={styles.icon}>
            <IoSearch />
          </div>
        </div>
      </div>
      <div className={styles["container-geral"]}>
        <div className={styles["container-exibir"]}>
          <div className={styles["titulo"]}>
            <h2>Gêneros cadastrados</h2>
          </div>
          <div className={styles["tabela"]}>
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
            <div className={styles.conteudo}>
              {table.getRowModel().rows.map((row) => (
                <div className={styles["linha"]} key={row.original.id}>
                  <ListaGeneros
                    genero={row.original}
                    setMessage={setMessage}
                    buscaGeneros={buscaGeneros}
                    setGeneros={setGeneros}
                    setModalMensagemAberto={setModalMensagemAberto}
                  />
                </div>
              ))}
            </div>
            <div className={styles.paginacao}>
              {/* Bloco de navegação entre páginas */}
              <div className={styles["botoes-paginacao"]}>
                <button
                  className={styles["botao-paginacao"]}
                  onClick={() => table.previousPage()}
                  disabled={!table.getCanPreviousPage()}
                >
                  Anterior
                </button>

                <span className={styles["info-paginacao"]}>
                  Página {table.getState().pagination.pageIndex + 1} de{" "}
                  {table.getPageCount()}
                </span>

                <button
                  className={styles["botao-paginacao"]}
                  onClick={() => table.nextPage()}
                  disabled={!table.getCanNextPage()}
                >
                  Próxima
                </button>
              </div>

              {/* Bloco de detalhes: total de itens e seletor de itens por página */}
              <div className={styles["detalhes-paginacao"]}>
                <span className={styles["info-paginacao"]}>
                  Total de itens: {table.getFilteredRowModel().rows.length}
                </span>

                <div className={styles["seletor-tamanho-pagina"]}>
                  <label htmlFor="pageSize">Itens por página:</label>
                  <select
                    id="pageSize"
                    value={table.getState().pagination.pageSize}
                    onChange={(e) => {
                      table.setPageSize(Number(e.target.value));
                    }}
                  >
                    {[10, 20, 30, 40, 50].map((pageSize) => (
                      <option key={pageSize} value={pageSize}>
                        {pageSize}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className={styles["container-cadastro"]}
        >
          <div className={styles["titulo"]}>
            <h2>Cadastrar gênero</h2>
          </div>
          <div className={styles["input"]}>
            <label htmlFor="nome">Nome:</label>
            <Input
              type="text"
              nomeCampo="nome"
              placeholder="Digite o nome do gênero"
              {...register("gen_nome", {
                required: "O nome do gênero é obrigatório",
              })}
            />
            {
              <p className={styles["erro"]}>
                {errors.gen_nome && errors.gen_nome.message}
              </p>
            }
          </div>
          <div className={styles["botao"]}>
            <Button
              type="button"
              nomeBotao="cadastrar"
              texto="Adicionar Gênero"
              onClick={handleSubmit(onSubmit)}
            />
          </div>
        </form>

        <ModalMensagem
          mensagemModal={message}
          modalAberto={modalMensagemAberto}
          closeModal={() => setModalMensagemAberto(false)}
        />
      </div>
    </>
  );
};

export default Generos;
