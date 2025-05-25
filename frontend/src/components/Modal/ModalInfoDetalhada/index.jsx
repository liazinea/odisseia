import React from "react";
import styles from "./index.module.scss";
import Input from "../../Inputs/Input";
import { IoClose } from "react-icons/io5";

const ModalInfoDetalhada = ({
  isOpen,
  onClose,
  onSubmit,
  handleSubmit,
  dataReserva,
  prazoRetirada,
  titulo = "Informações Detalhadas",
  nomeLivro,
  nomeAutor,
  genero,
  editora,
  statusReserva, // <-- NOVO
}) => {
  if (!isOpen) return null;

  // Definir os textos dinamicamente com base no status
  let tituloPrazo = "Prazos";
  let labelData = "Data:";
  let labelPrazo = "Prazo:";  
  let labelBtn = "";
  let btn = "";

  switch (statusReserva) {
    case "reservado":
      labelData = "Data da Reserva:";
      labelPrazo = "Prazo de Retirada:";
      labelBtn = "Alterar Status da Reserva";
      btn = "Cancelar Reserva";
      break;
    case "emprestado":
      labelData = "Data do Empréstimo:";
      labelPrazo = "Prazo de Devolução:";
      labelBtn = "Renovar Empréstimo";
      btn = "Renovar Empréstimo";
      break;
    default:
      break;
  }

  return (
    <div className={styles.modalOverlay}>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.modal}>
                  <div className={styles.closeButton} onClick={onClose}>
                    <div className={styles.icon}>
                    <IoClose />
                    </div>
                  </div>
        <h3 className={styles.titulo}>{titulo}</h3>
        <div className={styles.Alinhadupla}>
          <div className={styles.dupla}>
            <label className={styles.nomeLivro} htmlFor="nomeLivro">
              Nome do Livro:
            </label>

            <p>{nomeLivro}</p>

            <label className={styles.nomeLivro} htmlFor="genero">
              Gênero:
            </label>
            <p>{genero}</p>
          </div>

          <div className={styles.dupla}>
            <label className={styles.nomeLivro} htmlFor="nomeAutor">
              Nome do Autor:
            </label>

            <p>{nomeAutor}</p>

            <label className={styles.nomeLivro} htmlFor="nomeAutor">
              Editora:
            </label>
            <p>{editora}</p>
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
      <p>{dataReserva}</p>

      <label className={styles.nomeLivro} htmlFor="alterar">
        {labelBtn}
      </label>
    </div>

    <div className={styles.dupla}>
      <label className={styles.nomeLivro} htmlFor="prazo">
        {labelPrazo}
      </label>
      <p>{prazoRetirada}</p>
    </div>
  </div>



          </div>
        </div>
        <div>
          <div className={styles.botoes}>
            <button type="submit" className={styles.saveButton}>
              {btn}
            </button>

          </div>
        </div>
      </form>
    </div>
  );
};

export default ModalInfoDetalhada;
