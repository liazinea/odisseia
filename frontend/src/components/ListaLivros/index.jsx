import styles from './index.module.scss';
import { MdOutlineEdit } from "react-icons/md";
import { IoMdTrash } from "react-icons/io";
import { formatDate } from '../../utils/formateDate';
import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import { ToastContainer, toast } from "react-toastify";
import { api } from '../../config/api';
import InputNumero from "../FormCadastro/InputNumero"; // Corrigido o caminho
import InputTexto from "../FormCadastro/InputTexto"; // Corrigido o caminho
import InputDate from "../FormCadastro/InputDate"; // Corrigido o caminho
import SelectEstante from "../FormCadastro/SelectEstante"; // Corrigido o caminho
import SelectGenero from "../FormCadastro/SelectGenero"; // Corrigido o caminho
import Classificacao from "../FormCadastro/SelectClassificacao"; // Corrigido o caminho
import InputCapa from "../FormCadastro/InputCapa"; // Corrigido o caminho
import InputSinopse from "../FormCadastro/InputSinopse"; // Corrigido o caminho
import SelectAutores from "../FormCadastro/SelectAutores"; // Corrigido o caminho
import { useForm } from "react-hook-form";
import useAutores from "../../hooks/useAutores";
import useGeneros from "../../hooks/useGeneros";
import BotaoCadastrar from "../FormCadastro/BotaoCadastrar";

Modal.setAppElement('#root');

const ListaLivros = ({ livro, buscaLivro }) => {
  const [livroSelecionado, setLivroSelecionado] = useState(null);
  const [modalEditarAberto, setModalEditarAberto] = useState(false);
  const [modalAberto, setModalAberto] = useState(false);
  const [apiMessage, setApiMessage] = useState([]);
  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
    trigger
  } = useForm();
  const { autores } = useAutores();
  const { generos } = useGeneros();

  const sucesso = () => toast("Livro editado com sucesso!");
  const erro = () => toast("Erro ao editar livro!");

  const onSubmit = async (data) => {
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        value.forEach((item, index) => {
          formData.append(`${key}[${index}]`, item);
        });
      } else if (key === "liv_capa" && value instanceof FileList) {
        formData.append(key, value[0]);
      } else {
        formData.append(key, value);
      }
    });

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
  };

  const abreModal = (livroRelacionado) => {
    setLivroSelecionado(livroRelacionado);
    setModalAberto(true);
  };

  const showModal = (livroRelacionado) => {
    setLivroSelecionado(livroRelacionado);
    setModalEditarAberto(true);
  };

  const fechaModal = () => {
    setModalAberto(false);
    setLivroSelecionado(null);
  };

  const closeModal = () => {
    setModalEditarAberto(false);
    setLivroSelecionado(null);
  };

  const deletarLivro = async (livroDeletado) => {
    try {
      const response = await api.delete(`/livros/${livroDeletado.id}`);
      console.log('Livro excluído com sucesso:', response.data);
      fechaModal();
      buscaLivro(); // Atualiza a lista após exclusão
    } catch (error) {
      console.error('Erro ao excluir o livro:', error);
    }
  };



  useEffect(() => {
    buscaLivro();
  }, [modalAberto]);

  return (
    <div className={styles.principal}>
      <div className={styles.body}>
        <div className={styles.data}>{formatDate(livro.dataPubli)}</div>
        <div className={styles.capa}>
          <img
            src={`http://127.0.0.1:8000/storage/${livro.capa}`}
            className={styles.imagem}
            alt="Capa do Livro"
          />
        </div>
        <div className={styles.titulo}>{livro.nome}</div>
        <div className={styles.num}>{livro.numRegistro}</div>
        <div className={styles.opcoes}>
          <div className={styles.editar} onClick={() => showModal(livro)}>
            <MdOutlineEdit size={30} />
          </div>
          <div className={styles.excluir} onClick={() => abreModal(livro)}>
            <IoMdTrash size={30} color="#C00F0C" />
          </div>

          {/* Modal de Edição */}
          <Modal
            isOpen={modalEditarAberto}
            onRequestClose={closeModal}
            contentLabel="Confirmar Exclusão"
            style={{
              content: {
                width: '400px',
                margin: 'auto',
                padding: '20px',
                borderRadius: '10px',
                textAlign: 'center',
              },
            }}
          >
            <div className={`${styles.modal} ${showModal ? styles.exibir : ""}`}>
              <div className={styles.conteudoModal}>
                <div className={styles.header}>
                  <h2>Editar Livro</h2>
                  <div className={styles.close} onClick={closeModal}>
                    X
                  </div>
                </div>
                <form
                  onSubmit={handleSubmit(async (data) => {
                    const isValid = await trigger()
                    if (!isValid) {
                      erro("Preencha todos os campos");
                      return
                    }
                    onSubmit(data);
                  })}
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
                        <SelectGenero errorsApi={apiMessage.liv_generos ? apiMessage.liv_generos : null} generos={generos} errors={errors} control={control} campo={'liv_generos'} register={register} titulo={"Gênero"}
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
                          <BotaoCadastrar className={styles.btn} />
                        </div>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </Modal>


          {/* Modal de Exclusão */}
          <Modal
            isOpen={modalAberto}
            onRequestClose={fechaModal}
            contentLabel="Confirmar Exclusão"
            style={{
              content: {
                width: '400px',
                margin: 'auto',
                padding: '20px',
                borderRadius: '10px',
                textAlign: 'center',
              },
            }}
          >
            <h2>Confirmação</h2>
            {livroSelecionado && (
              <p>
                Tem certeza de que deseja excluir o livro "<b>{livroSelecionado.nome}</b>"?
              </p>
            )}
            <div>
              <button
                style={{
                  marginRight: '10px',
                  padding: '10px 20px',
                  backgroundColor: '#d9534f',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '5px',
                  cursor: 'pointer',
                }}
                onClick={() => deletarLivro(livroSelecionado)}
              >
                Sim, Excluir
              </button>
              <button
                style={{
                  padding: '10px 20px',
                  backgroundColor: '#5bc0de',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '5px',
                  cursor: 'pointer',
                }}
                onClick={fechaModal}
              >
                Cancelar
              </button>
            </div>
          </Modal>
        </div>
      </div>
    </div>
  );
};

export default ListaLivros;
