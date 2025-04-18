import {  useContext,createContext, useState,useEffect } from "react"

import api from '../services/api.js'

const AuthContext = createContext()

export const AuthProvider = ({children}) =>{

    const [token, setToken] = useState(localStorage.getItem('token') || null)
    const [user, setUser] = useState(localStorage.getItem('user') || null)

    const login = async (email, password) => {
      try {
        const response = await api.post('/login', { email, password });
    
        const token = response.data.token;
        const userId = response.data.usuario.usu_id;
    
        localStorage.setItem('token', token);
        localStorage.setItem('user', userId);
    
        setToken(token);
        setUser(userId);
    
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
          localStorage.removeItem('token');
          localStorage.removeItem('user');
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
        <AuthContext.Provider value={{ token, user, login, logout,  isAuthenticated }}>
          {children}
        </AuthContext.Provider>
      );  
}

export const useAuth = () => useContext(AuthContext);
