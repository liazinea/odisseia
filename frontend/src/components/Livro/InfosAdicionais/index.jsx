import React from "react";
import styles from "./index.module.scss";
import { IoBookOutline } from "react-icons/io5";
import { FaHashtag } from "react-icons/fa";
import { RiBookLine } from "react-icons/ri";
import { LuCalendar } from "react-icons/lu";
import TextoIcone from "../../Icones/TextoIcone";
import BotaoReserva from "../../Botao/BotaoReserva"; // 👈 Importando o botão

const InfoAdicionais = ({
  paginas,
  edicao,
  editora = {},
  data,
}) => {
  return (
    <div className={styles.container}>
      <h3 className={styles.titulo}>Informações Adicionais:</h3>

      <div className={styles.itens}>
        <TextoIcone
          nome="Número de páginas:"
          icon={<IoBookOutline />}
          descricao={`${paginas} páginas`}
          ariaLabel="Número de páginas"
        />

        <TextoIcone
          nome="Edição:"
          icon={<FaHashtag />}
          descricao={`${edicao}ª edição`}
          ariaLabel="Edição do livro"
        />

        <TextoIcone
          nome="Editora:"
          icon={<RiBookLine />}
          descricao={editora.nome}
          ariaLabel="Editora do livro"
        />

        <TextoIcone
          nome="Data de Publicação:"
          icon={<LuCalendar />}
          descricao={data}
          ariaLabel="Data de publicação"
        />
      </div>

      <div className={styles.botaoWrapper}>
        <BotaoReserva texto="Realizar Reserva" />
      </div>
    </div>
  );
};

export default InfoAdicionais;
