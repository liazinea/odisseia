import React from "react";
import Navbar from "../../components/layout/Navbar"
import HeaderHome from "../../components/layout/HeaderHome"
import Footer from "../../components/layout/Footer";
import LivrosMaisAcessados from "../../components/layout/LivrosMaisAcessados";

const Home = () => {
  return (
    <>
        <Navbar/>
        <HeaderHome/>
        <LivrosMaisAcessados/>
        <Footer />
    </>
  );
};

export default Home;
