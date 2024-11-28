import styles from './index.module.scss';
import { MdOutlineEdit } from "react-icons/md";
import { IoMdTrash } from "react-icons/io";

const TabelaLivros = ({data, capa, titulo, numRegistro}) => {
  return (
    <div className={styles.principal}>
      <div className={styles.head}>
        <div className={styles.data}>Data de Cadastro</div>
        <div className={styles.capa}>Capa</div>
        <div className={styles.titulo}>Título</div>
        <div className={styles.num}>Número de Registro</div>
        <div className={styles.opcoes}>Opções</div>
      </div>
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

export default TabelaLivros