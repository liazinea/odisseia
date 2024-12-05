import { BrowserRouter, Route, Routes } from "react-router-dom";
import Teste from "../pages/Teste";
import LivrosCadastrados from "../pages/LivrosCadastrados";
import InfoLivro from "../pages/InfoLivro"
import CadastroLivro from "../pages/CadastroLivro";

const Paths = () => {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path={'/t'} element={<Teste />}/>
                    <Route path={'/LivrosCadastrados'} element={<LivrosCadastrados />}/>
                    <Route path='/Livros' element={<InfoLivro/>}/>
                    <Route path='/' element={<CadastroLivro/>}/>
                </Routes>
            </BrowserRouter>
        </>
    );
}

export default Paths