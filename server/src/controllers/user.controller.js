import { User } from "../models/User.model.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { sendSuccess } from "../utils/response.js";

export const list = asyncHandler(async (_req, res) => {
  const users = await User.find()
    .select("name email role isActive createdAt")
    .sort({ createdAt: -1 });

  sendSuccess(res, { users });
});

export const updateStatus = asyncHandler(async (req, res) => {
  const { isActive } = req.body;

  if (typeof isActive !== "boolean") {
    throw new ApiError(400, "isActive must be boolean");
  }

  const user = await User.findByIdAndUpdate(
    req.params.id,
    { isActive },
    { new: true }
  ).select("name email role isActive");

  if (!user) throw new ApiError(404, "User not found");

  sendSuccess(res, { user });
});
