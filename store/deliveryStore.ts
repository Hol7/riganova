import axios from 'axios';
import { useAuthStore } from '../store/authStore';

const api = axios.create({
  baseURL: 'https://api.riganova.com',
});

api.interceptors.request.use((config) => {
  const token = useAuthStore.getState().token;
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export const createDelivery = async (data: any) => {
  const response = await api.post('/deliveries/create', data);
  return response.data;
};

export const getDeliveries = async () => {
  const response = await api.get('/deliveries/history');
  return response.data;
};

export const updateDeliveryStatus = async (id: string, status: string) => {
  const response = await api.patch(`/deliveries/status/${id}`, { status });
  return response.data;
};
