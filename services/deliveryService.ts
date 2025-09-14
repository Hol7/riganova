import { api } from "./api";

// POST /deliveries/create (Client)
export async function createDelivery(p: {
  type_colis: "colis"|"document"|"nourriture"|"autre";
  description?: string;
  adresse_pickup: string;
  adresse_dropoff: string;
}) {
  const { data } = await api.post("/deliveries/create", p);
  return data;
}

// GET /deliveries/my-deliveries (Client & Livreur)
export async function getMyDeliveries() {
  const { data } = await api.get("/deliveries/my-deliveries");
  return data;
}

// POST /deliveries/{id}/cancel (Client)
export async function cancelDelivery(id: number) {
  const { data } = await api.post(`/deliveries/${id}/cancel`);
  return data;
}

// GET /deliveries/history (Manager/Admin gets all, others get their own)
export async function getAllDeliveries() {
  const { data } = await api.get("/deliveries/history");
  return data;
}

// POST /deliveries/{id}/assign (Manager/Admin)
export async function assignDelivery(id: number, livreur_id: number) {
  const { data } = await api.post(`/deliveries/${id}/assign`, { livreur_id });
  return data;
}

// POST /deliveries/{id}/status (Livreur/Manager)
export async function updateDeliveryStatus(id: number, statut: string) {
  const { data } = await api.post(`/deliveries/${id}/status`, { statut });
  return data;
}

// GET /deliveries/{id}/status
export async function getDeliveryStatus(id: number) {
  const { data } = await api.get(`/deliveries/${id}/status`);
  return data;
}

// GET /deliveries/history
export async function getDeliveryHistory() {
  const { data } = await api.get("/deliveries/history");
  return data;
}
