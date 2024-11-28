import React from 'react';
import TextoIcon from "../TextoIcon";
import styles from './index.module.scss';
import { IoBookOutline } from "react-icons/io5";
import { FaHashtag } from "react-icons/fa";
import { RiBookLine } from "react-icons/ri";
import { LuCalendar } from "react-icons/lu";


const InfoAdicionais = ({paginas, edicao, editora, data}) => {


    return (
        <div className={styles.container}>

            <h3 className={styles.titulo}>Informações Adicionais:</h3>

            <div className={styles.itens}>
                <TextoIcon
                    nome="Número de páginas:"
                    icon={<IoBookOutline />}
                    descricao={`${paginas} páginas`} //PARA NÃO ALTERNAR O TEXTO QUE NÃO MUDA, COLOCAR DESSE JEITO
                />

                <TextoIcon
                    nome="Edição:"
                    icon={<FaHashtag />}
                    descricao={`${edicao}ª edição`}
                />
                <TextoIcon
                    nome="Editora:"
                    icon={<RiBookLine />}
                    descricao={editora}
                />

                <TextoIcon
                    nome="Data de Publicação:"
                    icon={<LuCalendar />}
                    descricao={data}
                />
            </div>

        </div>
    );
};

export default InfoAdicionais;