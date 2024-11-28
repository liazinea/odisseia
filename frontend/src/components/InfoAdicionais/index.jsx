import React from 'react';
import TextoIcon from "../TextoIcon";
import styles from './index.module.scss';
import { IoBookOutline } from "react-icons/io5";
import { FaHashtag } from "react-icons/fa";
import { RiBookLine } from "react-icons/ri";
import { LuCalendar } from "react-icons/lu";


const InfoAdicionais = () => {

    return (
        <div className={styles.container}>

            <h3 className={styles.titulo}>Informações Adicionais:</h3>

            <div className={styles.itens}>
                <TextoIcon
                    nome="Número de páginas:"
                    icon={<IoBookOutline />}
                    descricao="100 páginas"
                />

                <TextoIcon
                    nome="Edição:"
                    icon={<FaHashtag />}
                    descricao="4ª"
                />

                <TextoIcon
                    nome="Editora:"
                    icon={<RiBookLine />}
                    descricao="Nome da Editora"
                />

                <TextoIcon
                    nome="Data de Publicação:"
                    icon={<LuCalendar />}
                    descricao="dd/mm/aaaa"
                />

            </div>

        </div>
    );
};

export default InfoAdicionais;