import React, { useState } from "react";
import Button from "../../components/Button";

const ButtonTest = () => {
  const [isLoading, setIsLoading] = useState(false);

  const handleButtonClick = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 2000); // Simula um processo de carregamento de 2 segundos
  };

  return (
    <div className="button-test-container" style={{ padding: "20px" }}>
      <h2>Testando o Componente Button</h2>

      {/* Botões de diferentes variantes */}
      <div style={{ marginBottom: "15px" }}>
        <h3>Variante Primary</h3>
        <Button variant="primary" isLoading={isLoading} onClick={handleButtonClick}>
          Primary Button
        </Button>
      </div>

      <div style={{ marginBottom: "15px" }}>
        <h3>Variante Secondary</h3>
        <Button variant="secondary" onClick={handleButtonClick}>
          Secondary Button
        </Button>
      </div>

      <div style={{ marginBottom: "15px" }}>
        <h3>Variante Danger</h3>
        <Button variant="danger" onClick={handleButtonClick}>
          Danger Button
        </Button>
      </div>

      {/* Botões de diferentes tamanhos */}
      <div style={{ marginBottom: "15px" }}>
        <h3>Tamanho Small</h3>
        <Button size="small" onClick={handleButtonClick}>
          Small Button
        </Button>
      </div>

      <div style={{ marginBottom: "15px" }}>
        <h3>Tamanho Medium</h3>
        <Button size="medium" onClick={handleButtonClick}>
          Medium Button
        </Button>
      </div>

      <div style={{ marginBottom: "15px" }}>
        <h3>Tamanho Large</h3>
        <Button size="large" onClick={handleButtonClick}>
          Large Button
        </Button>
      </div>

      {/* Testando o estado de carregamento */}
      <div style={{ marginBottom: "15px" }}>
        <h3>Botão com Carregamento (Loading)</h3>
        <Button variant="primary" isLoading={isLoading} onClick={handleButtonClick}>
          {isLoading ? "Carregando..." : "Clique para Carregar"}
        </Button>
      </div>

      {/* Botão desabilitado */}
      <div style={{ marginBottom: "15px" }}>
        <h3>Botão Desabilitado</h3>
        <Button variant="secondary" disabled>
          Botão Desabilitado
        </Button>
      </div>
      
      <div style={{ marginBottom: "15px" }}>
        <h3>Botão Desabilitado com Carregamento</h3>
        <Button variant="danger" isLoading={true} disabled>
          Botão Desabilitado com Carregamento
        </Button>
      </div>
    </div>
  );
};

export default ButtonTest;
