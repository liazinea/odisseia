import React from "react";
import { useForm } from "react-hook-form";
import SelectCriavel from "../../components/Inputs/SelectCriavel";

const Teste = () => {
  const { control, handleSubmit, formState: { errors } } = useForm();

  const autores = [
    { label: "Autor 1", value: "Autor 1" },
    { label: "Autor 2", value: "Autor 2" },
    { label: "Autor 3", value: "Autor 3" },
  ];

  const onSubmit = (data) => {
    console.log("Dados enviados:", data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <SelectCriavel
        nomeCampo="liv_autores"
        placeholder="Autores"
        values={autores}
        control={control}
        rules={{ required: "Campo obrigatório" }}
        error={errors?.liv_autores}
        isMulti={true}
      />
      <button type="submit">Enviar</button>
    </form>
  );
};

export default Teste;
