import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const API_URL = "https://questio-backend-ku6u.onrender.com/api";

const api = axios.create({
  baseURL: API_URL,
});

api.interceptors.request.use(
  async (config) => {
    try {
      const storedUser = await AsyncStorage.getItem("@Questio:user");

      if (storedUser) {
        const user = JSON.parse(storedUser);

        if (user?.token) {
          config.headers.Authorization = `Bearer ${user.token}`;
        }
      }
    } catch (error) {
      console.error("Erro ao buscar o token", error);
    }

    return config;
  },
  (error) => Promise.reject(error),
);

export default api;
