import React, { useState, useCallback } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa"; // Importa os ícones de seta para o dropdown
import styles from "./index.module.scss"; // Importa o arquivo de estilos SCSS

const StatusReserva = () => {
  // Estado para controlar se o dropdown está aberto ou fechado
  const [isOpen, setIsOpen] = useState(false);

  // Estado para armazenar o status selecionado
  const [selectedStatus, setSelectedStatus] = useState("RESERVADO");

  // Função que alterna entre aberto/fechado o dropdown
  const toggleDropdown = useCallback(() => {
    setIsOpen((prev) => !prev); // Altera o estado invertendo o valor atual
  }, []);

  // Função que atualiza o status selecionado e fecha o dropdown
  const handleStatusChange = useCallback((status) => {
    setSelectedStatus(status); // Atualiza o status selecionado
    setIsOpen(false); // Fecha o dropdown após a seleção
  }, []);

  // Lista de opções de status para o dropdown
  const statusOptions = ["DEVOLUÇÃO", "EMPRESTADO", "RESERVADO"];

  return (
    <div className={styles.dropdownContainer}>
      {/* Label indicando o título do dropdown */}
      <label className={styles.label}>STATUS DA RESERVA:</label>

      {/* Container do dropdown que alterna entre aberto e fechado */}
      <div
        className={`${styles.dropdown} ${isOpen ? styles.active : ""}`} // Aplica a classe 'active' se o dropdown estiver aberto
        onClick={toggleDropdown} // Alterna o estado de abertura/fechamento
        role="button" // Define que o div é um botão semântico
        aria-expanded={isOpen} // Acessibilidade: indica se o dropdown está aberto ou fechado
        aria-haspopup="listbox" // Acessibilidade: informa que o dropdown contém uma lista de opções
      >
        <div className={styles.selected}>
          <span>{selectedStatus}</span> {/* Exibe o status selecionado */}
        </div>
        <span className={styles.icon}>
          {isOpen ? <FaChevronUp /> : <FaChevronDown />}{" "}
          {/* Ícone da seta que muda dependendo do estado do dropdown */}
        </span>

        {/* Exibe as opções do dropdown somente se estiver aberto */}
        {isOpen && (
          <div className={`${styles.options} ${isOpen ? styles.active : ""}`}>
            {statusOptions
              .filter((status) => status !== selectedStatus) // Exclui o status selecionado da lista de opções
              .map((status) => (
                <div
                  key={status} // Chave única para cada item de opção
                  onClick={() => handleStatusChange(status)} // Atualiza o status ao clicar na opção
                  role="option" // Acessibilidade: define que cada div é uma opção do dropdown
                  aria-selected={status === selectedStatus} // Acessibilidade: indica a opção selecionada
                >
                  {status} {/* Exibe cada uma das opções do dropdown */}
                </div>
              ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default StatusReserva;
