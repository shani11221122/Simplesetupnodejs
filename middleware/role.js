import { sendError } from "../utils/response.js";

export const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return sendError(res, 403, "Access Denied");
    }

    next();
  };
};