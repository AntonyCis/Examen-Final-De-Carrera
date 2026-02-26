import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { HeroUIProvider } from '@heroui/react' // Proveedor de estilos
import { BrowserRouter } from 'react-router-dom' // Manejo de rutas
import { ToastContainer } from "react-toastify"; // Importamos el contenedor
import "react-toastify/dist/ReactToastify.css"; // Importamos los estilos OBLIGATORIOS
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter> {/* 1. Envolvemos con Router para poder navegar */}
      <HeroUIProvider> {/* 2. Envolvemos con HeroUI para los estilos */}
        <main className="text-foreground bg-background dark"> {/* Tema oscuro por defecto */}
          <App />
          <ToastContainer position="bottom-right" theme="dark" autoClose={3000} /> {/* Las alertas saldrán aquí */}
        </main>
      </HeroUIProvider>
    </BrowserRouter>
  </StrictMode>,
)