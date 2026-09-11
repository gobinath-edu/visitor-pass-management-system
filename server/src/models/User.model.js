import mongoose from "mongoose";
import { ROLES } from "../constants/roles.js";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true, maxlength: 100 },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    passwordHash: { type: String, required: true, select: false },
    role: { type: String, enum: Object.values(ROLES), required: true },
    isActive: { type: Boolean, default: true }
  },
  { timestamps: true }
);

export const User = mongoose.model("User", userSchema);
