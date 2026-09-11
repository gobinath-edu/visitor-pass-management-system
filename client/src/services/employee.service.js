import api from "./api.js";

export const employeeService = {
  list: () => api.get("/employees"),
  create: (payload) => api.post("/employees", payload),
  update: (id, payload) => api.patch(`/employees/${id}`, payload),
  remove: (id) => api.delete(`/employees/${id}`),
  users: () => api.get("/users"),
  updateUserStatus: (id, isActive) => api.patch(`/users/${id}/status`, { isActive })
};
