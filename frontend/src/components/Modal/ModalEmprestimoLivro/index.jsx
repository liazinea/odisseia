import styles from "./index.module.scss";
import SelectSimples from "../../Inputs/Select";

const ModalEmprestimoLivro = ({
  isOpen,
  onClose,
  onSubmit,
  handleSubmit,
  control,
  errors,
  alunos,
  livros,
  handleInputChange,
}) => {
  if (!isOpen) return null;

  return (
    <div className={styles.modal}>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.modalCadastro}>
        <h3 className={styles.titulo}>Cadastrar Novo Empréstimo</h3>
        <div>
          <label htmlFor="aluno">Nome do Aluno</label>
          <SelectSimples
            nomeCampo="aluno"
            placeholder="Selecione um aluno"
            values={alunos}
            control={control}
            rules={{ required: "Selecione um aluno" }}
            error={errors.aluno}
            onChange={(value) => handleInputChange("aluno", value)}
          />
        </div>
        <div>
          <label htmlFor="livro">Livro Desejado</label>
          <SelectSimples
            nomeCampo="livro"
            placeholder="Selecione um livro"
            values={livros}
            control={control}
            rules={{ required: "Selecione um livro" }}
            error={errors.livro}
            onChange={(value) => handleInputChange("livro", value)}
          />
        </div>
        <div className={styles.botoes}>
          <button type="submit" className={styles.saveButton}>
            Cadastrar
          </button>
          <button type="button" onClick={onClose} className={styles.closeButton}>
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
};

export default ModalEmprestimoLivro;