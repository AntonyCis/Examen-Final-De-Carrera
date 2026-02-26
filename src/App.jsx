// src/App.jsx
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import DashboardLayout from "./layouts/DashboardLayout"; // Importamos el nuevo Layout
import EstudiantesPage from "./pages/EstudiantesPage";
import MateriasPage from "./pages/MateriasPage";
import MatriculasPage from "./pages/MatriculasPage";

// Componentes Placeholder (Para probar ya mismo)
const DashboardHome = () => <h1 className="text-4xl font-bold">Bienvenido al Dashboard 👋</h1>;
const ModuloMaterias = () => <h1 className="text-4xl font-bold">Gestión de Materias 📚</h1>;
const ModuloEstudiantes = () => <h1 className="text-4xl font-bold">Gestión de Estudiantes 🎓</h1>;

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
          <Route path="/materias" element={<MateriasPage />} />
          <Route path="/estudiantes" element={<EstudiantesPage />} />
          <Route path="/matriculas" element={<MatriculasPage />} />
          {/* Añade aquí las demás rutas */}
          
        </Route>
      </Route>

      {/* Redirección si la ruta no existe */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

export default App;