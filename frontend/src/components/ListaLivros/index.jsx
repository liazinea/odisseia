import styles from './index.module.scss';
import { MdOutlineEdit } from "react-icons/md";
import { IoMdTrash } from "react-icons/io";

const ListaLivros = ({data, capa, titulo, numRegistro}) => {
  return (
    <div className={styles.principal}>
      
      <div className={styles.body}>
        <div className={styles.data}>{data}</div>
        <div className={styles.capa}><img src={capa} className={styles.imagem}/></div>
        <div className={styles.titulo}>{titulo}</div>
        <div className={styles.num}>{numRegistro}</div>
        <div className={styles.opcoes}>
          <MdOutlineEdit size={30} />
          <IoMdTrash size={30} color='#C00F0C'/>
        </div>
      </div>
    </div>
  )
}

export default ListaLivros