import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const API_URL = "https://api.questio.com.br";
const storedUser = await AsyncStorage.getItem("@Questio:user");

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
