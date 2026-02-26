import axios from "axios";
import { toast } from "react-toastify";

// Leemos la URL base del archivo .env
const BASE_URL = import.meta.env.VITE_BACKEND_URL;

export function useFetch() {
    
    // Función genérica para conectar con cualquier endpoint
    const fetchDataBackend = async (endpoint, data = null, method = "GET", headers = {}) => {
        
        const url = `${BASE_URL}${endpoint}`;
        
        // Creamos el toast de carga
        const loadingToast = toast.loading("Procesando solicitud...");

        try {
            const options = {
                method,
                url,
                headers: {
                    "Content-Type": "application/json",
                    ...headers,
                },
                data
            };

            const response = await axios(options);

            // Si todo sale bien:
            toast.dismiss(loadingToast);
            
            // A veces el backend no manda mensaje, ponemos uno genérico si hace falta
            if (method !== "GET") { 
                toast.success(response?.data?.msg || "Operación exitosa");
            } else {
                // Si es solo GET (listar), quitamos el loading pero no mostramos success para no molestar
                toast.dismiss(loadingToast); 
            }

            return response?.data;

        } catch (error) {
            // Si algo falla:
            toast.dismiss(loadingToast);
            console.error(error);
            // Mostramos el error que viene del backend o uno genérico
            toast.error(error.response?.data?.msg || "Error de conexión con el servidor");
            return null; // Retornamos null para que el front sepa que falló
        }
    };

    return fetchDataBackend;
}