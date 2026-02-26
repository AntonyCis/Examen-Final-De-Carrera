// src/pages/Login.jsx
import { useState } from "react";
import { Card, CardHeader, CardBody, Input, Button, CardFooter } from "@heroui/react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { useFetch } from "../hooks/useFetch";
import { useAuthStore } from "../store/authStore";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const fetchBackend = useFetch();
  const loginAuth = useAuthStore(state => state.login); // Usamos tu store

  const handleLogin = async (e) => {
      e.preventDefault();
      setLoading(true);

      // Llamada real al backend (Ojo: tu backend espera 'clave', no 'password')
      const response = await fetchBackend("/auth/login", { email, password: password }, "POST");
      
      if (response && response.user) {
        loginAuth(response.user); // Guardamos en Zustand y LocalStorage
        toast.success(response.message);
        navigate("/clientes");
      } else {
        // El useFetch ya muestra el toast de error si falla
      }
      setLoading(false);
  };

    
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 px-4">
      <Card className="w-full max-w-md p-4">
        <CardHeader className="flex gap-3 justify-center">
          <div className="flex flex-col">
            <p className="text-2xl font-bold text-center">Iniciar Sesión</p>
            <p className="text-small text-default-500">Sistema de Gestión de Asistencias Técnicas</p>
          </div>
        </CardHeader>
        <CardBody>
          <form onSubmit={handleLogin} className="flex flex-col gap-4">
            <Input 
              isRequired
              label="Email" 
              placeholder="Ingresa tu correo" 
              type="email"
              value={email}
              onValueChange={setEmail}
            />
            <Input 
              isRequired
              label="Contraseña" 
              placeholder="Ingresa tu clave" 
              type="password"
              value={password}
              onValueChange={setPassword}
            />
            <Button 
              color="primary"
              type="submit" 
              isLoading={loading}
              className="w-full font-bold"
            >
              Ingresar
            </Button>
          </form>
        </CardBody>
        <CardFooter className="justify-center">
          <p className="text-xs text-default-400">By. Ariel Macias y Antony Cisneros</p>
        </CardFooter>
      </Card>
    </div>
  );
}
