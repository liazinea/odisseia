import { useState, useEffect } from "react";
import HeaderPagina from "../../components/layout/HeaderPagina";
import styles from "./index.module.scss";
import Button from "../../components/Botao/Botao";
import Input from "../../components/Inputs/Input";
import { IoSearch } from "react-icons/io5";
import BarraPesquisa from "../../components/layout/HeaderHome/BarraPesquisa";
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

const Usuarios = () => {
  const [globalFilter, setGlobalFilter] = useState("");
  const { token, userType } = useAuth();
  const { buscaUsuarios } = useUsuarios();
  const navigate = useNavigate();

  const [inputValue, setInputValue] = useState("");
  const [message, setMessage] = useState(null);
  const [registerMessage, setRegisterMessage] = useState(null);
  const [formData, setFormData] = useState({
    nome: "",
    dataNascimento: "",
    email: "",
    rg: "",
  });
  const [usuarios, setUsuarios] = useState([]);
  const [modalMensagemAberto, setModalMensagemAberto] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleInputChange = (value) => {
    setInputValue(value);
  };

  const handleCadastroInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleButtonClick = () => {
    console.log("Dados do formulário:", formData);
  };

  useEffect(() => {
    const carregarUsuarios = async () => {
      const dados = await buscaUsuarios();
      setUsuarios(dados);
    };
    carregarUsuarios();
  }, []);

  useEffect(() => {
    const carregarUsuarios = async () => {
      const dados = await buscaUsuarios();
      setUsuarios(dados);
    };
    carregarUsuarios();
  }, [message]);

  useEffect(() => {
    if (!token || userType != 1) {
      navigate("/");
    }
  }, [token]);

  const onSubmit = async (data) => {
    try {
      const response = await api.post("/usuarios", data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setRegisterMessage(response.data.message);
      setMessage("Usuário cadastrado com sucesso");
      setModalMensagemAberto(true);

      // Atualize a lista imediatamente após o cadastro
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
      }
      // setRegisterMessage(apiMessage);
      // closeEditModal(); // Não existe aqui, pode remover
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
          <p className={styles.status}>editar</p>
          <p className={styles.status}>excluir</p>
        </div>
      ),
    },
  ];

  const table = useReactTable({
    data: usuarios,
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
                  key={row.original.id}
                  onClick={() => console.log(row.original)}
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
          </div>
        </div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className={styles["container-cadastro"]}
        >
          <div className={styles["titulo"]}>
            <h2>Cadastrar novo usuário</h2>
          </div>
          <div className={styles["inputs"]}>
            {/* Nome */}
            <div className={styles["input"]}>
              <label htmlFor="nome">Nome:</label>
              <Input
                type="text"
                name="nome"
                placeholder="Digite o nome completo do aluno"
                {...register("usu_nome", {
                  required: "O nome do usuário é obrigatório",
                })}
              />
              {
                <p className={styles["erro"]}>
                  {errors.usu_nome && errors.usu_nome.message}
                </p>
              }
            </div>

            {/* Data de nascimento */}
            <div className={styles["input"]}>
              <label htmlFor="dataNascimento">Data de nascimento:</label>
              <Input
                type="date"
                name="dataNascimento"
                {...register("usu_dataNasc", {
                  required: "A data de nascimento é obrigatória",
                })}
              />
              {
                <p className={styles["erro"]}>
                  {errors.usu_dataNasc && errors.usu_dataNasc.message}
                </p>
              }
            </div>

            {/* Email */}
            <div className={styles["input"]}>
              <label htmlFor="email">E-mail</label>
              <Input
                type="text"
                name="email"
                placeholder="Digite o e-mail do aluno"
                {...register("email", {
                  required: "O email é obrigatório",
                })}
              />
              {
                <p className={styles["erro"]}>
                  {errors.email && errors.email.message}
                </p>
              }
            </div>

            {/* RG / RA */}
            <div className={styles["input"]}>
              <label htmlFor="rg">RA:</label>
              <Input
                type="text"
                name="rg"
                placeholder="xx.xxx.xxx-x"
                {...register("usu_ra", {
                  required: "O ra é obrigatório",
                })}
              />
              {
                <p className={styles["erro"]}>
                  {errors.usu_ra && errors.usu_ra.message}
                </p>
              }
            </div>
          </div>

          <div className={styles["botao"]}>
            <Button
              type="submit"
              nomeBotao="cadastrar"
              texto="Criar usuário"
              onClick={handleButtonClick}
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

export default Usuarios;
