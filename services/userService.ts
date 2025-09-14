import { api } from "./api";

// GET /users/me - Get current user info
export async function getCurrentUser() {
  const { data } = await api.get("/users/me");
  return data;
}

// GET /users/ - List all users (Admin only)
export async function listAllUsers() {
  const { data } = await api.get("/users/");
  return data;
}

// GET /users/clients - List all clients (Manager/Admin)
export async function listClients() {
  const { data } = await api.get("/users/clients");
  return data;
}

// GET /users/livreurs - List all livreurs (Manager/Admin)
export async function listLivreurs() {
  const { data } = await api.get("/users/livreurs");
  return data;
}

// GET /health - Health check
export async function health() {
  const { data } = await api.get("/health");
  return data;
}

// GET /stats - Get system stats (Admin/Manager)
export async function getStats() {
  const { data } = await api.get("/stats");
  return data;
}
