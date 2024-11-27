import React, { useState } from "react";
import Button from "../../components/Button"; // Certifique-se de que o caminho esteja correto para o arquivo Button.js

const App = () => {
  const [isDisabled, setIsDisabled] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleToggleDisabled = () => {
    setIsDisabled(!isDisabled);
  };

  const handleToggleLoading = () => {
    setIsLoading(!isLoading);
  };

  return (
    <div style={{ backgroundColor: "#fff", color: "#000" }}>      
      <h1>Testando Botões</h1>

      {/* Variantes */}
      <div>
        <h2>Variantes</h2>
        <Button variant="primary" isLoading={isLoading} disabled={isDisabled}>
          Variant primary
        </Button>{" "}
        <br />
        <Button variant="secondary" isLoading={isLoading} disabled={isDisabled}>
          Variant secondary
        </Button>{" "}
        <br />
        <Button variant="tertiary" isLoading={isLoading} disabled={isDisabled}>
          Variant tertiary
        </Button>{" "}
        <br />
        <Button
          variant="quaternary"
          isLoading={isLoading}
          disabled={isDisabled}
        >
          Variant quaternary
        </Button>{" "}
        <br />
        <Button variant="danger" isLoading={isLoading} disabled={isDisabled}>
          Variant danger
        </Button>
      </div>

      {/* Tamanhos */}
      <div>
        <h2>Tamanhos</h2>
        <h3>Tamanho micro</h3>
        <Button size="micro" isLoading={isLoading} disabled={isDisabled}>
          Size
        </Button>{" "}
        <br />
        <h3>Tamanho extra-small</h3>
        <Button size="extra-small" isLoading={isLoading} disabled={isDisabled}>
          Size
        </Button>{" "}
        <br />
        <h3>Tamanho small</h3>
        <Button size="small" isLoading={isLoading} disabled={isDisabled}>
          Size
        </Button>{" "}
        <br />
        <h3>Tamanho medium</h3>
        <Button size="medium" isLoading={isLoading} disabled={isDisabled}>
          Size
        </Button>{" "}
        <br />
        <h3>Tamanho large</h3>
        <Button size="large" isLoading={isLoading} disabled={isDisabled}>
          Size
        </Button>{" "}
        <br />
        <h3>Tamanho extra-large</h3>
        <Button size="extra-large" isLoading={isLoading} disabled={isDisabled}>
          Size
        </Button>
      </div>

      {/* Toggle Disabled */}
      <div>
        <h2>Toggle Disabled</h2>
        <Button size="small" onClick={handleToggleDisabled}>
          {isDisabled ? "Habilitar Botões" : "Desabilitar Botões"}
        </Button>
      </div>

      {/* Toggle Loading */}
      <div>
        <h2>Toggle Loading</h2>
        <Button size="small" onClick={handleToggleLoading}>
          {isLoading ? "Parar Carregando" : "Iniciar Carregando"}
        </Button>
      </div>
    </div>
  );
};

export default App;
