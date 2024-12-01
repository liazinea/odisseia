import React from "react";
import Livro from "../../components/Livro"; // Importando o componente Livro

const App = () => {
  const livro = {
    titulo: "O Senhor dos Anéis",
    subtitulo: "A Sociedade do Anel",
    capa: "https://a-static.mlcdn.com.br/1500x1500/livro-o-senhor-dos-aneis-a-sociedade-do-anel/magazineluiza/223950800/ddb9ab025710760a431b9dd5196bd963.jpg",
    sinopse:
      "Numa terra fantástica e única, chamada Terra-Média, um hobbit (seres de estatura entre 80 cm e 1,20 m, com pés peludos e bochechas um pouco avermelhadas) recebe de presente de seu tio o Um Anel, um anel mágico e maligno que precisa ser destruído antes que caia nas mãos do mal. Para isso o hobbit Frodo (Elijah Woods) terá um caminho árduo pela frente, onde encontrará perigo, medo e personagens bizarros. Ao seu lado para o cumprimento desta jornada aos poucos ele poderá contar com outros hobbits, um elfo, um anão, dois humanos e um mago, totalizando 9 pessoas que formarão a Sociedade do Anel.",
    classIndicativa: "+12", // Alterado para refletir uma classificação etária mais comum
    autor: "J.R.R. Tolkien",
    quantidadeLivros: 3, // A trilogia original tem 3 livros
    generos: ["Fantasia", "Aventura", "Drama"],
    paginas: "576",
    edicao: "1",
    editora: "HarperCollins",
    dataPublicacao: "2019",
  };

  return (
    <>
      {/* Chamando o componente Livro e passando as informações como prop */}
      <Livro livro={livro} />
    </>
  );
};

export default App;
