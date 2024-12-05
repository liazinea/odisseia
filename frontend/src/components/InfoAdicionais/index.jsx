import React from "react";
import TextoIcon from "../TextoIcon";
import styles from "./index.module.scss";
import { IoBookOutline } from "react-icons/io5";
import { FaHashtag } from "react-icons/fa";
import { RiBookLine } from "react-icons/ri";
import { LuCalendar } from "react-icons/lu";

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
        <TextoIcon
          nome="Número de páginas:"
          icon={<IoBookOutline />}
          descricao={`${paginas} páginas`}
          ariaLabel="Número de páginas"
        />

        <TextoIcon
          nome="Edição:"
          icon={<FaHashtag />}
          descricao={`${edicao}ª edição`}
          ariaLabel="Edição do livro"
        />

        <TextoIcon
          nome="Editora:"
          icon={<RiBookLine />}
          descricao={editora.nome}
          ariaLabel="Editora do livro"
        />

        <TextoIcon
          nome="Data de Publicação:"
          icon={<LuCalendar />}
          descricao={data}
          ariaLabel="Data de publicação"
        />
      </div>
    </div>
  );
};

export default InfoAdicionais;
