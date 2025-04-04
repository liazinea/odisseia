import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "../pages/Login";
import NotFound from "../pages/NotFound";
import Teste from "../pages/Teste";
import PageLayout from "../layouts/PageLayout";
import PrimeiroAcesso from "../pages/PrimeiroAcesso";
import RedefinicaoSenha from "../pages/RedefinicaoSenha";

export const Paths = () => {
    return (
        <>
            <BrowserRouter basename={"/"}>
                <Routes>
                    <Route index element={<Login />} />
                    <Route path={'/'} element={<PageLayout />}>
                        <Route path={'/t'} element={<Teste />}/>
                        <Route path={'/primeiro-acesso'} element={<PrimeiroAcesso />}/>
                        <Route path={'/esqueci-minha-senha'} element={<RedefinicaoSenha />}/>
                    </Route>
                    <Route path={'*'} element={<NotFound />} />
                </Routes>
            </BrowserRouter>
        </>
    );
}