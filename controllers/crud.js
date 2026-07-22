import User from "../models/user.js";
import { sendSuccess, sendError } from "../utils/response.js";

export const createUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return sendError(res, 400, "Email already exists");
    }

    const user = await User.create({
      name,
      email,
      password,
      role,
    });

    sendSuccess(res, 201, { Message: "User created successfully",user });
  } catch (error) {
    next(error)
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();

    sendSuccess(res, 200, { Message: "Users found successfully",users });
  } catch (error) {
    next(error)
  }
};

export const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return sendError(res, 404, "User not found",user);
    }

    sendSuccess(res, 200, { Message: "User found successfully",user });
  } catch (error) {
    next(error)
  }
};

export const updateUser = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate
    (req.params.id,req.body,{returnDocument: "after",runValidators: true,});

    if (!user) {
      return sendError(res, 404, "User not found");
    }

    sendSuccess(res, 200, { Message: "User updated successfully",user });
  } catch (error) {
    next(error)
  }
};

export const deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);

    if (!user) {
      return sendError(res, 404, "User not found");
    }

    sendSuccess(res, 200, { Message: "User deleted successfully",user });
  } catch (error) {
    next(error)
  }
};