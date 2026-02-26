import { 
    Navigate, // Para navegar entre páginas sin recargar la página
    Outlet // Marcador para las páginas protegidas
 } from 'react-router-dom';

const ProtectedRoute = () => {
    const user = localStorage.getItem('usuario_activo');

    if (!user) {
        return <Navigate to={'/'} replace/>
    } else {
        <Outlet/>
    }
};

export default ProtectedRoute;