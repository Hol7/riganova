import axios from 'axios';

const api = axios.create({
  baseURL: 'https://api.riganova.com',
});

export const registerUser = async (data: any) => {
  const res = await api.post('/auth/register', data);
  return res.data;
};

export const loginUser = async (data: any) => {
  const res = await api.post('/auth/login', data);
  return res.data;
};
