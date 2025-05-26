import React from "react";
import styles from "./index.module.scss";
import Input from "../../Inputs/Input";
import { IoClose } from "react-icons/io5";

const ModalInfoDetalhada = ({
  isOpen,
  onClose,
  handleSubmit,
  register,
  errors,
  passwordMessage,
  emprestimo,
}) => {
  if (!isOpen) return null;

  let tituloPrazo = "Prazos";
  let labelData = "Data:";
  let labelPrazo = "Prazo:";
  let labelBtn = "";
  let btn = "";

  switch (emprestimo.emp_status) {
    case 1:
      labelData = "Data da Reserva:";
      labelPrazo = "Prazo de Retirada:";
      labelBtn = "Alterar Status da Reserva";
      btn = "Cancelar Reserva";
      break;
    case 2:
      labelData = "Data do Empréstimo:";
      labelPrazo = "Prazo de Devolução:";
      labelBtn = "Renovar Empréstimo";
      btn = "Renovar Empréstimo";
      break;
    default:
      labelData = "Data do Empréstimo:";
      labelPrazo = "Data de Devolução:";
      break;
  }

  const formatarData = (dataString) => {
    const data = new Date(dataString);
    const dia = data.getDate().toString().padStart(2, "0");
    const mes = (data.getMonth() + 1).toString().padStart(2, "0");
    const ano = data.getFullYear();
    return `${dia}/${mes}/${ano}`;
  };
  

  return (
    <div className={styles.modalOverlay}>
      <form onSubmit={handleSubmit} className={styles.modal}>
        <div className={styles.closeButton} onClick={onClose}>
          <h3 className={styles.titulo}>Informações detalhadas</h3>
          <div className={styles.icon}>
            <IoClose />
          </div>
        </div>
        <div className={styles.Alinhadupla}>
          <div className={styles.dupla}>
            <label className={styles.nomeLivro} htmlFor="nomeLivro">
              Nome do Livro:
            </label>

            <p>{emprestimo.livro.liv_nome}</p>

            <label className={styles.nomeLivro} htmlFor="genero">
              Gênero:
            </label>
            <div className={styles.generos}>
              {emprestimo.livro.generos.map((genero) => (
                <span key={genero.gen_id}>{genero.gen_nome}</span>
              ))}
            </div>
          </div>

          <div className={styles.dupla}>
            <label className={styles.nomeLivro} htmlFor="nomeAutor">
              Nome do Autor:
            </label>
            <div className={styles.generos}>
              {emprestimo.livro.autores &&
                emprestimo.livro.autores.map((autor) => (
                  <span key={autor.aut_id}>{autor.aut_nome}</span>
                ))}
            </div>

            <label className={styles.nomeLivro} htmlFor="nomeAutor">
              Editora:
            </label>
            <p>{emprestimo.livro.editora.edi_nome}</p>
          </div>
        </div>
        <div>
          <div>
            <h3 className={styles.titulo}>{tituloPrazo}</h3>
            <div className={styles.Alinhadupla}>
              <div className={styles.dupla}>
                <label className={styles.nomeLivro} htmlFor="data">
                  {labelData}
                </label>
                <p>{formatarData(emprestimo.emp_dataInicio)}</p>

                <label className={styles.nomeLivro} htmlFor="alterar">
                  {labelBtn}
                </label>
              </div>

              <div className={styles.dupla}>
                <label className={styles.nomeLivro} htmlFor="prazo">
                  {labelPrazo}
                </label>
                <p>{formatarData(emprestimo.emp_dataFim)}</p>
              </div>
            </div>
          </div>
        </div>
        <div>
          <div className={styles.botoes}>
            <button type="submit" className={`${styles.saveButton} ${btn ? null : styles.none}`}>
              {btn}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ModalInfoDetalhada;
