import { api } from "./api";

// POST /deliveries/create (JSON: type_colis, description, adresse_pickup, adresse_dropoff)
export async function createDelivery(p: {
  type_colis: "document"|"repas"|"objet"|"autre";
  description?: string;
  adresse_pickup: string;
  adresse_dropoff: string;
}) {
  const { data } = await api.post("/deliveries/create", p);
  return data;
}

// POST /deliveries/{id}/assign (JSON: livreur_id)
export async function assignDelivery(id: number, livreur_id: number) {
  const { data } = await api.post(`/deliveries/${id}/assign`, { livreur_id });
  return data;
}

// POST /deliveries/{id}/status (JSON: statut)
export async function updateDeliveryStatus(id: number, statut:
  "en_attente"|"en_route_pickup"|"arrive_pickup"|"colis_recupere"|"en_route_livraison"|"livre") {
  const { data } = await api.post(`/deliveries/${id}/status`, { statut });
  return data;
}

// GET /deliveries/history
export async function getDeliveryHistory() {
  const { data } = await api.get("/deliveries/history");
  return data;
}
