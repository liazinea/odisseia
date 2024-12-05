import styles from "./index.module.scss";
import InputNumero from "../FormCadastro/InputNumero";
import InputTexto from "../FormCadastro//InputTexto";
import InputDate from "../FormCadastro//InputDate";
import SelectEstante from "../FormCadastro/SelectEstante";
import SelectGenero from "../FormCadastro/SelectGenero";

import React, { useEffect, useState } from "react";
import Classificacao from "../FormCadastro/SelectClassificacao";
import InputCapa from "../FormCadastro/InputCapa";
import InputSinopse from "../FormCadastro/InputSinopse";
import BotaoCadastrar from "../FormCadastro/BotaoCadastrar";

import { useForm } from 'react-hook-form';
import useAutores from "../../hooks/useAutores";
import SelectAutores from "../FormCadastro/SelectAutores";
import useGeneros from "../../hooks/useGeneros";
import { api } from "../../config/api";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const FormModal = ({modalEditarAberto = false, livro={}, closeModal}) => {
  
  const { register, handleSubmit, control, formState: { errors }, trigger, setValue } = useForm();
  const { autores } = useAutores()
  const { generos } = useGeneros()
  const sucesso = () => toast("Livro cadastrado com sucesso!");
  const erro = () => toast();
  const [apiMessage, setApiMessage] = useState([]);
  
  useEffect(()=>{
    if(modalEditarAberto){
      preencheModal();
    }
  }, [modalEditarAberto])

  console.log(livro.generos);

  function preencheModal(){
    setValue('liv_nome', livro.nome);
    setValue('liv_isbn', livro.isbn);
    setValue('liv_numRegistro', livro.numRegistro);
    setValue('liv_edicao', livro.edicao);
    setValue('liv_qtdPaginas', livro.qtdPaginas);
    setValue('liv_dataPubli', livro.dataPubli);
    //setValue('liv_editora', livro.editora.nome);
    setValue('liv_localizacao', livro.localizacao);
    setValue('liv_classIndicativa', livro.classIndicativa);
    setValue('liv_sinopse', livro.sinopse);
    setValue('liv_capa', livro.capa);
  };
  const onSubmit = async (data) => {
    console.log(setApiMessage)
    const formData = new FormData()
    const scrollToTop = () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth', 
      });
    };


    Object.entries(data).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        value.forEach((item, index) => {
          formData.append(`${key}[${index}]`, item);
        });
      } else if (key === "liv_capa" && value instanceof FileList) {
        console.log('Arquivo selecionado:', value[0]);
        formData.append(key, value[0]);
      } else {
        formData.append(key, value);
      }
    })
    if(modalEditarAberto){
      try {
        await api.put(`/livros/${livro.id}`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        sucesso();
        closeModal();
      } catch (error) {
        setApiMessage(error.response.data.errors);
        erro('Erro ao enviar dados');
        console.error("Erro ao editar livro:", error.response.data);
      }
    }else{
      try {
        const response = await api.post('/livros', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        sucesso();
      } catch (error) {
        setApiMessage(error.response.data.errors);
        erro('Erro ao enviar dados');
        scrollToTop()
        console.error('Erro ao enviar dados:', error)
      }
      }
  }
  console.log('autores',livro);

  return (

    <form
      onSubmit={handleSubmit(async (data) => {
        const isValid = await trigger()
        if (!isValid) {
          erro("Preencha todos os campos");
          return
        }
        onSubmit(data);
      })}
      className={styles.fomrulario}
    >
      <ToastContainer />
      <div className={styles.fundo}>
        <div className={styles.dupla}>
          <div className={styles.esquerdo}>
            <InputTexto
              campo={"liv_nome"}
              register={register}
              titulo={"Título"}
              placeholder={"Digite o nome do livro"}
              errors={errors}
              errorsApi={apiMessage.liv_nome ? apiMessage.liv_nome : null}
            />
          </div>
          <div className={styles.direito}>
            <InputTexto
              campo={"liv_isbn"}
              register={register}
              titulo={"ISBN"}
              placeholder={"Digite o ISBN do livro"}
              errorsApi={apiMessage.liv_isbn ? apiMessage.liv_isbn : null}
              errors={errors}
            />
          </div>
        </div>
        <div className={styles.dupla}>
          <div className={styles.esquerdo}>
            <InputTexto
              campo={"liv_numRegistro"}
              register={register}
              titulo={"Número de Registro"}
              placeholder={"Digite o número de registro do livro"}
              errors={errors}
              errorsApi={apiMessage.liv_numRegistro ? apiMessage.liv_numRegistro : null}
            />
          </div>
          <div className={styles.direito}>
            <InputNumero
              campo={"liv_edicao"}
              register={register}
              titulo={"Edição"}
              placeholder={"Digite a edição do livro"}
              errors={errors}
              errorsApi={apiMessage.liv_edicao ? apiMessage.liv_edicao : null}
            />
          </div>
        </div>

        <div className={styles.dupla}>
          <div className={styles.esquerdo}>
            <InputNumero errorsApi={apiMessage.liv_qtdPaginas ? apiMessage.liv_qtdPaginas : null} campo={'liv_qtdPaginas'} register={register} errors={errors} titulo={"Quantidade de páginas"} placeholder={"Digite o número de páginas do livro"}
            />
          </div>
          <div className={styles.direito}>
            <InputDate errorsApi={apiMessage.liv_dataPubl ? apiMessage.liv_dataPubli : null} register={register} errors={errors} campo={'liv_dataPubli'} titulo={"Data de Publicação"} placeholder={"Digite a data de publicação do livro"}
            />
          </div>
        </div>

        <div className={styles.dupla}>
          <div className={styles.esquerdo}>
            <InputTexto errorsApi={apiMessage.liv_editora ? apiMessage.liv_editora : null} campo={'liv_editora'} register={register} errors={errors} titulo={"Editora"} placeholder={"Digite a editora do livro"}
              
            />
          </div>
          <div className={styles.direito}>
            <SelectAutores
              defaultValues={livro.autores}
              errorsApi={apiMessage.liv_autores ? apiMessage.liv_autores : null}
              autores={autores} control={control} errors={errors} campo={'liv_autores'} register={register} titulo={"Autor"} placeholder={"Digite o Autor do livro"}
            />
          </div>
        </div>

        <div className={styles.dupla}>
          <div className={styles.esquerdo}>
            <SelectEstante errorsApi={apiMessage.liv_localizacao ? apiMessage.liv_localizacao : null} estantes={generos} errors={errors} campo={'liv_localizacao'} register={register} titulo={"Prateleira/Estante"}
            />
          </div>
          <div className={styles.direito}>
            <SelectGenero defaultValues={livro.generos} errorsApi={apiMessage.liv_generos ? apiMessage.liv_generos : null} generos={generos} errors={errors} control={control} campo={'liv_generos'} register={register} titulo={"Gênero"}
            />
          </div>
        </div>

        <div className={styles.ultimaDupla}>

          <div className={styles.classSinopse}>
            <div className={styles.classificacao}>
              <Classificacao errorsApi={apiMessage.liv_classIndicativa ? apiMessage.liv_classIndicativa : null} campo={'liv_classIndicativa'} errors={errors} register={register} titulo={"Classificação Indicativa"} placeholder={"Digite a classificação indicativa do livro"}
              />
            </div>
            <div className={styles.classificacao}>
              <InputSinopse errorsApi={apiMessage.liv_sinopse ? apiMessage.liv_sinopse : null} campo={'liv_sinopse'} errors={errors} register={register} titulo={"Sinopse"} placeholder={"Digite a sinopse do livro"}
              />
            </div>
          </div>

          <div className={styles.centraliza}>
            <div className={styles.capa}>
              <InputCapa errorsApi={apiMessage.liv_capa ? apiMessage.liv_capa : null} campo={'liv_capa'} register={register} titulo={"Capa"} errors={errors}
              />
              <div className={styles.botao}>
                <BotaoCadastrar className={styles.btn} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  )
}
export default FormModal;
