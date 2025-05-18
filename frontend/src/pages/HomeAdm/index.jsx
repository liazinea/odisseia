import React from "react";
import Navbar from "../../components/layout/Navbar"
import HeaderPagina from "../../components/layout/HeaderPagina"
import SessaoAdmHome from "../../components/layout/SessaoAdmHome";
import Footer from "../../components/layout/Footer";
import { useAuth } from "../../context/AuthContext";
import { useEffect } from "react";
import {
  useNavigate
} from 'react-router-dom';

const HomeAdm = () => {
  const { token } = useAuth()
  const {userType } = useAuth()
  const navigate = useNavigate()
  useEffect(() => {
    if (!token || userType != 1) {
      navigate('/')
    }
  }, [token])
  return (
    <>
      <HeaderPagina titulo={"Página do Administrador"} />
      <SessaoAdmHome />
    </>
  );
};

export default HomeAdm;
