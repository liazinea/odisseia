import { useEffect, useState } from "react";
import styles from "./index.module.scss";
import Input from "../../Inputs/Input";
import { IoClose } from "react-icons/io5";
import ModalExcluir from "../ModalExcluir";

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

  
  const [modalCancelarReserva, setCancelarReserva] = useState(false);
  const closeDeleteModal = () => setCancelarReserva(false);
  const [tituloPrazo, setTituloPrazo] = useState("Prazos");
  const [labelData, setLabelData] = useState("Data:");
  const [labelPrazo, setLabelPrazo] = useState("Prazo:");
  const [labelBtn, setLabelBtn] = useState("");
  const [btn, setBtn] = useState("");
  const [tituloModal, setTituloModal] = useState('')
  const [mensagemModal, setMensagemModal] = useState('')
  const [confirmLabel, setConfirmLabel] = useState('')
  const [cancelLabel, setCancelLabel] = useState('')

  useEffect(()=>{
    switch (emprestimo.emp_status) {
      case 1:
        setLabelData("Data da Reserva:")
        setLabelPrazo("Prazo de Retirada:")
        setLabelBtn("Alterar Status da Reserva")
        setBtn("Cancelar Reserva")
        setTituloModal("Confirmar cancelamento")
        setMensagemModal('Tem certeza que quer cancelar sua reserva de')
        setConfirmLabel("Confirmar")
        setCancelLabel("Cancelar")
        break;
      case 2:
        setLabelData("Data do Empréstimo:")
        setLabelPrazo("Prazo de Devolução:")
        setLabelBtn("Renovar Empréstimo")
        setBtn("Renovar Empréstimo")
        setTituloModal("Confirmar renovação de empréstimo")
        setMensagemModal('Tem certeza que deseja renovar o livro por mais uma semana?')
        setConfirmLabel("Confirmar")
        setCancelLabel("Cancelar")
        break;
      default:
        setLabelData('Data do Empréstimo:')
        setLabelPrazo('Data do Empréstimo:')
        break;
    }
  }, [emprestimo.emp_status])

  const formatarData = (dataString) => {
    const data = new Date(dataString);
    const dia = data.getDate().toString().padStart(2, "0");
    const mes = (data.getMonth() + 1).toString().padStart(2, "0");
    const ano = data.getFullYear();
    return `${dia}/${mes}/${ano}`;
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modal}>
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
            <button
              className={`${styles.saveButton} ${btn ? null : styles.none}`}
              onClick={()=>setCancelarReserva(true)}
            >
              {btn}
            </button>
          </div>
        </div>
      </div>
      <ModalExcluir
        isOpen={modalCancelarReserva}
        onClose={closeDeleteModal}
        onConfirm={null}
        titulo={tituloModal}
        mensagem={mensagemModal}
        nome={emprestimo.emp_status == 2 ? null : emprestimo.livro.liv_nome}
        confirmLabel={confirmLabel}
        cancelLabel={cancelLabel}
      />
    </div>
  );
};

export default ModalInfoDetalhada;
