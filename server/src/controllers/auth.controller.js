import { asyncHandler } from "../utils/asyncHandler.js";
import { sendMessage, sendSuccess } from "../utils/response.js";
import { loginUser } from "../services/auth.service.js";
import { env } from "../config/env.js";

const cookieOptions = {
  httpOnly: true,
  secure: env.cookieSecure,
  sameSite: env.cookieSameSite,
  maxAge: 24 * 60 * 60 * 1000,
  path: "/"
};

export const login = asyncHandler(async (req, res) => {
  const { token, user } = await loginUser(req.body);

  res.cookie("accessToken", token, cookieOptions);
  sendSuccess(res, { user });
});

export const logout = asyncHandler(async (_req, res) => {
  res.clearCookie("accessToken", { httpOnly: true, secure: env.cookieSecure, sameSite: env.cookieSameSite, path: "/" });
  sendMessage(res, "Logged out successfully");
});

export const me = asyncHandler(async (req, res) => {
  sendSuccess(res, { user: req.user });
});
