import { useParams } from 'react-router-dom';

const PaginaPesquisa = () => {
  const { termo } = useParams();

  return <h1>Termo da pesquisa: {termo}</h1>;
}

export default PaginaPesquisa;