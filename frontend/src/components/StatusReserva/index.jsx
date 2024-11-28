import React, { useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa"; // Importa os ícones do React-Icons
import styles from "./index.module.scss"; // Importa os estilos SCSS

const StatusReserva = () => {
  // Estado para controlar se o dropdown está aberto ou fechado
  const [isOpen, setIsOpen] = useState(false);

  // Estado para armazenar o status selecionado
  const [selectedStatus, setSelectedStatus] = useState("RESERVADO");

  // Função para alternar entre aberto/fechado o dropdown
  const toggleDropdown = () => setIsOpen(!isOpen);

  // Função para alterar o status selecionado
  const handleStatusChange = (status) => {
    setSelectedStatus(status);
    setIsOpen(false); // Fecha o dropdown após a seleção
  };

  // Lista de opções de status
  const statusOptions = ["DEVOLUÇÃO", "EMPRESTADO", "RESERVADO"];

  return (
    <div className={styles.dropdownContainer}>
      {/* Label indicando o título do dropdown */}
      <label className={styles.label}>STATUS DA RESERVA:</label>
      
      {/* Dropdown principal, alterna entre aberto e fechado */}
      <div
        className={`${styles.dropdown} ${isOpen ? styles.active : ""}`} 
        onClick={toggleDropdown} // Alterna o estado de abertura
      >
        <div className={styles.selected}>
          <span>{selectedStatus}</span> {/* Exibe o status selecionado */}
        </div>
        
        {/* Ícone que alterna entre seta para cima ou para baixo */}
        <span className={styles.icon}>
          {isOpen ? <FaChevronUp /> : <FaChevronDown />}
        </span>
      </div>

      {/* Exibe as opções quando o dropdown está aberto */}
      {isOpen && (
        <div className={styles.options}>
          {statusOptions
            .filter((status) => status !== selectedStatus) // Filtra a opção selecionada
            .map((status) => (
              <div key={status} onClick={() => handleStatusChange(status)}>
                {status} {/* Exibe cada opção do dropdown */}
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

export default StatusReserva;
