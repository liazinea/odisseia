import React from "react";
import Livro from "../../components/Livro"; // Importando o componente Livro

const App = () => {
  const livro = {
    titulo: "O Senhor dos Anéis",
    subtitulo: "A Irmandade do Anel",
    capa: "https://m.media-amazon.com/images/I/91k0NXj1+wL._AC_UF1000,1000_QL80_.jpg",
    classIndicativa: "L",
    autor: "J.R.R. Tolkien",
    quantidadeLivros: 12,
    generos: ["Fantasía", "Aventura", "Drama", "Doidera"],
    paginas: "160",
    edicao: "4",
    editora: "Sonhos de Verão",
    dataPublicacao: "10/06/1990",
  };

  return (
    <>
      {/* Chamando o componente Livro e passando as informações como prop */}
      <Livro livro={livro} />
    </>
  );
};

export default App;
