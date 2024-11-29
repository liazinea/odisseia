// App.jsx
import React from 'react';
import CapaLivro from '../../components/CapaLivro';

const App = () => {
  return (
    <div style={{backgroundColor: 'gray'}}>

      <h1>As classificações indicativas dos livros não estão correspondentes kkkkkk</h1>
      <h1>Quando nenhuma imagem é inserida, aparece um esqueleto. O esqueleto é exibido lá na classificação +18</h1>

      <CapaLivro imagemCapa="https://imgv2-1-f.scribdassets.com/img/word_document/407633882/original/a2b2cea8ae/1587214774?v=1" classificacao="L" />
      <CapaLivro imagemCapa="https://s1.static.brasilescola.uol.com.br/be/2021/07/capa-do-livro-campo-geral-de-joao-guimaraes-rosa-publicado-pela-global-editora.jpg" classificacao="+10" />
      <CapaLivro imagemCapa="http://3.bp.blogspot.com/-u_WpfVS0zpo/Vgw7PK52QDI/AAAAAAAAawE/wWk55VJMS-s/s1600/persepolis.jpg" classificacao="+12" />
      <CapaLivro imagemCapa="https://m.media-amazon.com/images/I/61k9Y9fwZ6L._AC_UF1000,1000_QL80_.jpg" classificacao="+14" />
      <CapaLivro imagemCapa="https://m.media-amazon.com/images/I/81USiLZVNuL._SL1500_.jpg" classificacao="+16" />
      <CapaLivro imagemCapa="" classificacao="+18" />
    </div>
  );
}

export default App;
