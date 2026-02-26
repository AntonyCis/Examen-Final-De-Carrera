import { create } from 'zustand';

// Store que maneja sesión global
export const useAuthStore = create((set) => ({
    // Primero busca si hay algo guardado en el navegador
    user: JSON.parse(localStorage.getItem('usuario_activo')) || null,
    isAuthenticated: !!localStorage.getItem('usuario_activo'),

    // Acción 1: guardar usuario
    login: (userData) => {
        localStorage.setItem('usuario_activo', JSON.stringify(userData));
        set({ user: userData, isAuthenticated: true });
    },

    // Acción 2: borrar usuario
    logout: () => {
        localStorage.removeItem('usuario_activo');
        set({ user:null, isAuthenticated:false });
    }
}));