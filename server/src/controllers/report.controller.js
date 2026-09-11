import { asyncHandler } from "../utils/asyncHandler.js";
import { sendSuccess } from "../utils/response.js";
import { getReportSummary } from "../services/report.service.js";

export const summary = asyncHandler(async (req, res) => {
  const report = await getReportSummary(req.query);
  sendSuccess(res, { report });
});
