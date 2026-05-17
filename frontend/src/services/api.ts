import axios from "axios";
import * as SecureStore from "expo-secure-store";

export const API_URL = "http://192.168.18.68:8080/api";

const api = axios.create({
  baseURL: API_URL,
});

export default api;
