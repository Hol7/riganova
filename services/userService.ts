import { api } from "./api";

export async function listUsers() {
  const { data } = await api.get("/users");
  return data;
}

export async function health() {
  const { data } = await api.get("/health");
  return data;
}

export async function stats() {
  const { data } = await api.get("/stats");
  return data;
}
