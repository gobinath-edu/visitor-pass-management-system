import { ActivityLog } from "../models/ActivityLog.model.js";

export async function recordActivity({ visitId, action, userId, metadata = {} }) {
  return ActivityLog.create({
    visit: visitId,
    action,
    performedBy: userId,
    metadata
  });
}
