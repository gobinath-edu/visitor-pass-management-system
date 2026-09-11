import api from "./api.js";

export const reportService = {
  summary: (params) => api.get("/reports/summary", { params })
};
