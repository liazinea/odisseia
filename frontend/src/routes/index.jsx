import { BrowserRouter, Route, Routes } from "react-router-dom";
import Teste from "../pages/Teste";
import LivrosCadastrados from "../pages/LivrosCadastrados";
import InfoLivro from "../pages/InfoLivro"

const Paths = () => {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path={'/t'} element={<Teste />}/>
                    <Route path={'/LivrosCadastrados'} element={<LivrosCadastrados />}/>
                    <Route path='/livrosa/:id' element={<InfoLivro/>}/>
                </Routes>
            </BrowserRouter>
        </>
    );
}

export default Paths