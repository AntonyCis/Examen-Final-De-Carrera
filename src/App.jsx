// src/App.jsx
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import DashboardLayout from "./layouts/DashboardLayout"; // Importamos el nuevo Layout
import ClientesPage from "./pages/ClientesPage";
import TecnicosPage from "./pages/TecnicosPage";
import TicketsPage from "./pages/TicketsPage";

// Componentes Placeholder (Para probar ya mismo)
const DashboardHome = () => <h1 className="text-4xl font-bold">Bienvenido al Dashboard 👋</h1>;

function App() {
  return (
    <Routes>
      {/* Ruta Pública */}
      <Route path="/" element={<Login />} />

      {/* Rutas Privadas */}
      <Route element={<ProtectedRoute />}>
        {/* Usamos el Layout del Dashboard para todas estas rutas */}
        <Route element={<DashboardLayout />}>
          
          <Route path="/dashboard" element={<DashboardHome />} />
          <Route path="/clientes" element={<ClientesPage />} />
          <Route path="/tecnicos" element={<TecnicosPage />} />
          <Route path="/tickets" element={<TicketsPage />} />
          
        </Route>
      </Route>

      {/* Redirección si la ruta no existe */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

export default App;