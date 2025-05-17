import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { AuthProvider } from './context/AuthContext'
import App from './App.jsx'
import Modal from "react-modal";

Modal.setAppElement("#root");

createRoot(document.getElementById('root')).render(
  <StrictMode>
   <AuthProvider>
    <App />
   </AuthProvider>
  </StrictMode>,
)
