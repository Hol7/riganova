import { api } from "./api";

export async function loginUser(telephone: string, mot_de_passe: string) {
  const { data } = await api.post("/auth/login", { telephone, mot_de_passe });
  console.log("data", data)
  return data ;
}

export async function registerUser(payload: {
  nom: string;
  email: string;
  telephone: string;
  mot_de_passe: string;
  adresse: string;
}) {
  const { data } = await api.post("/auth/register", {
    ...payload,
    role: "client", // always default
  });
  return data;
}

export async function forgetPassword(email: string) {
  const { data } = await api.post(`/auth/forget-password?email=${encodeURIComponent(email)}`);
  return data;
}

export async function getCurrentUser(token: string) {
  const { data } = await api.get("/users/me", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
}

// Create authService object for easier importing
export const authService = {
  login: loginUser,
  register: registerUser,
  forgetPassword,
  getCurrentUser,
};
