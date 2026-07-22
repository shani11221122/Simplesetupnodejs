import User from "../models/user.js";
import { sendSuccess, sendError } from "../utils/response.js";

export const uploadProfileImage = async (req, res, next) => {
  try {
    if (!req.file) {
      return sendError(res, 400, "No file uploaded");
    }

    const imageUrl = `/uploads/${req.file.filename}`;

    const user = await User.findByIdAndUpdate(
      req.user.id,
      { profileImage: imageUrl },
      { returnDocument: "after" }
    );

    if (!user) return sendError(res, 404, "User not found");

    return sendSuccess(res, 200, {
      message: "Profile image uploaded successfully",
      profileImage: imageUrl,
      user,
    });
  } catch (error) {
    next(error);
  }
};