import Sinopse from "../../components/Sinopse"

const App = () => {

  const sinopse = `O Senhor dos Anéis é um livro de alta fantasia, escrito pelo escritor britânico J. R. R. Tolkien. Escrita entre 1937 e 1949, com muitas partes criadas durante a Segunda Guerra Mundial, a saga é uma continuação de O Hobbit.`

  return (
    <>
      <Sinopse sinopse={sinopse}/>
    </>
  );
};

export default App;
