import { api } from "./api";

interface User {
  id: number;
  nom: string;
  email: string;
  telephone: string;
  adresse: string;
  role: string;
  created_at: string;
}

interface Zone {
  id: number;
  nom_zone: string;
  area: string;
  prix: number;
  is_active: boolean;
  created_at: string;
  updated_at: string | null;
}

// GET /users/me - Get current user info
export async function getCurrentUser(): Promise<User> {
  const { data } = await api.get("/users/me");
  return data;
}

// GET /users/clients - List all clients (Manager/Admin)
export async function listClients(): Promise<User[]> {
  const { data } = await api.get("/users/clients");
  return data;
}

// GET /users/livreurs - List all livreurs (Manager/Admin)
export async function listLivreurs(): Promise<User[]> {
  const { data } = await api.get("/users/livreurs");
  return data;
}

// GET /zones - Get all zones
export async function getZones(): Promise<Zone[]> {
  const { data } = await api.get("/zones");
  return data;
}
