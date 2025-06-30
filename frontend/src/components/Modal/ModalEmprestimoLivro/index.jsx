import styles from "./index.module.scss";
import SelectSimples from "../../Inputs/Select";
import { useForm } from "react-hook-form";
import { useMemo } from "react";
import api from "../../../services/api";
import { useAuth } from "../../../context/AuthContext";
import { useState } from "react";
import ModalMensagem from "../ModalMensagem";

const ModalEmprestimoLivro = ({
  isOpen,
  onClose,
  alunos = [],
  livros = [],
  handleInputChange,
}) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm();

  const { token } = useAuth();

  const [modalMensagemAberto, setModalMensagemAberto] = useState(false);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  // Normaliza alunos e livros para { label, value }
  const selectAlunoValue = useMemo(
    () =>
      alunos
        .filter((aluno) => aluno.usu_status == 1)
        .map((aluno) => ({
          label: aluno.usu_nome,
          value: aluno.usu_id,
        })),
    [alunos]
  );

  const selectLivroValue = useMemo(
    () =>
      livros.map((livro) => ({
        label: livro.nome,
        value: livro.id,
      })),
    [livros]
  );

  // Função para fechar modal
  const handleClose = () => {
    reset(); // limpa o formulário
    onClose();
  };


  // Quando envia o formulário
  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const response = await api.post(
        "/emprestimos?status=2",
        {
          liv_id: data.livro,
          usu_id: data.aluno,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Empréstimo criado com sucesso:", response.data);
      setMessage(response.data.message);
      setModalMensagemAberto(true);
      reset(); // Limpa o formulário após sucesso
    } catch (error) {
      console.error("Erro ao fazer empréstimo do livro:", error);
      setMessage(error.response.data.message);
      setModalMensagemAberto(true);
    } finally {
      setLoading(false);
    }
  };


  if (!isOpen) return null;

  return (
    <div className={styles.modal}>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.modalCadastro}>
        <h3 className={styles.titulo}>Cadastrar Novo Empréstimo</h3>

        {/* Campo de Aluno */}
        <div>
          <label htmlFor="aluno">Nome do Aluno</label>
          <SelectSimples
            nomeCampo="aluno"
            placeholder="Selecione um aluno"
            values={selectAlunoValue}
            control={control}
            rules={{ required: "Selecione um aluno" }}
            error={errors.aluno}
            onChange={(value) => handleInputChange("aluno", value)}
          />
        </div>

        {/* Campo de Livro */}
        <div>
          <label htmlFor="livro">Livro Desejado</label>
          <SelectSimples
            nomeCampo="livro"
            placeholder="Selecione um livro"
            values={selectLivroValue}
            control={control}
            rules={{ required: "Selecione um livro" }}
            error={errors.livro}
            onChange={(value) => handleInputChange("livro", value)}
          />
        </div>

        {/* Botões */}
        <div className={styles.botoes}>
          <button type="submit" className={styles.saveButton} disabled={loading}>
            {loading ? "Aguarde..." : "Cadastrar"}
          </button>
          <button
            type="button"
            onClick={handleClose}
            className={styles.closeButton}
            disabled={loading}
          >
            Cancelar
          </button>
        </div>

      </form>
      <ModalMensagem
        mensagemModal={message}
        modalAberto={modalMensagemAberto}
        closeModal={() => setModalMensagemAberto(false)}
      />
    </div>
  );
};

export default ModalEmprestimoLivro;
