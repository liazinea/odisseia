import { useState, useEffect } from "react";
import HeaderPagina from "../../components/layout/HeaderPagina";
import styles from "./index.module.scss";
import Button from "../../components/Botao/Botao";
import Input from "../../components/Inputs/Input";
import { IoSearch } from "react-icons/io5";
import ListaUsuarios from "../../components/layout/ListaUsuarios";
import useUsuarios from "../../hooks/useUsuarios";
import { useAuth } from "../../context/AuthContext";
import { useForm } from "react-hook-form";
import api from "../../services/api";
import { useNavigate } from "react-router-dom";
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import ModalMensagem from "../../components/Modal/ModalMensagem";
import BotaoPlanilha from "../../components/Botao/BotaoPlanilha";

const Usuarios = () => {
  const [globalFilter, setGlobalFilter] = useState("");
  const { token, userType } = useAuth();
  const { buscaUsuarios } = useUsuarios();
  const navigate = useNavigate();

  const [message, setMessage] = useState(null);
  const [statusFilter, setStatusFilter] = useState("1");
  const [columnFilters, setColumnFilters] = useState([
    { id: "usu_status", value: statusFilter },
  ]);

  const [usuarios, setUsuarios] = useState([]);
  const [modalMensagemAberto, setModalMensagemAberto] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    reset,
  } = useForm();

  useEffect(() => {
    if (!token || userType != 1) {
      navigate("/");
    }
  }, [token, userType, navigate]);

  useEffect(() => {
    const carregarUsuarios = async () => {
      const dados = await buscaUsuarios();
      setUsuarios(dados);
    };
    carregarUsuarios();
  }, []);

  useEffect(() => {
    setColumnFilters([{ id: "usu_status", value: statusFilter }]);
  }, [statusFilter]);

  const onSubmit = async (data) => {
    try {
      const response = await api.post("/usuarios", data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setMessage(response.data.message || "Usuário cadastrado com sucesso");
      setModalMensagemAberto(true);
      reset(); // limpa o formulário

      // Atualizar lista
      const dados = await buscaUsuarios();
      setUsuarios(dados);
    } catch (error) {
      const apiErrors = error.response?.data?.errors;
      const apiMessage = error.response?.data?.message;

      if (apiErrors) {
        Object.keys(apiErrors).forEach((campo) => {
          setError(campo, {
            type: "manual",
            message: apiErrors[campo][0],
          });
        });
      } else if (apiMessage) {
        setMessage(apiMessage);
        setModalMensagemAberto(true);
      }
    }
  };

  const columns = [
    {
      accessorKey: "usu_nome",
      id: "nome",
      header: "Nome do Aluno",
      cell: (props) => (
        <p className={styles.status}>{props.row.original.usu_nome}</p>
      ),
    },
    {
      accessorKey: "opcoes",
      id: "opcoes",
      header: "Opções",
      cell: (props) => (
        <div>
          <p className={styles.status}>punir</p>
          <p className={styles.status}>editar</p>
          <p className={styles.status}>excluir</p>
        </div>
      ),
    },
    {
      accessorKey: "usu_status",
      id: "usu_status",
      header: "",
      cell: () => null, // Não renderiza nada
      filterFn: (row, columnId, filterValue) => {
        return String(row.getValue(columnId)) === String(filterValue);
      },
    },
  ];

  const table = useReactTable({
    data: usuarios,
    columns,
    state: {
      globalFilter,
      columnFilters,
    },
    onGlobalFilterChange: setGlobalFilter,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <>
      <HeaderPagina titulo="Lista de usuários" />
      <div className={styles.divPesquisa}>
        <div className={styles.pesquisa}>
          <input
            className={styles.pesquisaInput}
            type="text"
            onChange={(e) => setGlobalFilter(e.target.value)}
            placeholder="Pesquise o aluno que deseja"
          />
          <div className={styles.icon}>
            <IoSearch />
          </div>
        </div>
      </div>
      <div className={styles["container-geral"]}>
        <div className={styles["container-exibir"]}>
          <div className={styles["titulo"]}>
            <h2>Usuários cadastrados</h2>
          </div>
          <div className={styles["tabela"]}>
            <div className={styles["filtro-status"]}>
              <label className={styles["status-label"]}>
                Filtrar por status:
              </label>
              <select
                className={styles["status-select"]}
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option className={styles["status-option"]} value="1">
                  Ativo
                </option>
                <option className={styles["status-option"]} value="0">
                  Inativo
                </option>
              </select>
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
            <div className={styles.conteudo}>
              {table.getRowModel().rows.map((row) => (
                <div
                  className={styles["linha"]}
                  key={row.original.usu_id || row.original.usu_ra || row.id}
                >
                  <ListaUsuarios
                    usuario={row.original}
                    setMessage={setMessage}
                    buscaUsuarios={buscaUsuarios}
                    setUsuarios={setUsuarios}
                    setModalMensagemAberto={setModalMensagemAberto}
                  />
                </div>
              ))}
            </div>
            <div className={styles.paginacao}>
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
          noValidate
        >
          <div className={styles["titulo"]}>
            <h2>Cadastrar novo usuário</h2>
          </div>
          <div className={styles["inputs"]}>
            {/* Nome */}
            <div className={styles["input"]}>
              <label htmlFor="usu_nome">Nome:</label>
              <Input
                type="text"
                id="usu_nome"
                placeholder="Digite o nome completo do aluno"
                {...register("usu_nome", {
                  required: "O nome do usuário é obrigatório",
                })}
              />
              <p className={styles["erro"]}>
                {errors.usu_nome && errors.usu_nome.message}
              </p>
            </div>

            {/* Data de nascimento */}
            <div className={styles["input"]}>
              <label htmlFor="usu_dataNasc">Data de nascimento:</label>
              <Input
                type="date"
                id="usu_dataNasc"
                {...register("usu_dataNasc", {
                  required: "A data de nascimento é obrigatória",
                })}
              />
              <p className={styles["erro"]}>
                {errors.usu_dataNasc && errors.usu_dataNasc.message}
              </p>
            </div>

            {/* Email */}
            <div className={styles["input"]}>
              <label htmlFor="email">E-mail</label>
              <Input
                type="email"
                id="email"
                placeholder="Digite o e-mail do aluno"
                {...register("email", {
                  required: "O email é obrigatório",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Digite um email válido",
                  },
                })}
              />
              <p className={styles["erro"]}>
                {errors.usu_email && errors.usu_email.message}
              </p>
            </div>

            {/* RG / RA */}
            <div className={styles["input"]}>
              <label htmlFor="usu_ra">RA:</label>
              <Input
                type="text"
                id="usu_ra"
                placeholder="xx.xxx.xxx-x"
                {...register("usu_ra", {
                  required: "O RA é obrigatório",
                })}
              />
              <p className={styles["erro"]}>
                {errors.usu_ra && errors.usu_ra.message}
              </p>
            </div>
          </div>

          <div className={styles["botao"]}>
            <BotaoPlanilha
              setMessage={setMessage}
              setModalMensagemAberto={setModalMensagemAberto}
            />
            <Button type="submit" nomeBotao="cadastrar" texto="Criar usuário" />
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

export default Usuarios;
