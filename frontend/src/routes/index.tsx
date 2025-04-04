import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "../pages/Login";
import NotFound from "../pages/NotFound";
import Teste from "../pages/Teste";
import Home from "../pages/Home"
import PageLayout from "../layouts/PageLayout";

export const Paths = () => {
    return (
        <>
            <BrowserRouter basename={"/"}>
                <Routes>
                    <Route path={'/'} element={<PageLayout />}>
                        <Route index element={<Login />} />
                        <Route path={'/t'} element={<Teste />}/>
                        <Route path={'/home'} element={<Home/>}/>
                    </Route>
                    <Route path={'*'} element={<NotFound />} />
                </Routes>
            </BrowserRouter>
        </>
    );
}