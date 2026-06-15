import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

<<<<<<< HEAD
export const API_URL = "http://192.168.18.68:8080/api";
=======
const API_URL = "https://api.questio.com.br";
const storedUser = await AsyncStorage.getItem("@Questio:user");
>>>>>>> fb544392216b718eac5b5cd2f335594ae687885c

const api = axios.create({
  baseURL: API_URL,
});

api.interceptors.request.use(
  async (config) => {
    try {
      const storedUser = await AsyncStorage.getItem("@Questio:user");
<<<<<<< HEAD
      if (storedUser) {
        const user = JSON.parse(storedUser);
=======

      if (storedUser) {
        const user = JSON.parse(storedUser);

>>>>>>> fb544392216b718eac5b5cd2f335594ae687885c
        if (user?.token) {
          config.headers.Authorization = `Bearer ${user.token}`;
        }
      }
    } catch (error) {
      console.error("Erro ao buscar o token", error);
    }
<<<<<<< HEAD
=======

>>>>>>> fb544392216b718eac5b5cd2f335594ae687885c
    return config;
  },
  (error) => Promise.reject(error),
);

export default api;
