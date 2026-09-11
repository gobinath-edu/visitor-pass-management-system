import api from "./api.js";

export const authService = {
  login: (payload) => api.post("/auth/login", payload),
  logout: () => api.post("/auth/logout"),
  me: () => api.get("/auth/me")
};
