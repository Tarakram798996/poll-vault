// src/services/api.js
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8080/api",
});

// Automatically attach Basic Auth token from localStorage
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("authToken");
  if (token) {
    config.headers.Authorization = `Basic ${token}`;
  }
  return config;
});

export default api;
