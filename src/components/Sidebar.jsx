import { 
    Link, // Para navegar entre páginas sin recargar la página
    useLocation, // Para saber la ruta actual
    useNavigate // Para navegar entre páginas desde el código
 } from 'react-router-dom';

import { useAuthStore } from '../store/authStore';
import { 
    Button,
    User, // Para mostrar información del usuario
    Divider // Línea separadora
 } from '@heroui/react';

import { 
    LayoutDashboard, // Para el ícono del dashboard
    Users, // El ícono para los Clinetes
    BookOpen, // El ícono para Técnicos
    FileText, // El ícono para los tickets
    LogOut, // Ícono para cerrar sesión
    X // ícono de equis
 } from 'lucide-react';

// Creación del componente
export default function Sidebar({ isOpen, onClose }) {
    // Hooks e inicializaciones
    const navigate = useNavigate();
    const location = useLocation();
    const { user, logout } = useAuthStore();

    // Items del sidebar
    const ITEMS = [
        { name: 'Dashboard', path: '/dashboard', icon: <LayoutDashboard size={20}/> },
        { name: 'Clientes', path: '/clientes', icon: <Users size={20}/> },
        { name: 'Técnicos', path: '/tecnicos', icon: <BookOpen size={20}/> },
        { name: 'Tickets', path: '/tickets', icon: <FileText size={20}/> },
    ];

    // Función para cerrar sesión
    const handleLogout = () => {
        logout();
        navigate('/');
    };

    // Clases dinámicas para el sidebar
    const sidebarClasses = `
        // Posición y estructura
        fixed inset-y-0 left-0 z-50 w-64
        // Para el diseño
        bg-background/80 backdrop-blur-md border-r border-divider
        // Animación 
        transition-transform duration-300 ease-in-out
        // Lógica
        ${isOpen ? 'translate-x-0' : 'translate-x-full'}
        // Comportamiento responsivo
        md:transalte-x-0 md:static md:block
    `;

    return(
        <>

            {/* Overlay para moviles */}
            { isOpen && (
                <div
                    className='fixed inset-0 bg-black/50 z-40 md:hidden'
                    onClick={onClose}
                />
            ) }

            {/* Sidebar */}
            <aside className={sidebarClasses}>
                <div className='flex flex-col h-full p-6'>

                    {/* Contenedor del header */}
                    <div className='flex items-center justify-between mb-8'>

                        <h2 className='text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary'>Sistema de gestión de tickets de asistencia técnica</h2>
                        <Button
                            isIconOnly
                            onPress={onClose}
                            className='md:hidden text-default-500'
                        >
                            <X size={24}/>
                        </Button>

                    </div>

                    {/* Menú de navegación */}
                    <nav className='flex-1 space-y-2'>

                        { ITEMS.map((item) => {
                            const isActive = location.pathname === item.path;
                            return(
                                <Link to={item.path} onClick={() => onClose && onClose()}>

                                    <Button
                                        variant={isActive ? 'flat' : 'light'}
                                        color={isActive ? 'primary' : 'default'}
                                        className={`w-full justify-start text-md font-medium ${isActive ? "bg-primary/10" : ""}`}
                                        startContent={item.icon}
                                    >
                                        {item.name}
                                    </Button>

                                </Link>
                            );
                        }) }

                    </nav>

                    <Divider className='my-4'/>

                    {/* Contenedor para el footer */}

                    <div className='flex flex-col gap-4'>

                        { user && (
                            <User
                                name={user.nombre}
                                description={user.email || 'Usuario'}
                                avatarProps={{
                                    src: "https://i.pravatar.cc/150?u=a042581f4e29026024d"
                                }}
                            />
                        ) }

                        <Button
                            color="danger" 
                            variant="flat" 
                            startContent={<LogOut size={20} />}
                            onPress={handleLogout}
                        >
                            Cerrar Sesión
                        </Button>

                    </div>
                </div>
            </aside>

        </>
    );
}