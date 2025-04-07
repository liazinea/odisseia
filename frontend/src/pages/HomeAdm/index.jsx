import React from "react";
import Navbar from "../../components/layout/Navbar"
import HeaderPagina from "../../components/layout/HeaderPagina"
import SessaoAdmHome from "../../components/layout/SessaoAdmHome";
import Footer from "../../components/layout/Footer";

const HomeAdm = () => {
  return (
    <>
        <Navbar/>
        <HeaderPagina titulo={"Página do Administrador"}/>
        <SessaoAdmHome/>
        <Footer />
    </>
  );
};

export default HomeAdm;
