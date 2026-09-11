import { asyncHandler } from "../utils/asyncHandler.js";
import { sendSuccess } from "../utils/response.js";
import { listVisits, approveVisit, rejectVisit } from "../services/visitor.service.js";

export const list = asyncHandler(async (req, res) => {
  const result = await listVisits(
    {
      ...req.query,
      status: "PENDING"
    },
    req.user
  );
  sendSuccess(res, result);
});

export const approve = asyncHandler(async (req, res) => {
  const visit = await approveVisit(req.params.id, req.user._id, req.body.remarks);
  sendSuccess(res, { visit });
});

export const reject = asyncHandler(async (req, res) => {
  const visit = await rejectVisit(req.params.id, req.user._id, req.body.remarks);
  sendSuccess(res, { visit });
});
