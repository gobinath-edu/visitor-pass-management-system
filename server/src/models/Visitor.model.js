import mongoose from "mongoose";

const visitorSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true, trim: true, maxlength: 120 },
    phone: { type: String, required: true, trim: true, maxlength: 20 },
    email: { type: String, lowercase: true, trim: true, maxlength: 160 },
    idType: { type: String, trim: true, maxlength: 40 },
    idNumber: { type: String, trim: true, maxlength: 80 },
    company: { type: String, trim: true, maxlength: 120 }
  },
  { timestamps: true }
);

visitorSchema.index({ fullName: 1 });
visitorSchema.index({ phone: 1 });

export const Visitor = mongoose.model("Visitor", visitorSchema);
