import Modal from "react-modal";
import BotaoModal from "../../Botao/BotaoModal";
Modal.setAppElement("#root");

const ModalExcluir = ({
  textoModal,
  onClick,
  modalAberto,
  fechaModal,
  itemSelecionado,
}) => {
  return (
    <Modal
      isOpen={modalAberto}
      onRequestClose={fechaModal}
      contentLabel="Confirmar Exclusão"
      style={{
        content: {
          width: "90%", // Adaptação para dispositivos menores
          maxWidth: "400px", // Limita a largura máxima
          margin: "auto",
          padding: "20px",
          borderRadius: "12px",
          textAlign: "center",
          backgroundColor: "#DDC1A7", // Fundo branco
          maxHeight: "40vh", // Limita a altura do modal para 90% da altura da viewport
          overflowY: "auto", // Adiciona rolagem se o conteúdo ultrapassar a altura
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        },
        overlay: {
          backgroundColor: "rgba(0, 0, 0, 0.3)", // Fundo mais escuro para foco no modal
          display: "flex", // Centralização
          alignItems: "center",
          justifyContent: "center",
          zIndex: "1000", // Garantir prioridade sobre outros elementos
        },
      }}
    >
      <h2
        style={{
          fontSize: "1.5rem",
          marginBottom: "15px",
          color: "#002A3D",
        }}
      >
        Confirmação
      </h2>
      {itemSelecionado && (
        <p
          style={{
            marginBottom: "20px",
            lineHeight: "1.6",
            color: "#002A3D",
          }}
        >
          {textoModal}
        </p>
      )}
      <div
        style={{
          display: "flex",
          gap: "10px", // Espaço entre os botões
          justifyContent: "center",
        }}
      >
        <BotaoModal texto="Sim, excluir" onClick={onClick} destaque={true} />
        <BotaoModal texto="Cancelar" onClick={fechaModal} destaque={false} />
      </div>
    </Modal>
  );
};

export default ModalExcluir;
