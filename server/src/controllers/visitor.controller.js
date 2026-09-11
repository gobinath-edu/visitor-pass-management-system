import { asyncHandler } from "../utils/asyncHandler.js";
import { sendSuccess } from "../utils/response.js";
import * as visitorService from "../services/visitor.service.js";

export const create = asyncHandler(async (req, res) => {
  const visit = await visitorService.createVisitorRequest(req.body, req.user._id);
  sendSuccess(res, { visit }, 201);
});

export const list = asyncHandler(async (req, res) => {
  const result = await visitorService.listVisits(req.query, req.user);
  sendSuccess(res, result);
});

export const getById = asyncHandler(async (req, res) => {
  const visit = await visitorService.getVisitById(req.params.id);
  sendSuccess(res, { visit });
});

export const checkIn = asyncHandler(async (req, res) => {
  const visit = await visitorService.checkInVisit(req.params.id, req.user._id);
  sendSuccess(res, { visit });
});

export const checkOut = asyncHandler(async (req, res) => {
  const visit = await visitorService.checkOutVisit(req.params.id, req.user._id);
  sendSuccess(res, { visit });
});

export const cancel = asyncHandler(async (req, res) => {
  const visit = await visitorService.cancelVisit(req.params.id, req.user._id);
  sendSuccess(res, { visit });
});

export const dashboardStats = asyncHandler(async (req, res) => {
  const stats = await visitorService.getDashboardStats(req.user);
  sendSuccess(res, { stats });
});
