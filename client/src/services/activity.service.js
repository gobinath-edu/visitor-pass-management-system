import api from "./api.js";

export const activityService = {
  list: () => api.get("/activity"),
  byVisit: (visitId) => api.get(`/activity/visit/${visitId}`)
};
