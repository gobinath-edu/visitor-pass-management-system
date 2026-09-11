import { verifyAccessToken } from "../utils/jwt.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/User.model.js";

export async function authenticate(req, _res, next) {
  try {
    const token = req.cookies?.accessToken;

    if (!token) {
      throw new ApiError(401, "Authentication required");
    }

    const payload = verifyAccessToken(token);
    const user = await User.findById(payload.sub).select("-passwordHash");

    if (!user || !user.isActive) {
      throw new ApiError(401, "User account is inactive or unavailable");
    }

    req.user = user;
    next();
  } catch (error) {
    next(error instanceof ApiError ? error : new ApiError(401, "Invalid or expired session"));
  }
}
