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
<<<<<<< HEAD
                    <Route path='/livrosa/:id' element={<InfoLivro/>}/>
=======
                    <Route path='/Livros' element={<InfoLivro/>}/>
                    <Route path='/' element={<CadastroLivro/>}/>
>>>>>>> d2ebd2f21098b3631b9004c765bf456b7677b8de
                </Routes>
            </BrowserRouter>
        </>
    );
}

export default Paths