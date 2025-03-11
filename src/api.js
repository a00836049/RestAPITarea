import axios from "axios";

const API_URL = "http://localhost:3000"; 

export const getUsers = async () => {
  try {
    const response = await axios.get(`${API_URL}/users`);
    return response.data;
  } catch (error) {
    console.error("Error obteniendo usuarios:", error);
    return [];
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
