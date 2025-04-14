import {  useContext,createContext, useState } from "react"
import api from '../services/api.js'

const AuthContext = createContext()

export const AuthProvider = ({children}) =>{
    const [token, setToken] = useState(localStorage.getItem('token') || null)
    const [user, setUser] = useState(null)

    const login = async (email, password) => {
        try {
          const response = await api.post('/login', { email, password });
          const { token } = response.data.token;
          console.log(response.data)
          setToken(token);
          localStorage.setItem('token', token);
          localStorage.setItem('user', response.data.usuario);
          setUser(response.data.usuario);
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
        } catch (error) {
          throw error;
        }
    };

    const isAuthenticated = () => !!token;

    api.interceptors.request.use((config) => {
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      });

      return (
        <AuthContext.Provider value={{ token, user, login, logout,  isAuthenticated }}>
          {children}
        </AuthContext.Provider>
      );  
}

export const useAuth = () => useContext(AuthContext);
