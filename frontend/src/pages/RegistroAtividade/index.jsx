import styles from "./index.module.scss";
import { useAuth } from "../../context/AuthContext";
import { useEffect } from "react";
import {
  useNavigate
} from 'react-router-dom';

const RegistroAtividade = () => {
  const { token } = useAuth();
  const { userType } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    if (!token || userType != 1) {
      navigate("/");
    }
  }, [token]);
  return (
    <>
    
    </>
  );
};

export default RegistroAtividade;
