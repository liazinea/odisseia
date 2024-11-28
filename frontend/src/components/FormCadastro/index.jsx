import styles from "./index.module.scss";
import InputNumero from "./InputNumero";
import InputTexto from "./InputTexto";
import InputDate from "./InputDate";
import SelectEstante from "./SelectEstante";
import SelectGenero from "./SelectGenero";

import React from "react";
import Classificacao from "./SelectClassificacao";
import InputCapa from "./InputCapa";
import InputSinopse from "./InputSinopse";
import BotaoCadastrar from "./BotaoCadastrar";



const FormCadastro = () => {
  return (
    <form action="#">
      
      <div className={styles.fundo}>

        <div className={styles.dupla}>
          <div className={styles.esquerdo}>
            <InputTexto titulo={"Título"} placeholder={"Digite o nome do livro"}
            />
          </div>
          <div className={styles.direito}>
            <InputTexto titulo={"ISBN"} placeholder={"Digite o ISBN do livro"}
            />
          </div>
        </div>

        <div className={styles.dupla}>
          <div className={styles.esquerdo}>
            <InputTexto titulo={"Número de Registro"} placeholder={"Digite o número de registro do livro"}
            />
          </div>
          <div className={styles.direito}>
            <InputNumero titulo={"Edição"} placeholder={"Digite a edição do livro"}
            />
          </div>
        </div>

        <div className={styles.dupla}>
          <div className={styles.esquerdo}>
            <InputNumero titulo={"Quantidade de páginas"} placeholder={"Digite o número de páginas do livro"}
            />
          </div>
          <div className={styles.direito}>
            <InputDate titulo={"Data de Publicação"} placeholder={"Digite a data de publicação do livro"}
            />
          </div>
        </div>

        <div className={styles.dupla}>
          <div className={styles.esquerdo}>
            <InputTexto titulo={"Editora"} placeholder={"Digite a editora do livro"}
            />
          </div>
          <div className={styles.direito}>
            <InputTexto titulo={"Autor"} placeholder={"Digite o Autor do livro"}
            />
          </div>
        </div>

        <div className={styles.dupla}>
          <div className={styles.esquerdo}>
            <SelectEstante titulo={"Prateleira/Estante"}
            />
          </div>
          <div className={styles.direito}>
            <SelectGenero titulo={"Gênero"} 
            />
          </div>
        </div>

        <div className={styles.ultimaDupla}>

          <div className={styles.classSinopse}>
          <div className={styles.classificacao}>
            <Classificacao titulo={"Classificação Indicativa"} placeholder={"Digite a classificação indicativa do livro"}
            />
          </div>
          <div className={styles.classificacao}>
            <InputSinopse titulo={"Sinopse"} placeholder={"Digite a sinopse do livro"}
            />
          </div>
          </div>
       
       <div className={styles.centraliza}>
          <div className={styles.capa}>
            <InputCapa titulo={"Capa"}
            />
            <BotaoCadastrar className={styles.btn}/>
            </div>
          </div>  
        </div>

      </div>
    </form>
  );
};
export default FormCadastro;
