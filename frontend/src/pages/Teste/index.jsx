import React from "react";
import Livro from "../../components/Livro"; // Importando o componente Livro

const App = () => {
  const livro = {
    titulo: "O Senhor dos Anéis",
    subtitulo: "A Sociedade do Anel",
    capa: "https://a-static.mlcdn.com.br/1500x1500/livro-o-senhor-dos-aneis-a-sociedade-do-anel/magazineluiza/223950800/ddb9ab025710760a431b9dd5196bd963.jpg",
    classIndicativa: "+12", // Alterado para refletir uma classificação etária mais comum
    autor: "J.R.R. Tolkien",
    quantidadeLivros: 3, // A trilogia original tem 3 livros
    generos: ["Fantasia", "Aventura", "Drama"], 
    paginas: "576", 
    edicao: "1",
    editora: "HarperCollins",
    dataPublicacao: "2019"
  };
  

  return (
    <>
      {/* Chamando o componente Livro e passando as informações como prop */}
      <Livro livro={livro} />
    </>
  );
};

export default App;
