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
  // Verificar si la URL no es de registro o login
  if (!config.url?.startsWith("/enth") && !config.url?.startsWith("/artist") && !config.url?.startsWith("/login")) {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  } else {
    delete config.headers.Authorization;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});