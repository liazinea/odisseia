import HeaderPagina from "../../components/layout/HeaderPagina";
import TabelaLivros from "../../components/Tabelas/TabelaLivros";
import styles from "./index.module.scss";

const LivrosCadastrados = () => {
  return (
    <div className={styles.principal}>
      <HeaderPagina titulo={"Livros Cadastrados"} />
      <TabelaLivros
        livros={[
          {
            liv_id: 1,
            liv_isbn: "978-8550303185",
            liv_numRegistro: "rn568561",
            liv_nome: "Rapunzel e a Lagoa Perdida",
            liv_qtdPaginas: 288,
            liv_dataPubli: "2020-31-01",
            edi_id: 5,
            liv_edicao: 1,
            liv_classIndicativa: "Livre",
            liv_localizacao: "Infantil",
            liv_sinopse:
              "Rapunzel não é uma princesa convencional. Ela voltou para o reino após passar dezoito anos aprisionada em uma torre e ainda está conhecendo os pais. Agora, tem que se habituar aos costumes da realeza, aos modos corretos de se sentar e fazer reverências, quando o que preferia mesmo era escalar árvores e pintar.Cassandra não é uma dama de companhia comum. Sendo filha do capitão da guarda, ela cresceu fascinada pelo ofício de proteger e por armamentos. Seu objetivo de vida era se tornar um membro da guarda, e se tornar uma dama de companhia não se enquadra exatamente em seus planos – em particular quando o namorado irritante da princesa está sempre por perto.Contudo, quando Rapunzel e Cassandra se deparam com uma lagoa secreta, cuja fama é de resguardar o maior poder do reino, caberá a elas solucionar o mistério… antes que o inimigo o faça.",
            liv_capa:
              "https://m.media-amazon.com/images/I/91hL3UwM6dL._SY385_.jpg",
            liv_status_ativo: true,
            created_at: "2025-04-12",
            updated_at: "2025-04-12",
          },
          {
            liv_id: 2,
            liv_isbn: "978-8550303185",
            liv_numRegistro: "rn568561",
            liv_nome: "Rapunzel e a Lagoa Perdida",
            liv_qtdPaginas: 288,
            liv_dataPubli: "2020-31-01",
            edi_id: 5,
            liv_edicao: 1,
            liv_classIndicativa: "Livre",
            liv_localizacao: "Infantil",
            liv_sinopse:
              "Rapunzel não é uma princesa convencional. Ela voltou para o reino após passar dezoito anos aprisionada em uma torre e ainda está conhecendo os pais. Agora, tem que se habituar aos costumes da realeza, aos modos corretos de se sentar e fazer reverências, quando o que preferia mesmo era escalar árvores e pintar.Cassandra não é uma dama de companhia comum. Sendo filha do capitão da guarda, ela cresceu fascinada pelo ofício de proteger e por armamentos. Seu objetivo de vida era se tornar um membro da guarda, e se tornar uma dama de companhia não se enquadra exatamente em seus planos – em particular quando o namorado irritante da princesa está sempre por perto.Contudo, quando Rapunzel e Cassandra se deparam com uma lagoa secreta, cuja fama é de resguardar o maior poder do reino, caberá a elas solucionar o mistério… antes que o inimigo o faça.",
            liv_capa:
              "https://m.media-amazon.com/images/I/91hL3UwM6dL._SY385_.jpg",
            liv_status_ativo: true,
            created_at: "2025-04-12",
            updated_at: "2025-04-12",
          },
          {
            liv_id: 3,
            liv_isbn: "978-8550303185",
            liv_numRegistro: "rn568561",
            liv_nome: "Rapunzel e a Lagoa Perdida",
            liv_qtdPaginas: 288,
            liv_dataPubli: "2020-31-01",
            edi_id: 5,
            liv_edicao: 1,
            liv_classIndicativa: "Livre",
            liv_localizacao: "Infantil",
            liv_sinopse:
              "Rapunzel não é uma princesa convencional. Ela voltou para o reino após passar dezoito anos aprisionada em uma torre e ainda está conhecendo os pais. Agora, tem que se habituar aos costumes da realeza, aos modos corretos de se sentar e fazer reverências, quando o que preferia mesmo era escalar árvores e pintar.Cassandra não é uma dama de companhia comum. Sendo filha do capitão da guarda, ela cresceu fascinada pelo ofício de proteger e por armamentos. Seu objetivo de vida era se tornar um membro da guarda, e se tornar uma dama de companhia não se enquadra exatamente em seus planos – em particular quando o namorado irritante da princesa está sempre por perto.Contudo, quando Rapunzel e Cassandra se deparam com uma lagoa secreta, cuja fama é de resguardar o maior poder do reino, caberá a elas solucionar o mistério… antes que o inimigo o faça.",
            liv_capa:
              "https://m.media-amazon.com/images/I/91hL3UwM6dL._SY385_.jpg",
            liv_status_ativo: true,
            created_at: "2025-04-12",
            updated_at: "2025-04-12",
          },
          {
            liv_id: 4,
            liv_isbn: "978-8550303185",
            liv_numRegistro: "rn568561",
            liv_nome: "Rapunzel e a Lagoa Perdida",
            liv_qtdPaginas: 288,
            liv_dataPubli: "2020-31-01",
            edi_id: 5,
            liv_edicao: 1,
            liv_classIndicativa: "Livre",
            liv_localizacao: "Infantil",
            liv_sinopse:
              "Rapunzel não é uma princesa convencional. Ela voltou para o reino após passar dezoito anos aprisionada em uma torre e ainda está conhecendo os pais. Agora, tem que se habituar aos costumes da realeza, aos modos corretos de se sentar e fazer reverências, quando o que preferia mesmo era escalar árvores e pintar.Cassandra não é uma dama de companhia comum. Sendo filha do capitão da guarda, ela cresceu fascinada pelo ofício de proteger e por armamentos. Seu objetivo de vida era se tornar um membro da guarda, e se tornar uma dama de companhia não se enquadra exatamente em seus planos – em particular quando o namorado irritante da princesa está sempre por perto.Contudo, quando Rapunzel e Cassandra se deparam com uma lagoa secreta, cuja fama é de resguardar o maior poder do reino, caberá a elas solucionar o mistério… antes que o inimigo o faça.",
            liv_capa:
              "https://m.media-amazon.com/images/I/91hL3UwM6dL._SY385_.jpg",
            liv_status_ativo: true,
            created_at: "2025-04-12",
            updated_at: "2025-04-12",
          },
          {
            liv_id: 5,
            liv_isbn: "978-8550303185",
            liv_numRegistro: "rn568561",
            liv_nome: "Rapunzel e a Lagoa Perdida",
            liv_qtdPaginas: 288,
            liv_dataPubli: "2020-31-01",
            edi_id: 5,
            liv_edicao: 1,
            liv_classIndicativa: "Livre",
            liv_localizacao: "Infantil",
            liv_sinopse:
              "Rapunzel não é uma princesa convencional. Ela voltou para o reino após passar dezoito anos aprisionada em uma torre e ainda está conhecendo os pais. Agora, tem que se habituar aos costumes da realeza, aos modos corretos de se sentar e fazer reverências, quando o que preferia mesmo era escalar árvores e pintar.Cassandra não é uma dama de companhia comum. Sendo filha do capitão da guarda, ela cresceu fascinada pelo ofício de proteger e por armamentos. Seu objetivo de vida era se tornar um membro da guarda, e se tornar uma dama de companhia não se enquadra exatamente em seus planos – em particular quando o namorado irritante da princesa está sempre por perto.Contudo, quando Rapunzel e Cassandra se deparam com uma lagoa secreta, cuja fama é de resguardar o maior poder do reino, caberá a elas solucionar o mistério… antes que o inimigo o faça.",
            liv_capa:
              "https://m.media-amazon.com/images/I/91hL3UwM6dL._SY385_.jpg",
            liv_status_ativo: true,
            created_at: "2025-04-12",
            updated_at: "2025-04-12",
          },
          {
            liv_id: 6,
            liv_isbn: "978-8550303185",
            liv_numRegistro: "rn568561",
            liv_nome: "Rapunzel e a Lagoa Perdida",
            liv_qtdPaginas: 288,
            liv_dataPubli: "2020-31-01",
            edi_id: 5,
            liv_edicao: 1,
            liv_classIndicativa: "Livre",
            liv_localizacao: "Infantil",
            liv_sinopse:
              "Rapunzel não é uma princesa convencional. Ela voltou para o reino após passar dezoito anos aprisionada em uma torre e ainda está conhecendo os pais. Agora, tem que se habituar aos costumes da realeza, aos modos corretos de se sentar e fazer reverências, quando o que preferia mesmo era escalar árvores e pintar.Cassandra não é uma dama de companhia comum. Sendo filha do capitão da guarda, ela cresceu fascinada pelo ofício de proteger e por armamentos. Seu objetivo de vida era se tornar um membro da guarda, e se tornar uma dama de companhia não se enquadra exatamente em seus planos – em particular quando o namorado irritante da princesa está sempre por perto.Contudo, quando Rapunzel e Cassandra se deparam com uma lagoa secreta, cuja fama é de resguardar o maior poder do reino, caberá a elas solucionar o mistério… antes que o inimigo o faça.",
            liv_capa:
              "https://m.media-amazon.com/images/I/91hL3UwM6dL._SY385_.jpg",
            liv_status_ativo: true,
            created_at: "2025-04-12",
            updated_at: "2025-04-12",
          },
          {
            liv_id: 7,
            liv_isbn: "978-8550303185",
            liv_numRegistro: "rn568561",
            liv_nome: "Rapunzel e a Lagoa Perdida",
            liv_qtdPaginas: 288,
            liv_dataPubli: "2020-31-01",
            edi_id: 5,
            liv_edicao: 1,
            liv_classIndicativa: "Livre",
            liv_localizacao: "Infantil",
            liv_sinopse:
              "Rapunzel não é uma princesa convencional. Ela voltou para o reino após passar dezoito anos aprisionada em uma torre e ainda está conhecendo os pais. Agora, tem que se habituar aos costumes da realeza, aos modos corretos de se sentar e fazer reverências, quando o que preferia mesmo era escalar árvores e pintar.Cassandra não é uma dama de companhia comum. Sendo filha do capitão da guarda, ela cresceu fascinada pelo ofício de proteger e por armamentos. Seu objetivo de vida era se tornar um membro da guarda, e se tornar uma dama de companhia não se enquadra exatamente em seus planos – em particular quando o namorado irritante da princesa está sempre por perto.Contudo, quando Rapunzel e Cassandra se deparam com uma lagoa secreta, cuja fama é de resguardar o maior poder do reino, caberá a elas solucionar o mistério… antes que o inimigo o faça.",
            liv_capa:
              "https://m.media-amazon.com/images/I/91hL3UwM6dL._SY385_.jpg",
            liv_status_ativo: true,
            created_at: "2025-04-12",
            updated_at: "2025-04-12",
          },
          {
            liv_id: 8,
            liv_isbn: "978-8550303185",
            liv_numRegistro: "rn568561",
            liv_nome: "Rapunzel e a Lagoa Perdida",
            liv_qtdPaginas: 288,
            liv_dataPubli: "2020-31-01",
            edi_id: 5,
            liv_edicao: 1,
            liv_classIndicativa: "Livre",
            liv_localizacao: "Infantil",
            liv_sinopse:
              "Rapunzel não é uma princesa convencional. Ela voltou para o reino após passar dezoito anos aprisionada em uma torre e ainda está conhecendo os pais. Agora, tem que se habituar aos costumes da realeza, aos modos corretos de se sentar e fazer reverências, quando o que preferia mesmo era escalar árvores e pintar.Cassandra não é uma dama de companhia comum. Sendo filha do capitão da guarda, ela cresceu fascinada pelo ofício de proteger e por armamentos. Seu objetivo de vida era se tornar um membro da guarda, e se tornar uma dama de companhia não se enquadra exatamente em seus planos – em particular quando o namorado irritante da princesa está sempre por perto.Contudo, quando Rapunzel e Cassandra se deparam com uma lagoa secreta, cuja fama é de resguardar o maior poder do reino, caberá a elas solucionar o mistério… antes que o inimigo o faça.",
            liv_capa:
              "https://m.media-amazon.com/images/I/91hL3UwM6dL._SY385_.jpg",
            liv_status_ativo: true,
            created_at: "2025-04-12",
            updated_at: "2025-04-12",
          },
          {
            liv_id: 9,
            liv_isbn: "978-8550303185",
            liv_numRegistro: "rn568561",
            liv_nome: "Rapunzel e a Lagoa Perdida",
            liv_qtdPaginas: 288,
            liv_dataPubli: "2020-31-01",
            edi_id: 5,
            liv_edicao: 1,
            liv_classIndicativa: "Livre",
            liv_localizacao: "Infantil",
            liv_sinopse:
              "Rapunzel não é uma princesa convencional. Ela voltou para o reino após passar dezoito anos aprisionada em uma torre e ainda está conhecendo os pais. Agora, tem que se habituar aos costumes da realeza, aos modos corretos de se sentar e fazer reverências, quando o que preferia mesmo era escalar árvores e pintar.Cassandra não é uma dama de companhia comum. Sendo filha do capitão da guarda, ela cresceu fascinada pelo ofício de proteger e por armamentos. Seu objetivo de vida era se tornar um membro da guarda, e se tornar uma dama de companhia não se enquadra exatamente em seus planos – em particular quando o namorado irritante da princesa está sempre por perto.Contudo, quando Rapunzel e Cassandra se deparam com uma lagoa secreta, cuja fama é de resguardar o maior poder do reino, caberá a elas solucionar o mistério… antes que o inimigo o faça.",
            liv_capa:
              "https://m.media-amazon.com/images/I/91hL3UwM6dL._SY385_.jpg",
            liv_status_ativo: true,
            created_at: "2025-04-12",
            updated_at: "2025-04-12",
          },
          {
            liv_id: 10,
            liv_isbn: "978-8550303185",
            liv_numRegistro: "rn568561",
            liv_nome: "Rapunzel e a Lagoa Perdida",
            liv_qtdPaginas: 288,
            liv_dataPubli: "2020-31-01",
            edi_id: 5,
            liv_edicao: 1,
            liv_classIndicativa: "Livre",
            liv_localizacao: "Infantil",
            liv_sinopse:
              "Rapunzel não é uma princesa convencional. Ela voltou para o reino após passar dezoito anos aprisionada em uma torre e ainda está conhecendo os pais. Agora, tem que se habituar aos costumes da realeza, aos modos corretos de se sentar e fazer reverências, quando o que preferia mesmo era escalar árvores e pintar.Cassandra não é uma dama de companhia comum. Sendo filha do capitão da guarda, ela cresceu fascinada pelo ofício de proteger e por armamentos. Seu objetivo de vida era se tornar um membro da guarda, e se tornar uma dama de companhia não se enquadra exatamente em seus planos – em particular quando o namorado irritante da princesa está sempre por perto.Contudo, quando Rapunzel e Cassandra se deparam com uma lagoa secreta, cuja fama é de resguardar o maior poder do reino, caberá a elas solucionar o mistério… antes que o inimigo o faça.",
            liv_capa:
              "https://m.media-amazon.com/images/I/91hL3UwM6dL._SY385_.jpg",
            liv_status_ativo: true,
            created_at: "2025-04-12",
            updated_at: "2025-04-12",
          },
          {
            liv_id: 11,
            liv_isbn: "978-8550303185",
            liv_numRegistro: "rn568561",
            liv_nome: "Rapunzel e a Lagoa Perdida",
            liv_qtdPaginas: 288,
            liv_dataPubli: "2020-31-01",
            edi_id: 5,
            liv_edicao: 1,
            liv_classIndicativa: "Livre",
            liv_localizacao: "Infantil",
            liv_sinopse:
              "Rapunzel não é uma princesa convencional. Ela voltou para o reino após passar dezoito anos aprisionada em uma torre e ainda está conhecendo os pais. Agora, tem que se habituar aos costumes da realeza, aos modos corretos de se sentar e fazer reverências, quando o que preferia mesmo era escalar árvores e pintar.Cassandra não é uma dama de companhia comum. Sendo filha do capitão da guarda, ela cresceu fascinada pelo ofício de proteger e por armamentos. Seu objetivo de vida era se tornar um membro da guarda, e se tornar uma dama de companhia não se enquadra exatamente em seus planos – em particular quando o namorado irritante da princesa está sempre por perto.Contudo, quando Rapunzel e Cassandra se deparam com uma lagoa secreta, cuja fama é de resguardar o maior poder do reino, caberá a elas solucionar o mistério… antes que o inimigo o faça.",
            liv_capa:
              "https://m.media-amazon.com/images/I/91hL3UwM6dL._SY385_.jpg",
            liv_status_ativo: true,
            created_at: "2025-04-12",
            updated_at: "2025-04-12",
          },
          {
            liv_id: 12,
            liv_isbn: "978-8550303185",
            liv_numRegistro: "rn568561",
            liv_nome: "Rapunzel e a Lagoa Perdida",
            liv_qtdPaginas: 288,
            liv_dataPubli: "2020-31-01",
            edi_id: 5,
            liv_edicao: 1,
            liv_classIndicativa: "Livre",
            liv_localizacao: "Infantil",
            liv_sinopse:
              "Rapunzel não é uma princesa convencional. Ela voltou para o reino após passar dezoito anos aprisionada em uma torre e ainda está conhecendo os pais. Agora, tem que se habituar aos costumes da realeza, aos modos corretos de se sentar e fazer reverências, quando o que preferia mesmo era escalar árvores e pintar.Cassandra não é uma dama de companhia comum. Sendo filha do capitão da guarda, ela cresceu fascinada pelo ofício de proteger e por armamentos. Seu objetivo de vida era se tornar um membro da guarda, e se tornar uma dama de companhia não se enquadra exatamente em seus planos – em particular quando o namorado irritante da princesa está sempre por perto.Contudo, quando Rapunzel e Cassandra se deparam com uma lagoa secreta, cuja fama é de resguardar o maior poder do reino, caberá a elas solucionar o mistério… antes que o inimigo o faça.",
            liv_capa:
              "https://m.media-amazon.com/images/I/91hL3UwM6dL._SY385_.jpg",
            liv_status_ativo: true,
            created_at: "2025-04-12",
            updated_at: "2025-04-12",
          },
        ]}
      />
    </div>
  );
};

export default LivrosCadastrados;
