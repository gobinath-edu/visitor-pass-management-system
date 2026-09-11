import mongoose from "mongoose";
import { ACTIVITY_ACTIONS } from "../constants/activityActions.js";

const activityLogSchema = new mongoose.Schema(
  {
    visit: { type: mongoose.Schema.Types.ObjectId, ref: "Visit", required: true, index: true },
    action: { type: String, enum: Object.values(ACTIVITY_ACTIONS), required: true },
    performedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    performedAt: { type: Date, default: Date.now, index: true },
    metadata: { type: mongoose.Schema.Types.Mixed, default: {} }
  },
  { versionKey: false }
);

activityLogSchema.index({ performedAt: -1 });

export const ActivityLog = mongoose.model("ActivityLog", activityLogSchema);
