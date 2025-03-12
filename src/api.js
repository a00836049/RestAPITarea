// src/api.js

import axios from "axios";

const API_URL = "http://localhost:3000";

// Función para verificar si el token ha expirado
const isTokenExpired = (token) => {
    try {
        const payload = JSON.parse(atob(token.split(".")[1])); // Decodificar el payload del token
        return payload.exp * 1000 < Date.now(); // Comparar con la fecha actual
    } catch (error) {
        return true; // Si hay error, asumir que el token es inválido
    }
};

export const getUsers = async () => {
    try {
        const token = localStorage.getItem("token");
        if (!token || isTokenExpired(token)) {
            localStorage.removeItem("token"); // Eliminar token expirado
            return [];
        }

        const response = await axios.get(`${API_URL}/users`, {
            headers: { Authorization: `Bearer ${token}` },
        });
        return response.data;
    } catch (error) {
        console.error("Error obteniendo usuarios:", error);
        return [];
    }
};

// Actualizar usuario
export const updateUser = async (id, data) => {
    try {
        const token = localStorage.getItem("token");
        if (!token) {
            console.error("No hay token disponible.");
            return null;
        }

        const response = await axios.put(`${API_URL}/users/${id}`, data, {
            headers: { Authorization: `Bearer ${token}` },
        });
        return response.data;
    } catch (error) {
        console.error("Error al actualizar usuario:", error);
        return null;
    }
};

export const loginUser = async (email, password) => {
    try {
        const response = await axios.post(`${API_URL}/login`, { EMAIL: email, PASSWORDHASH: password });
        return response.data;
    } catch (error) {
        console.error("Error en el login:", error);
        return null;
    }
};
