import axios from "axios";
import * as SecureStore from "expo-secure-store";

export const API_URL = "https://questio-backend.onrender.com/api";

const api = axios.create({
  baseURL: API_URL,
});

// Interceptor para injetar o Token JWT automaticamente em todas as requisições
api.interceptors.request.use(
  async (config) => {
    try {
      // Busca o token salvo no SecureStore (substitua 'token' pela chave que você usou no login)
      const token = await SecureStore.getItemAsync("token");

      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    } catch (error) {
      console.error("Erro ao buscar o token no SecureStore", error);
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

export default api;
