import React from "react";
import Navbar from "../../components/layout/Navbar"
import HeaderHome from "../../components/layout/HeaderHome"
import Footer from "../../components/layout/Footer";
import LivrosMaisAcessados from "../../components/layout/LivrosMaisAcessados";
import { useEffect } from "react";
import {
  useNavigate
} from 'react-router-dom';
import { useAuth } from "../../context/AuthContext";
import CardCarrossel from "../../components/Cards/CardCarrossel";
const Home = () => {
  const navigate = useNavigate()
  const {token} = useAuth()
  
  const {logout} = useAuth()
  useEffect(() => {
    if(!token){
      navigate('/')
   }  
  }, [token])
  return (
    <>  
        <HeaderHome/>
        <LivrosMaisAcessados/>
        <CardCarrossel/>
    </>
  );
};

export default Home;
