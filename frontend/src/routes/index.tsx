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
import HomeAdm from "../pages/HomeAdm";
import LivrosCadastrados from "../pages/LivrosCadastrados";


export const Paths = () => {
    return (
        <>
            <BrowserRouter basename={"/"}>
                <Routes>
                    <Route index element={<Login />} />
                    <Route path={'/'} element={<PageLayout />}>
                        <Route path={'/t'} element={<Teste />}/>
                        <Route path={'/infos'} element={<InformacoesDetalhadas />}/>
                        <Route path={'/primeiro-acesso'} element={<PrimeiroAcesso />}/>
                        <Route path={'/adm'} element={<HomeAdm />}/>
                        <Route path={'/livros-cadastrados'} element={<LivrosCadastrados />}/>
                        <Route path={'/esqueci-minha-senha'} element={<RedefinicaoSenha />}/>
                        <Route path={'/home'} element={<Home/>}/>
                    </Route>
                    <Route path={'*'} element={<NotFound />} />
                </Routes>
            </BrowserRouter>
        </>
    );
}