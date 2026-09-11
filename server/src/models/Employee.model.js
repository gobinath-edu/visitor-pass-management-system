import mongoose from "mongoose";

const employeeSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, unique: true },
    employeeCode: { type: String, required: true, unique: true, trim: true, uppercase: true },
    department: { type: String, required: true, trim: true, maxlength: 100 },
    phone: { type: String, trim: true, maxlength: 20 },
    isActive: { type: Boolean, default: true }
  },
  { timestamps: true }
);

employeeSchema.index({ department: 1 });

export const Employee = mongoose.model("Employee", employeeSchema);
