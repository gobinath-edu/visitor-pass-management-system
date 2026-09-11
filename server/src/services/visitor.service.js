import mongoose from "mongoose";
import { Employee } from "../models/Employee.model.js";
import { Visitor } from "../models/Visitor.model.js";
import { Visit } from "../models/Visit.model.js";
import { VISIT_STATUS, ACTIVE_VISIT_STATUSES } from "../constants/visitStatus.js";
import { ACTIVITY_ACTIONS } from "../constants/activityActions.js";
import { ApiError } from "../utils/ApiError.js";
import { recordActivity } from "./activity.service.js";
import { combineDateAndTime, getTodayString, isToday } from "../utils/dateTime.js";

export async function createVisitorRequest(data, userId) {
  const employee = await Employee.findOne({
    _id: data.employeeId,
    isActive: true
  });

  if (!employee) {
    throw new ApiError(404, "Active employee not found");
  }

  const today = getTodayString();

  // Rules 3 and 4 are validated on the server because client-side
  // date/time checks can be bypassed by directly calling the API.
  if (data.visitDate < today) {
    throw new ApiError(400, "Visit date cannot be earlier than today");
  }

  if (isToday(data.visitDate)) {
    const requested = combineDateAndTime(data.visitDate, data.expectedArrivalTime);
    if (requested < new Date()) {
      throw new ApiError(400, "Expected arrival time cannot be earlier than the current time");
    }
  }

  const pendingCount = await Visit.countDocuments({
    employee: employee._id,
    status: VISIT_STATUS.PENDING
  });

  if (pendingCount >= 3) {
    // Rule 5: an employee can have at most three pending approvals.
    throw new ApiError(400, "Employee already has the maximum of 3 pending requests");
  }

  let visitor = await Visitor.findOne({ phone: data.phone });

  if (!visitor) {
    visitor = await Visitor.create({
      fullName: data.fullName,
      phone: data.phone,
      email: data.email || undefined,
      idType: data.idType || undefined,
      idNumber: data.idNumber || undefined,
      company: data.company || undefined
    });
  }

  const duplicateSameDay = await Visit.exists({
    visitor: visitor._id,
    visitDate: data.visitDate,
  });

  if (duplicateSameDay) {
    // Rule 2: one registration for the same visitor on the same date.
    throw new ApiError(409, "This visitor already has a registration for that date");
  }

  const activeVisit = await Visit.exists({
    visitor: visitor._id,
    status: { $in: ACTIVE_VISIT_STATUSES }
  });

  if (activeVisit) {
    // Rule 1: a visitor cannot hold more than one active visit.
    throw new ApiError(409, "Visitor already has an active visit");
  }

  const visit = await Visit.create({
    visitor: visitor._id,
    employee: employee._id,
    visitDate: data.visitDate,
    expectedArrivalTime: data.expectedArrivalTime,
    purpose: data.purpose,
    status: VISIT_STATUS.PENDING,
    createdBy: userId
  });

  await recordActivity({
    visitId: visit._id,
    action: ACTIVITY_ACTIONS.CREATED,
    userId
  });

  return getVisitById(visit._id);
}

export async function getVisitById(id, currentUser = null) {
  if (!mongoose.isValidObjectId(id)) {
    throw new ApiError(400, "Invalid visit id");
  }

  const visit = await Visit.findById(id)
    .populate("visitor")
    .populate({
      path: "employee",
      populate: { path: "user", select: "name email" }
    })
    .populate("createdBy", "name email role")
    .populate("approvedBy", "name email role")
    .populate("rejectedBy", "name email role")
    .populate("cancelledBy", "name email role");

  if (!visit) {
    throw new ApiError(404, "Visit not found");
  }

  if (currentUser?.role === "EMPLOYEE") {
    const employee = await Employee.findOne({ user: currentUser._id });
    if (!employee || !visit.employee._id.equals(employee._id)) {
      throw new ApiError(403, "You can only access visits assigned to you");
    }
  }

  return visit;
}

export async function listVisits(query, currentUser) {
  const filters = {};
  const and = [];

  if (query.visitDate) {
    filters.visitDate = query.visitDate;
  }

  if (query.status) {
    filters.status = query.status;
  }

  if (query.visitorName) {
    const visitorIds = await Visitor.find({
      fullName: { $regex: query.visitorName, $options: "i" }
    }).distinct("_id");
    filters.visitor = { $in: visitorIds };
  }

  if (query.employeeName) {
    const userIds = await Employee.find().populate({
      path: "user",
      match: { name: { $regex: query.employeeName, $options: "i" } },
      select: "_id"
    });
    const employeeIds = userIds.filter((e) => e.user).map((e) => e._id);
    filters.employee = { $in: employeeIds };
  }

  if (currentUser.role === "EMPLOYEE") {
    const employee = await Employee.findOne({ user: currentUser._id });
    if (!employee) throw new ApiError(404, "Employee profile not found");
    and.push({ employee: employee._id });
  }

  if (currentUser.role === "RECEPTIONIST") {
    // Receptionists need the operational visitor list. Historical data remains queryable.
  }

  if (and.length) filters.$and = and;

  const skip = (query.page - 1) * query.limit;
  const [items, total] = await Promise.all([
    Visit.find(filters)
      .sort({ visitDate: -1, createdAt: -1 })
      .skip(skip)
      .limit(query.limit)
      .populate("visitor", "fullName phone email company")
      .populate({
        path: "employee",
        populate: { path: "user", select: "name email" }
      }),
    Visit.countDocuments(filters)
  ]);

  return {
    items,
    pagination: {
      page: query.page,
      limit: query.limit,
      total,
      pages: Math.ceil(total / query.limit)
    }
  };
}

export async function approveVisit(visitId, userId, remarks = "") {
  const employee = await Employee.findOne({ user: userId, isActive: true });

  if (!employee) throw new ApiError(403, "Employee profile not found");

  const visit = await Visit.findOne({ _id: visitId, employee: employee._id });

  if (!visit) throw new ApiError(404, "Visitor request not found");
  if (visit.status !== VISIT_STATUS.PENDING) {
    throw new ApiError(400, "Only pending requests can be approved");
  }

  visit.status = VISIT_STATUS.APPROVED;
  visit.remarks = remarks;
  visit.approvedBy = userId;
  await visit.save();

  await recordActivity({
    visitId,
    action: ACTIVITY_ACTIONS.APPROVED,
    userId,
    metadata: { remarks }
  });

  return getVisitById(visitId);
}

export async function rejectVisit(visitId, userId, remarks = "") {
  const employee = await Employee.findOne({ user: userId, isActive: true });

  if (!employee) throw new ApiError(403, "Employee profile not found");

  const visit = await Visit.findOne({ _id: visitId, employee: employee._id });

  if (!visit) throw new ApiError(404, "Visitor request not found");
  if (visit.status !== VISIT_STATUS.PENDING) {
    throw new ApiError(400, "Only pending requests can be rejected");
  }

  visit.status = VISIT_STATUS.REJECTED;
  visit.remarks = remarks;
  visit.rejectedBy = userId;
  await visit.save();

  await recordActivity({
    visitId,
    action: ACTIVITY_ACTIONS.REJECTED,
    userId,
    metadata: { remarks }
  });

  return getVisitById(visitId);
}

export async function checkInVisit(visitId, userId) {
  const visit = await Visit.findById(visitId);

  if (!visit) throw new ApiError(404, "Visitor request not found");

  // Rules 6, 7 and 9 belong to the transition itself and therefore
  // are checked immediately before changing the persisted status.
  if (visit.status !== VISIT_STATUS.APPROVED) {
    throw new ApiError(400, "Only approved visitors can be checked in");
  }

  const alreadyInside = await Visit.exists({
    visitor: visit.visitor,
    status: VISIT_STATUS.CHECKED_IN,
    _id: { $ne: visit._id }
  });

  if (alreadyInside) {
    throw new ApiError(409, "Visitor is already checked in");
  }

  visit.status = VISIT_STATUS.CHECKED_IN;
  visit.checkInTime = new Date();
  await visit.save();

  await recordActivity({
    visitId,
    action: ACTIVITY_ACTIONS.CHECKED_IN,
    userId
  });

  return getVisitById(visitId);
}

export async function checkOutVisit(visitId, userId) {
  const visit = await Visit.findById(visitId);

  if (!visit) throw new ApiError(404, "Visitor request not found");
  if (visit.status !== VISIT_STATUS.CHECKED_IN) {
    throw new ApiError(400, "Only checked-in visitors can be checked out");
  }

  const checkOutTime = new Date();

  if (!visit.checkInTime || checkOutTime <= visit.checkInTime) {
    // Rule 8: checkout must always be later than checkout start.
    throw new ApiError(400, "Check-out time must be later than check-in time");
  }

  visit.status = VISIT_STATUS.CHECKED_OUT;
  visit.checkOutTime = checkOutTime;
  await visit.save();

  await recordActivity({
    visitId,
    action: ACTIVITY_ACTIONS.CHECKED_OUT,
    userId
  });

  return getVisitById(visitId);
}

export async function cancelVisit(visitId, userId) {
  const visit = await Visit.findById(visitId);

  if (!visit) throw new ApiError(404, "Visitor request not found");
  if (![VISIT_STATUS.PENDING, VISIT_STATUS.APPROVED].includes(visit.status)) {
    throw new ApiError(400, "Only pending or approved visits can be cancelled");
  }

  visit.status = VISIT_STATUS.CANCELLED;
  visit.cancelledBy = userId;
  await visit.save();

  await recordActivity({
    visitId,
    action: ACTIVITY_ACTIONS.CANCELLED,
    userId
  });

  return getVisitById(visitId);
}

export async function getDashboardStats(currentUser) {
  const today = getTodayString();
  const scope = {};

  if (currentUser.role === "EMPLOYEE") {
    const employee = await Employee.findOne({ user: currentUser._id, isActive: true });
    if (!employee) throw new ApiError(403, "Employee profile not found");
    scope.employee = employee._id;
  }

  const [pending, todayVisitors, inside, scheduled, totalEmployees] = await Promise.all([
    Visit.countDocuments({ ...scope, status: VISIT_STATUS.PENDING }),
    Visit.countDocuments({ ...scope, visitDate: today, status: { $ne: VISIT_STATUS.CANCELLED } }),
    Visit.countDocuments({ ...scope, status: VISIT_STATUS.CHECKED_IN }),
    Visit.countDocuments({
      ...scope,
      visitDate: { $gte: today },
      status: { $in: [VISIT_STATUS.PENDING, VISIT_STATUS.APPROVED] }
    }),
    Employee.countDocuments({ isActive: true })
  ]);

  return { pending, todayVisitors, inside, scheduled, totalEmployees };
}
