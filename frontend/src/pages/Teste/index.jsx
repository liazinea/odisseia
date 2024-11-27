import React, { useState } from "react";
import Button from "../../components/Button"; // Certifique-se de que o caminho esteja correto para o arquivo Button.js
import Navbar from "../../components/Navbar"


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
    <div style={{backgroundColor: '#111', color: 'white'}}>

      <Navbar></Navbar>

      <h1>Testando Botões</h1>
      
      {/* Variantes */}
      <div>
        <h2>Variantes</h2>
        <Button variant="primary" isLoading={isLoading} disabled={isDisabled}>Variant primary</Button>
        <Button variant="secondary" isLoading={isLoading} disabled={isDisabled}>Variant secondary</Button>
        <Button variant="tertiary" isLoading={isLoading} disabled={isDisabled}>Variant tertiary</Button>
        <Button variant="quaternary" isLoading={isLoading} disabled={isDisabled}>Variant quaternary</Button>
        <Button variant="danger" isLoading={isLoading} disabled={isDisabled}>Variant danger</Button>
      </div>

      {/* Tamanhos */}
      <div>
        <h2>Tamanhos</h2>
        <Button size="small" isLoading={isLoading} disabled={isDisabled}>Size small</Button>
        <Button size="medium" isLoading={isLoading} disabled={isDisabled}>Size medium</Button>
        <Button size="large" isLoading={isLoading} disabled={isDisabled}>Size large</Button>
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
