import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const NotFound = () => {
    const { token } = useAuth();
    const navigate = useNavigate();
  
    useEffect(() => {
      if (!token) {
        navigate("/");
        return;
      }
    });
  
  return (
    <div>NotFound</div>
  )
}

export default NotFound