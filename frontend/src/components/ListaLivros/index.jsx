import styles from './index.module.scss';
import { MdOutlineEdit } from "react-icons/md";
import { IoMdTrash } from "react-icons/io";

const ListaLivros = ({livro}) => { // Agora o console.log está fora das chaves
    return (
      <div className={styles.principal}>
        <div className={styles.body}>
          <div className={styles.data}>{livro.dataPubli}</div>
          <div className={styles.capa}>
            <img src={livro.capa} className={styles.imagem} alt="Capa do Livro" />
          </div>
          <div className={styles.titulo}>{livro.nome}</div>
          <div className={styles.num}>{livro.numRegistro}</div>
          <div className={styles.opcoes}>
            <MdOutlineEdit size={30} />
            <IoMdTrash size={30} color="#C00F0C" />
          </div>
        </div>
      </div>
    );  
}

export default ListaLivros