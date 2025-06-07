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
  } = useForm();

  const { token } = useAuth();

  const [modalMensagemAberto, setModalMensagemAberto] = useState(false);
  const [message, setMessage] = useState("");
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

  // Quando envia o formulário
  const onSubmit = async (data) => {
    try {
      const response = await api.post(
        "/emprestimos",
        {
          liv_id: data.livro,
          usu_id: data.aluno, // já é o ID do usuário
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Empréstimo criado com sucesso:", response.data);
      setMessage("Empréstimo cadastrado com sucesso!");
      setModalMensagemAberto(true);
    } catch (error) {
      console.error("Erro ao fazer empréstimo do livro:", error);
      setMessage("Falha ao cadastrar empréstimo!");
      setModalMensagemAberto(true);
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
          <button type="submit" className={styles.saveButton}>
            Cadastrar
          </button>
          <button
            type="button"
            onClick={onClose}
            className={styles.closeButton}
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
