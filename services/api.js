import axios from "axios";
import * as SecureStore from "expo-secure-store";

export const API_URL = "http://192.168.1.14:8000";

export const api = axios.create({ baseURL: API_URL, timeout: 15000 });

api.interceptors.request.use(async (config) => {
  const token = await SecureStore.getItemAsync("access_token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});
