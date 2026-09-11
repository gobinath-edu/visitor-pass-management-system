import { asyncHandler } from "../utils/asyncHandler.js";
import { sendSuccess } from "../utils/response.js";
import { ActivityLog } from "../models/ActivityLog.model.js";

export const list = asyncHandler(async (_req, res) => {
  const logs = await ActivityLog.find()
    .sort({ performedAt: -1 })
    .limit(200)
    .populate("performedBy", "name email role")
    .populate({
      path: "visit",
      populate: [
        { path: "visitor", select: "fullName phone" },
        { path: "employee", populate: { path: "user", select: "name" } }
      ]
    });

  sendSuccess(res, { logs });
});

export const byVisit = asyncHandler(async (req, res) => {
  const logs = await ActivityLog.find({ visit: req.params.visitId })
    .sort({ performedAt: 1 })
    .populate("performedBy", "name email role");

  sendSuccess(res, { logs });
});
