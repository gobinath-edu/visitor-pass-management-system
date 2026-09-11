import api from "./api.js";

export const visitorService = {
  list: (params) => api.get("/visitors", { params }),
  create: (payload) => api.post("/visitors", payload),
  getById: (id) => api.get(`/visitors/${id}`),
  checkIn: (id) => api.patch(`/visitors/${id}/check-in`),
  checkOut: (id) => api.patch(`/visitors/${id}/check-out`),
  cancel: (id) => api.patch(`/visitors/${id}/cancel`),
  dashboardStats: () => api.get("/visitors/dashboard-stats")
};
