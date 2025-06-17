import axios from "axios";
import styles from "./index.module.scss";
import { useAuth } from "../../../context/AuthContext";
import api from "../../../services/api";

const BotaoPlanilha = ({setMessage, setModalMensagemAberto}) => {
  const { token } = useAuth();

  const handleFileChange = async (e) => {
    const file = e.target.files[0];

    if (!file) return;

    const formData = new FormData();
    formData.append("arquivo", file);

    try {
      const response = await api.post("/usuarios/importar-planilha", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });

      setMessage(response.data.mensagem || "Planilha importada com sucesso!");
      setModalMensagemAberto(true);
    } catch (error) {
      console.error("Erro ao enviar planilha:", error);
      setMessage(error.response?.data?.message || "Erro ao importar a planilha.");
      setModalMensagemAberto(true);
    }
  };

  return (
    <div className={styles.principal}>
      <label className={styles.botao}>
        Escolher planilha
        <input
          className={styles.input}
          type="file"
          accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
          onChange={handleFileChange}
        />
      </label>
    </div>
  );
};

export default BotaoPlanilha;
