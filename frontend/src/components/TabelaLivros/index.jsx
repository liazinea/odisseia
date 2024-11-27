import styles from './index.module.scss';

const TabelaLivros = ({data, capa, titulo, numRegistro}) => {
  return (
    <>
    <table className={styles.tabela}>
        <tr className={styles.head}>
            <th>Data de Cadastro</th>
            <th>Capa</th>
            <th>Título</th>
            <th>Número de Resgistro</th>
            <th>Opções</th>
        </tr>
        <tr>
            <td>{data}</td>
            <td><img src={capa} alt="" /></td>
            <td>{titulo}</td>
            <td>{numRegistro}</td>
            <td>
                <div>botao1</div>
                <div>botao2</div>
            </td>
        </tr>
    </table>
    </>
  )
}

export default TabelaLivros