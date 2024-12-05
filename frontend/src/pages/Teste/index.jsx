import React, { useState } from "react";
import ModalEditarLivro from "../../components/ModalEditar";

const Teste = () => {
  const [showModal, setShowModal] = useState(false);
  const [livroId, setLivroId] = useState(null);

  const openModal = (id) => {
    setLivroId(id);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setLivroId(null);
  };

  return (
    <div>
      <button onClick={() => openModal(1)}>Editar Livro</button>{" "}
      {/* Exemplo de abertura do modal */}
      <ModalEditarLivro
        showModal={showModal}
        onClose={closeModal}
        livroId={livroId}
      />
    </div>
  );
};

export default Teste;
