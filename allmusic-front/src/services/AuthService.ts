import axios from "axios";

const URL_BASE = "http://localhost:8080";

export const AuthService = axios.create({
  baseURL: URL_BASE,
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token") || ""}`
    
  }
});
