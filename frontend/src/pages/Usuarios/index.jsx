import { useState, useEffect } from "react";
import HeaderPagina from "../../components/layout/HeaderPagina";
import styles from "./index.module.scss";
import Button from "../../components/Botao/Botao";
import Input from "../../components/Inputs/Input";
import BarraPesquisa from "../../components/layout/HeaderHome/BarraPesquisa";
import ListaUsuarios from "../../components/layout/ListaUsuarios";
import useUsuarios from "../../hooks/useUsuarios";
import { useAuth } from "../../context/AuthContext";

const Usuarios = () => {
  const {token, userType} = useAuth(  )
  const {buscaUsuarios} = useUsuarios()
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (value) => {
    setInputValue(value);
  };

  const [formData, setFormData] = useState({
    nome: "",
    dataNascimento: "",
    email: "",
    rg: "",
  });

  const handleCadastroInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleButtonClick = () => {
    console.log("Dados do formulário:", formData);
  };

  const [usuarios, setUsuarios] = useState([]);

  useEffect(() => {
    const carregarUsuarios = async () => {
      const dados = await buscaUsuarios();
      setUsuarios(dados);
    };
    carregarUsuarios();
  }, []);

  useEffect(() => {
    if (!token || userType != 1) {
      navigate('/')
    }
  }, [token])

  console.log(usuarios)

  return (
    <>
      <HeaderPagina titulo="Lista de usuários" />
      <div className={styles["barra-pesquisa"]}>
        <BarraPesquisa
          placeholder="Pesquise por um usuário"
          onChange={handleInputChange}
        />
      </div>
      <div className={styles["container-geral"]}>
        <div className={styles["container-exibir"]}>
          <div className={styles["titulo"]}>
            <h2>Usuários cadastrados</h2>
          </div>
          <div className={styles["tabela"]}>
            <div className={styles.head}>
              <div className={styles.nome}>Nome do aluno</div>
              <div className={styles.opcoes}>Opções</div>
            </div>
            <div className={styles.conteudo}>
              {usuarios.map((usuario) => (
                <div className={styles["linha"]} key={usuario.id}>
                  <ListaUsuarios usuario={usuario} />
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className={styles["container-cadastro"]}>
          <div className={styles["titulo"]}>
            <h2>Cadastrar novo usuário</h2>
          </div>
          <div className={styles["inputs"]}>
            <div className={styles["input"]}>
              <label htmlFor="nome">Nome:</label>
              <Input
                type="text"
                name="nome"
                placeholder="Digite o nome completo do aluno"
                required={true}
                value={formData.nome}
                onChange={(value) => setFormData({ ...formData, nome: value })} // Corrigido
              />
            </div>
            <div className={styles["input"]}>
              <label htmlFor="dataNascimento">Data de nascimento:</label>
              <Input
                type="text"
                name="dataNascimento"
                placeholder="dd/mm/aaaa"
                required={true}
                value={formData.dataNascimento}
                onChange={(value) =>
                  setFormData({ ...formData, dataNascimento: value })
                } // Corrigido
              />
            </div>
            <div className={styles["input"]}>
              <label htmlFor="email">E-mail</label>
              <Input
                type="text"
                name="email"
                placeholder="Digite o e-mail do aluno"
                required={true}
                value={formData.email}
                onChange={(value) => setFormData({ ...formData, email: value })} // Corrigido
              />
            </div>
            <div className={styles["input"]}>
              <label htmlFor="rg">RG:</label>
              <Input
                type="text"
                name="rg"
                placeholder="xx.xxx.xxx-x"
                required={true}
                value={formData.rg}
                onChange={(value) => setFormData({ ...formData, rg: value })} // Corrigido
              />
            </div>
          </div>
          <div className={styles["botao"]}>
            <Button
              type="button"
              nomeBotao="cadastrar"
              texto="Criar usuário"
              onClick={handleButtonClick}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Usuarios;
