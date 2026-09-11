import mongoose from "mongoose";
import { VISIT_STATUS } from "../constants/visitStatus.js";

const visitSchema = new mongoose.Schema(
  {
    visitor: { type: mongoose.Schema.Types.ObjectId, ref: "Visitor", required: true },
    employee: { type: mongoose.Schema.Types.ObjectId, ref: "Employee", required: true },
    visitDate: { type: String, required: true },
    expectedArrivalTime: { type: String, required: true },
    purpose: { type: String, required: true, trim: true, maxlength: 500 },
    status: {
      type: String,
      enum: Object.values(VISIT_STATUS),
      default: VISIT_STATUS.PENDING,
      index: true
    },
    checkInTime: { type: Date, default: null },
    checkOutTime: { type: Date, default: null },
    remarks: { type: String, trim: true, maxlength: 500, default: "" },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    approvedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", default: null },
    rejectedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", default: null },
    cancelledBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", default: null }
  },
  { timestamps: true }
);

visitSchema.index({ visitDate: 1, status: 1 });
visitSchema.index({ employee: 1, status: 1 });
visitSchema.index({ visitor: 1, status: 1 });
visitSchema.index({ visitDate: 1, visitor: 1 });

export const Visit = mongoose.model("Visit", visitSchema);
