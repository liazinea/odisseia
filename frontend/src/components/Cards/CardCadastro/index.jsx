import React from "react";
import styles from "./index.module.scss";
import InputForm from "../../Inputs/InputForm";
import InputLivro from "../../Inputs/InputLivro";
import SelectLivro from "../../Inputs/SelectLivro";
import InputCapa from "../../Inputs/InputCapa";
import BotaoForm from "../../Botao/BotaoForm";
import InputTextArea from "../../Inputs/InputTextArea";

const CardCadastro = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  return (
    <div className={styles.form}>
      <div className={styles.fundo}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className={styles.dupla}>
            <div className={styles.input}>
              {" "}
              {/* Input Título */}
              <InputLivro
                type={"text"}
                nomeCampo={"titulo"}
                placeholder={"Título"}
                required={true}
                register={register}
                errors={errors}
                errorsApi={errorsApi}
              />
            </div>
            <div className={styles.input}>
              {" "}
              {/* Input ISBN */}
              <InputLivro
                type={"text"}
                nomeCampo={"isbn"}
                placeholder={"ISBN"}
                required={true}
                register={register}
                errors={errors}
                errorsApi={errorsApi}
              />
            </div>
            <div className={styles.inputCanto}>
              {" "}
              {/* Select Status */}
              <SelectLivro
                type={"text"}
                nomeCampo={"status"}
                placeholder={"Status"}
                required={true}
                register={register}
                errors={errors}
                errorsApi={errorsApi}
              />
            </div>
          </div>
          <div className={styles.alinhaCapa}>
            <div className={styles.blockDuplas}>
              <div className={styles.dupla}>
                <div className={styles.input}>
                  {/* Input N Registro */}
                  <InputLivro
                    type={"text"}
                    nomeCampo={"numRegistro"}
                    placeholder={"Número de Registro"}
                    required={true}
                    register={register}
                    errors={errors}
                    errorsApi={errorsApi}
                  />
                </div>
                <div className={styles.input}>
                  {/* Input Edição */}
                  <InputLivro
                    type={"text"}
                    nomeCampo={"edicao"}
                    placeholder={"Edição"}
                    required={true}
                    register={register}
                    errors={errors}
                    errorsApi={errorsApi}
                  />
                </div>
              </div>
              <div className={styles.dupla}>
                <div className={styles.input}>
                  {/* Select editora */}
                  <SelectLivro
                    type={"text"}
                    nomeCampo={"editora"}
                    placeholder={"Editora"}
                    required={true}
                    register={register}
                    errors={errors}
                    errorsApi={errorsApi}
                  />
                </div>
                <div className={styles.input}>
                  {/* Input data publi */}
                  <InputLivro
                    type={"date"}
                    nomeCampo={"dataPubli"}
                    placeholder={"Data de Publicação"}
                    required={true}
                    register={register}
                    errors={errors}
                    errorsApi={errorsApi}
                  />
                </div>
              </div>
              <div className={styles.dupla}>
                <div className={styles.input}>
                  {/* Input estante */}
                  <SelectLivro
                    type={"text"}
                    nomeCampo={"estante"}
                    placeholder={"Estante/Prateleira"}
                    required={true}
                    register={register}
                    errors={errors}
                    errorsApi={errorsApi}
                  />
                </div>
                <div className={styles.input}>
                  {/* Input Autor */}
                  <SelectLivro
                    type={"text"}
                    nomeCampo={"autor"}
                    placeholder={"Autor"}
                    required={true}
                    register={register}
                    errors={errors}
                    errorsApi={errorsApi}
                  />
                </div>
              </div>
              <div className={styles.dupla}>
                <div className={styles.input}>
                  {/* Input Genero */}
                  <SelectLivro
                    type={"text"}
                    nomeCampo={"genero"}
                    placeholder={"Gênero"}
                    required={true}
                    register={register}
                    errors={errors}
                    errorsApi={errorsApi}
                  />
                </div>
                <div className={styles.input}>
                  {/* Input Classificação */}
                  <SelectLivro
                    type={"text"}
                    nomeCampo={"classIndicativa"}
                    placeholder={"Classificação Indicativa"}
                    required={true}
                    register={register}
                    errors={errors}
                    errorsApi={errorsApi}
                  />
                </div>
              </div>
              <InputTextArea
                nomeCampo={"sinopse"}
                placeholder={"Sinopse"}
                required={true}
                register={register}
                errors={errors}
                errorsApi={errorsApi}
              />
            </div>
            <div className={styles.capaBtn}>
              <div className={styles.capa}>
                <InputCapa
                  campo={"liv_capa"}
                  titulo={"Capa"}
                  register={register}
                  errors={errors}
                  errorsApi={errorsApi}
                />
                <div className={styles.btn}>
                  <BotaoForm
                    type={"submit"}
                    nomeBotao={"cadastrar"}
                    texto={"Cadastrar"}
                  />
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CardCadastro;
