import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "../pages/Login";
import NotFound from "../pages/NotFound";
import Teste from "../pages/Teste";
import Home from "../pages/Home"
import PageLayout from "../layouts/PageLayout";
import PrimeiroAcesso from "../pages/PrimeiroAcesso";
import RedefinicaoSenha from "../pages/RedefinicaoSenha";
import Generos from "../pages/Generos";
import HomeAdm from "../pages/HomeAdm";

export const Paths = () => {
    return (
        <>
            <BrowserRouter basename={"/"}>
                <Routes>
                    <Route index element={<Login />} />
                    <Route path={'/'} element={<PageLayout />}>
                        <Route path={'/t'} element={<Teste />}/>
                        <Route path={'/primeiro-acesso'} element={<PrimeiroAcesso />}/>
                        <Route path={'/adm'} element={<HomeAdm />}/>
                        <Route path={'/esqueci-minha-senha'} element={<RedefinicaoSenha />}/>
                        <Route path={'/home'} element={<Home/>}/>
                        <Route path={'/generos'} element={<Generos/>}/>
                    </Route>
                    <Route path={'*'} element={<NotFound />} />
                </Routes>
            </BrowserRouter>
        </>
    );
}