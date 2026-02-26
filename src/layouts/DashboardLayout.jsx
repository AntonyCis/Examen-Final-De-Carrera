// src/layouts/DashboardLayout.jsx
import { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import { Button, Navbar, NavbarContent } from "@heroui/react";
import { Menu } from "lucide-react";

export default function DashboardLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen bg-background text-foreground">
      
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        
        <Navbar className="md:hidden border-b border-divider" maxWidth="full">
          <NavbarContent>
            <Button isIconOnly variant="light" onPress={() => setIsSidebarOpen(true)}>
              <Menu size={24} />
            </Button>
            <p className="font-bold text-inherit">Menú</p>
          </NavbarContent>
        </Navbar>

        {/* Área de Contenido (Aquí se renderizan tus páginas) */}
        <main className="flex-1 overflow-y-auto p-6 md:p-10 bg-content1/50">
            {/* El Outlet renderiza la ruta hija (Estudiantes, Materias, etc.) */}
            <Outlet />
        </main>
      </div>
    </div>
  );
}