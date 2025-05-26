import HeaderPagina from "../../components/layout/HeaderPagina";
import styles from "./index.module.scss";
import { useAuth } from "../../context/AuthContext";
import { useEffect, useState } from "react";
import useEmprestimos from "../../hooks/useEmprestimos";
import {useNavigate} from 'react-router-dom';
import Input from "../../components/Inputs/Input";
import Button from "../../components/Botao/Botao";
import ModalAlterarSenha from "../../components/Modal/ModalAlterarSenha";
import ModalMensagem from "../../components/Modal/ModalMensagem";
import { useForm } from "react-hook-form";
import ListaEmprestimos from "../../components/layout/ListaEmprestimos";
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";

const PerfilUsuario = () => {
  const [message, setMessage] = useState(null);
  const [globalFilter, setGlobalFilter] = useState("");
  const navigate = useNavigate();
  const { token, userType } = useAuth();
  const { logout } = useAuth();
  const [emprestimos, setEmprestimos] = useState([])
  const {buscaEmprestimos} = useEmprestimos()

   useEffect(() => {
    const carregarEmprestimos = async () => {
      const dados = await buscaEmprestimos();
      setEmprestimos(dados);
    };
    carregarEmprestimos();
    console.log(emprestimos)
  }, []);

  // Estado para controlar o modal de senha
  const [modalSenhaAberto, setModalSenhaAberto] = useState(false);
  const [passwordMessage, setPasswordMessage] = useState(null);

  // Estado para o modal de mensagem
  const [modalMensagemAberto, setModalMensagemAberto] = useState(false);
  const [mensagemModal, setMensagemModal] = useState("");

  // react-hook-form para o modal
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    reset,
  } = useForm();

  useEffect(() => {
    if (!token || userType != 0) {
      navigate("/");
    }
  }, [token, userType, navigate]);

  // Função para abrir o modal de senha
  const abrirModalSenha = () => {
    setPasswordMessage(null);
    setModalSenhaAberto(true);
    reset();
  };

  // Função para fechar o modal de senha
  const fecharModalSenha = () => {
    setModalSenhaAberto(false);
    setPasswordMessage(null);
    reset();
  };

  // Função para fechar o modal de mensagem
  const fecharModalMensagem = () => {
    setModalMensagemAberto(false);
    setMensagemModal("");
  };

  // Função para submit do modal de senha
  const onSubmitAlterarSenha = async (data) => {
    // Exibe os valores dos inputs no console
    console.log("Valores do modal alterar senha:", data);

    if (data.novaSenha !== data.confirmarNovaSenha) {
      setPasswordMessage("As senhas não coincidem.");
      return;
    }
    try {
      // await api.post("/usuario/alterar-senha", data);
      setPasswordMessage(null);
      fecharModalSenha();
      setMensagemModal("Senha alterada com sucesso!");
      setModalMensagemAberto(true);
    } catch (error) {
      setPasswordMessage("Erro ao alterar senha.");
    }
  };

  const columns = [
      {
        accessorKey: "titulo",
        id: "titulo",
        header: "Título",
        cell: (props) => (
          <p className={styles.status}>{props.row.original.nome}</p>
        ),
      },
      {
        accessorKey: "status",
        id: "status",
        header: "Status",
        cell: (props) => (
            <p className={styles.status}>{props.row.original.status}</p>
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
      data: emprestimos,
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
      <HeaderPagina titulo="Perfil do aluno" />

      <div className={styles["container-geral"]}>
        <div className={styles["container-informacoes"]}>
          <div className={styles["titulo-container"]}>
            <h2 className={styles["titulo"]}>Dados pessoais</h2>
          </div>
          <div className={styles["container-inputs"]}>
            <div className={styles["inputs"]}>
              <label>Nome:</label>
              <Input
                value={"Fabinho doidão"}
                disabled={true}
                keepStyleWhenDisabled={true}
              />
            </div>
            <div className={styles["inputs"]}>
              <label>Data de nascimento:</label>
              <Input
                type={"date"}
                value={"2025-05-02"}
                disabled={true}
                keepStyleWhenDisabled={true}
              />
            </div>
            <div className={styles["inputs"]}>
              <label>RA:</label>
              <Input
                value={"43785"}
                disabled={true}
                keepStyleWhenDisabled={true}
              />
            </div>
            <div className={styles["inputs"]}>
              <label>Série:</label>
              <Input
                value={"2° Ano A"}
                disabled={true}
                keepStyleWhenDisabled={true}
              />
            </div>
            <div className={styles["inputs"]}>
              <label>E-mail:</label>
              <Input
                value={"email@example.com"}
                disabled={true}
                keepStyleWhenDisabled={true}
              />
            </div>
            <div className={styles["inputs"]}>
              <label>Senha:</label>
              <Input
                value={"**************"}
                disabled={true}
                keepStyleWhenDisabled={true}
              />
            </div>
          </div>

          <div className={styles["container-botao"]}>
            <Button
              nomeBotao="EditarSenha"
              texto="Alterar a senha"
              onClick={abrirModalSenha}
            />
          </div>
        </div>
        <div className={styles["container-historico"]}>
          <div className={styles["titulo-historico"]}>
            <h2 className={styles.tituloFonte}>Histórico</h2>
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
                  <ListaEmprestimos
                    emprestimo={row.original}
                    buscaEmprestimos={buscaEmprestimos}
                    setMessage={setMessage}
                    setEmprestimos={setEmprestimos}
                    setModalMensagemAberto={setModalMensagemAberto}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <ModalAlterarSenha
        isOpen={modalSenhaAberto}
        onClose={fecharModalSenha}
        onSubmit={onSubmitAlterarSenha}
        handleSubmit={handleSubmit}
        register={register}
        errors={errors}
        passwordMessage={passwordMessage}
      />

      <ModalMensagem
        mensagemModal={mensagemModal}
        closeModal={fecharModalMensagem}
        modalAberto={modalMensagemAberto}
      />
    </>
  );
};

export default PerfilUsuario;
