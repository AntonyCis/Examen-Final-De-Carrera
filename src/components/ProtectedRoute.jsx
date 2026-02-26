// src/components/ProtectedRoute.jsx
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = () => {
  // Verificamos si hay un usuario en el localStorage
  // En el Login guardaremos este dato.
  const user = localStorage.getItem('usuario_activo');

  if (!user) {
    // Si no hay usuario, redirigir al Login
    return <Navigate to="/" replace />;
  }

  // Si hay usuario, renderizar las rutas hijas (Outlet)
  return <Outlet />;
};

export default ProtectedRoute;