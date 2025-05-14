import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "../pages/Login";
import Teste from "../pages/Teste";
import InformacoesDetalhadas from "../pages/InformacoesDetalhadas";
import NotFound from "../pages/NotFound";
import Home from "../pages/Home"
import PageLayout from "../layouts/PageLayout";
import PrimeiroAcesso from "../pages/PrimeiroAcesso";
import RedefinicaoSenha from "../pages/RedefinicaoSenha";
import Generos from "../pages/Generos";
import Usuarios from "../pages/Usuarios";
import HomeAdm from "../pages/HomeAdm";
import LivrosCadastrados from "../pages/LivrosCadastrados";

import CadastroLivro from "../pages/CadastroLivro";
import OpcoesLivro from "../pages/OpcoesLivro";
import Autores from "../pages/Autores";

export const Paths = () => {
    return (
        <>
            <BrowserRouter basename={"/"}>
                <Routes>
                    <Route index element={<Login />} />
                    <Route path={'/primeiro-acesso'} element={<PrimeiroAcesso />}/>
                    <Route path={'/esqueci-minha-senha'} element={<RedefinicaoSenha />}/>
                    <Route path={'/'} element={<PageLayout />}>

                        <Route path={'/t'} element={<Teste />}/>
                        <Route path={`/livro/:id`} element={<InformacoesDetalhadas />}/>
                        <Route path={'/home-adm'} element={<HomeAdm />}/>
                        <Route path={'/livros'} element={<LivrosCadastrados />}/>
                        <Route path={'/home'} element={<Home/>}/>
                        <Route path={'/livro/cadastro'} element={<CadastroLivro />}/>
                        <Route path={'/generos'} element={<Generos/>}/>
                        <Route path={'/autores'} element={<Autores/>}/>
                        <Route path={'/usuarios'} element={<Usuarios/>}/>
                        <Route path={'/opcoes-livro'} element={<OpcoesLivro/>}/>
                    </Route>
                    <Route path={'*'} element={<NotFound />} />
                </Routes>
            </BrowserRouter>
        </>
    );
}
