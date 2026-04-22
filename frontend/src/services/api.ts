import axios from "axios";

export const API_URL = "http://192.168.18.68:8080/api";

const api = axios.create({
  baseURL: API_URL,
});

export default api;
