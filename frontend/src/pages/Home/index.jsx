import React from "react";
import Navbar from "../../components/layout/Navbar"
import HeaderHome from "../../components/layout/HeaderHome"
import Footer from "../../components/layout/Footer";
import LivrosMaisEmprestados from "../../components/layout/LivrosMaisEmprestados";
import { useEffect } from "react";
import {
  useNavigate
} from 'react-router-dom';
import { useAuth } from "../../context/AuthContext";
import CardCarrossel from "../../components/Cards/CardCarrossel";
const Home = () => {
  const navigate = useNavigate()
  const {token, userType} = useAuth()
  
  const {logout} = useAuth()
  useEffect(() => {
    if(!token || userType != 0){
      navigate('/')
   }  
  }, [token])
  return (
    <>  
        <HeaderHome/>
        <LivrosMaisEmprestados/>
        <CardCarrossel/>
    </>
  );
};

export default Home;
