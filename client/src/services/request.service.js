import api from "./api.js";

export const requestService = {
  list: (params) => api.get("/requests", { params }),
  approve: (id, remarks = "") => api.patch(`/requests/${id}/approve`, { remarks }),
  reject: (id, remarks = "") => api.patch(`/requests/${id}/reject`, { remarks })
};
