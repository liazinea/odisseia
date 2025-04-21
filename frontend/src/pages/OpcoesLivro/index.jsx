import React from "react";
import HeaderPagina from "../../components/layout/HeaderPagina";
import SessaoOpcoesLivro from "../../components/layout/SessaoOpcoesLivro";
import { useAuth } from "../../context/AuthContext";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const OpcoesLivro = () => {
  // const { logout } = useAuth();
  // const { token } = useAuth();
  // const { userType } = useAuth();
  // const navigate = useNavigate();
  // useEffect(() => {
  //   if (!token || userType != 1) {
  //     navigate("/");
  //   }
  // }, [token]);
  return (
    <>
      <HeaderPagina titulo={"Gerenciamento de livros"} />
      <SessaoOpcoesLivro />
    </>
  );
};

export default OpcoesLivro;
