import { Employee } from "../models/Employee.model.js";
import { Visit } from "../models/Visit.model.js";
import { VISIT_STATUS } from "../constants/visitStatus.js";
import { ApiError } from "../utils/ApiError.js";
import { approveVisit, rejectVisit } from "./visitor.service.js";

export async function listPendingRequests(userId, page=1, limit=20) {
  const employee = await Employee.findOne({ user: userId, isActive: true });
  if (!employee) throw new ApiError(403, "Employee profile not found");
  const skip=(page-1)*limit;
  const filter={ employee: employee._id, status: VISIT_STATUS.PENDING };
  const [items,total]=await Promise.all([
    Visit.find(filter).sort({visitDate:1,expectedArrivalTime:1,createdAt:1}).skip(skip).limit(limit).populate("visitor","fullName phone email company"),
    Visit.countDocuments(filter)
  ]);
  return {items,pagination:{page,limit,total,pages:Math.max(1,Math.ceil(total/limit))}};
}
export { approveVisit, rejectVisit };
