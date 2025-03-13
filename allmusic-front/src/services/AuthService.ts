import axios from "axios";

const URL_BASE = "http://localhost:8080";

export const AuthService = axios.create({
  baseURL: URL_BASE,
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token") || ""}`, 
    
  }
});

// Agregar un interceptor para que cada solicitud tenga el token actualizado
AuthService.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});