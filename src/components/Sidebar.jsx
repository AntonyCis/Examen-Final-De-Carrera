// src/components/Sidebar.jsx
import { 
  Link, 
  useLocation, 
  useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore"; // Importamos tu store
import { 
  Button, 
  User, 
  Divider } from "@heroui/react";
import { 
  LayoutDashboard, 
  Users, 
  BookOpen, 
  FileText, 
  LogOut, 
  X 
} from "lucide-react"; // Iconos bonitos

export default function Sidebar({ isOpen, onClose }) {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuthStore(); // Usamos Zustand

  // --- CONFIGURACIÓN UNIVERSAL ---
  // El día del examen, SOLO CAMBIAS ESTO:
  const menuItems = [
    { name: "Dashboard", path: "/dashboard", icon: <LayoutDashboard size={20} /> },
    { name: "Clientes", path: "/clientes", icon: <Users size={20} /> }, // Cambiar por Clientes/Pacientes
    { name: "Técnicos", path: "/tecnicos", icon: <BookOpen size={20} /> },    // Cambiar por Vehículos/Especialidades
    { name: "Tickets", path: "/tickets", icon: <FileText size={20} /> }, // Cambiar por Reservas/Citas
  ];

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  // Clases dinámicas para móvil (overlay) y desktop (fijo)
  const sidebarClasses = `
    // Posición y estructura
    fixed inset-y-0 left-0 z-50 w-64 bg-background/80 backdrop-blur-md border-r border-divider 
    transition-transform duration-300 ease-in-out
    ${isOpen ? "translate-x-0" : "-translate-x-full"} 
    md:translate-x-0 md:static md:block
  `;

  return (
    <>
      {/* Overlay oscuro para móvil cuando el menú está abierto */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={onClose}
        />
      )}

      <aside className={sidebarClasses}>
        <div className="flex flex-col h-full p-6">
          
          {/* 1. HEADER DEL SIDEBAR */}
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
              Gestión de Asistencias Técnicas
            </h2>
            <button onClick={onClose} className="md:hidden text-default-500">
              <X size={24} />
            </button>
          </div>

          {/* 2. MENÚ DE NAVEGACIÓN */}
          <nav className="flex-1 space-y-2">
            {menuItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link to={item.path} key={item.path} onClick={() => onClose && onClose()}>
                  <Button
                    variant={isActive ? "flat" : "light"}
                    color={isActive ? "primary" : "default"}
                    className={`w-full justify-start text-md font-medium ${isActive ? "bg-primary/10" : ""}`}
                    startContent={item.icon}
                  >
                    {item.name}
                  </Button>
                </Link>
              );
            })}
          </nav>

          <Divider className="my-4" />

          {/* 3. FOOTER (PERFIL DE USUARIO) */}
          <div className="flex flex-col gap-4">
            {user && (
              <User   
                name={user.nombre}
                description={user.email || "Usuario"}
                avatarProps={{
                  src: "https://i.pravatar.cc/150?u=a042581f4e29026024d" // Avatar random bonito
                }}
              />
            )}
            
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