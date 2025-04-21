import {  useContext,createContext, useState,useEffect } from "react"

import api from '../services/api.js'

const AuthContext = createContext()

export const AuthProvider = ({children}) =>{

    const [token, setToken] = useState(localStorage.getItem('token') || null)
    const [user, setUser] = useState(localStorage.getItem('user') || null)
    const [userType, setUserType] = useState(localStorage.getItem('type') || null)

    const login = async (email, password) => {
      try {
        const response = await api.post('/login', { email, password });
    
        const token = response.data.token;
        const userId = response.data.usuario.usu_id;
        const type = response.data.usuario.usu_nivel;
    
        localStorage.setItem('token', token);
        localStorage.setItem('user', userId);
        localStorage.setItem('type', type);
    
        setToken(token);
        setUser(userId);
        setUserType(type)
    
        return response.data;
      } catch (error) {
        throw error;
      }
    };
  
    const logout = async () => {
        try {
          await api.post('/logout', {}, {
            headers: { Authorization: `Bearer ${token}` },
          });
          setToken(null);
          setUser(null);
          setUserType(null)
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          localStorage.removeItem('type');
        } catch (error) {
          throw error;
        }
    };

    const isAuthenticated = () => !!token;

    useEffect(() => {
      const interceptor = api.interceptors.request.use((config) => {
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      });
    
      return () => {
       
        api.interceptors.request.eject(interceptor);
      };
    }, [token]);

      return (
        <AuthContext.Provider value={{ token, user,userType, login, logout,  isAuthenticated }}>
          {children}
        </AuthContext.Provider>
      );  
}

export const useAuth = () => useContext(AuthContext);
