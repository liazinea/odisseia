import React from "react";
import Navbar from "../../components/layout/Navbar"
import HeaderPagina from "../../components/layout/HeaderPagina"
import SessaoAdmHome from "../../components/layout/SessaoAdmHome";
import Footer from "../../components/layout/Footer";

const HomeAdm = () => {
  return (
    <>
        <HeaderPagina titulo={"Página do Administrador"}/>
        <SessaoAdmHome/>
    </>
  );
};

export default HomeAdm;
